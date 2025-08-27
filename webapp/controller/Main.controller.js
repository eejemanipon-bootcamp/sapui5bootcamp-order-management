sap.ui.define([
    "com/ui5/trng/sapui5bootcampordermanagement/controller/BaseController",
    "com/ui5/trng/sapui5bootcampordermanagement/utils/Constants",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox"
], (BaseController, Constants, Filter, FilterOperator, MessageBox) => {
    "use strict";

    return BaseController.extend("com.ui5.trng.sapui5bootcampordermanagement.controller.Main", {
        /**
         * Called once after the controller is instantiated.
         * @public
         */
        onInit() {
            // Initialize Status model
            this.initStatusModel();

            // Update the Table's title
            this.updateTableTitle(Constants.CONTROLS.OrdersTable, Constants.CONTROLS.OrdersTableTitle, this.getText("order.tableTitle"));
        },
        /**
         * Method to filter data bound to Table from OData based on FilterBar fields value.
         * @public
         * @param {sap.ui.base.Event} [oEvent] Event handler
         */
        _onFilterSearch: function(oEvent){
            let oTable    = this.byId(Constants.CONTROLS.OrdersTable),
                aControls = oEvent.getParameter(Constants.PARAM.SelectionSet),
				oBinding  = oTable.getBinding(Constants.PARAM.Items),
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
        _onFilterClear: function(oEvent){
            let oTable    = this.byId(Constants.CONTROLS.OrdersTable),
                aControls = oEvent.getParameter(Constants.PARAM.SelectionSet),
				oBinding  = oTable.getBinding(Constants.PARAM.Items);

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
        /**
         * Navigate to Create page.
         * @public
         */
        _onBtnPressOrderCreate: function(){
            this.navigateTo(Constants.ROUTE.Create.Name);
        },
        /**
         * Performs delete to the dataset of the selected items in table.
         * Since we are working on a local OData, this just simulates 
         * deletion In-memory only.
         * @public
         */
        _onBtnPressOrderDelete: function(){
            let oTable         = this.byId(Constants.CONTROLS.OrdersTable),
                aSelectedItems = oTable.getSelectedItems();

            if (aSelectedItems.length === 0){
                MessageBox.error(this.getText("error.noSelection"));
                return;
            }

            const sConfirmMsg       = this.getText("confirm.deleteItems", [aSelectedItems.length]),
                  sSuccessDeleteMsg = this.getText("info.successDelete"),
                  sfailedDeleteMsg  = this.getText("error.failedDelete");

            MessageBox.confirm(sConfirmMsg, {
                actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                onClose: function (sAction){
                    if (sAction === MessageBox.Action.YES){
                        const oModel = this.getModel();

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
        },
        /**
         * Navigate to Details page of the selected item.
         * @public
         * @param {sap.ui.base.Event} [oEvent] The event handler
         */
        _onListItemPress: function(oEvent){
            const oItem           = oEvent.getSource(),
                  oBindingContext = oItem.getBindingContext(),
                  sOrderNum       = oBindingContext.getProperty(Constants.FIELD.OrderNum); 

            this.navigateTo(Constants.ROUTE.Details.Name, { OrderNum: sOrderNum });
        }
    });
});