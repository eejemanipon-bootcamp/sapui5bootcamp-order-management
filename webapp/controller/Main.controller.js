sap.ui.define([
    "com/ui5/trng/sapui5bootcampordermanagement/controller/BaseController",
    "com/ui5/trng/sapui5bootcampordermanagement/utils/Constants",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox"
], (BaseController, Constants, Filter, FilterOperator, MessageBox) => {
    "use strict";

    return BaseController.extend("com.ui5.trng.sapui5bootcampordermanagement.controller.Main", {
        onInit() {
            this._oTable = this.byId(Constants.CONTROLS.OrdersTable);
            this.setStatusModel();
        },
        /**
         * Method to filter data bound to Table from OData based on FilterBar fields value.
         * @public
         * @param {sap.ui.base.Event} [oEvent] Event handler
         */
        onFilterSearch: function(oEvent){
            let aControls = oEvent.getParameter(Constants.PARAM.SelectionSet),
				oBinding  = this._oTable.getBinding(Constants.PARAM.Items),
				aFilters  = [];

            aControls.forEach( control => {
                let sId = control.getId();

                if (sId.includes(Constants.CONTROLS.InpOrderNumber)){
                    let sOrderNumber = control.getValue();

                    if (sOrderNumber){
                        aFilters.push( new Filter(Constants.FILTER_FIELD.OrderNum, FilterOperator.EQ, sOrderNumber ));
                    }

                }else if (sId.includes(Constants.CONTROLS.DateRangeCreationDate)){
                    const oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: Constants.DATE_FORMAT.Pattern01 });

                    let dStartDate = control.getDateValue(),
                        dEndDate   = control.getSecondDateValue();

                    let sStartDate = oDateFormat.format(dStartDate),
                        sEndDate   = oDateFormat.format(dEndDate);

                    if(sStartDate && sEndDate){
                        aFilters.push( new Filter(Constants.FILTER_FIELD.CreateDat, FilterOperator.BT, sStartDate, sEndDate ));
                    }
                }else if (sId.includes(Constants.CONTROLS.MultiSelectStatus)){
                    let aStatus = control.getSelectedItems();

                    if (aStatus.length > 0) {
                        let aStatusFilters = aStatus.map(item =>{
                            return new Filter(Constants.FILTER_FIELD.Status, FilterOperator.EQ, item.getKey());
                        });

                        aFilters.push( new Filter({
                            filters: aStatusFilters,
                            and: false
                        }));
                    }
                }
            });

			// Apply filter settings
			oBinding.filter(aFilters);
        },
        /**
         * Method to clear values in FilterBar fields and 
         * rebind the table to ensure that is shows the full dataset again.
         * @public
         * @param {sap.ui.base.Event} [oEvent] Event handler
         */
        onFilterClear: function(oEvent){
            let aControls = oEvent.getParameter(Constants.PARAM.SelectionSet),
				oBinding  = this._oTable.getBinding(Constants.PARAM.Items);

            aControls.forEach( control => {
                let sId = control.getId();

                if (sId.includes(Constants.CONTROLS.InpOrderNumber)){
                    control.setValue(Constants.EMPTY);

                }else if (sId.includes(Constants.CONTROLS.DateRangeCreationDate)){
                    control.setFrom(null);
                    control.setTo(null);
                }else if (sId.includes(Constants.CONTROLS.MultiSelectStatus)){
                    control.setSelectedKeys([]);
                }
            });

			// Apply filter settings
			oBinding.filter([]);
        },
        _onBtnPressOrderCreate: function(){

        },
        _onBtnPressOrderDelete: function(){
            let aSelectedItems = this._oTable.getSelectedItems();

            if (aSelectedItems.length === 0){
                MessageBox.error(this.getText("error.noSelection"));
                return;
            }

            let sConfirmMsg    = this.getText("confirm.deleteItems", [aSelectedItems.length]),
                sSuccessDeleteMsg = this.getText("info.successDelete"),
                sfailedDeleteMsg  = this.getText("error.failedDelete");

            MessageBox.confirm(sConfirmMsg, {
                actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                onClose: function (sAction){
                    if (sAction === MessageBox.Action.YES){
                        let oModel = this.getModel();

                        aSelectedItems.forEach(function (oItem){
                            let sPath = oItem.getBindingContext().getPath();

                            oModel.remove(sPath, {
                                success: function(){
                                    sap.m.MessageToast.show(sSuccessDeleteMsg);
                                    oModel.refresh(true);
                                },
                                error: function(){
                                    MessageBox.error(sfailedDeleteMsg);
                                }
                            });
                        });
                    }
                }.bind(this)
            });
        }
    });
});