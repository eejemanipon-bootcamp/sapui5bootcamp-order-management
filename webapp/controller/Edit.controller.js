sap.ui.define([
    "com/ui5/trng/sapui5bootcampordermanagement/controller/BaseController",
    "com/ui5/trng/sapui5bootcampordermanagement/utils/Constants",
    "sap/m/MessageBox"
], (BaseController, Constants, MessageBox) => {
    "use strict";

    return BaseController.extend("com.ui5.trng.sapui5bootcampordermanagement.controller.Edit", {
        onInit() {
            this.getComponentRouter().getRoute(Constants.ROUTE.Edit.Name).attachPatternMatched(this._onPatternMatched, this);

            // Initialize Status model
            this.initStatusModel();

            // Update the Table's title
            this.updateTableTitle(Constants.CONTROLS.ProductsTable, Constants.CONTROLS.ProductsTableTitle, this.getText("product.tableTitle"));
        },
        /**
         * Navigates back using browser history.
         * If no previous hash exists, falls back to a default route.
         * @public
         * @param {sap.ui.base.Event} [oEvent] Event handler
         */
        _onPatternMatched: function(oEvent){
            const sRouteName = oEvent.getParameter(Constants.PARAM.Name),
                  oParam     = oEvent.getParameter(Constants.PARAM.Arguments),
                  oTable     = this.byId(Constants.CONTROLS.ProductsTable);

            this.initViewStateModel(Constants.ROUTE.Edit.View);

            this.updateViewStateFromRoute(sRouteName);

            // Bind the view to the specific order data
            if(oParam){
                this.bindViewToEntity(this.getView(), Constants.ENTITY.Orders, oParam.OrderNum);
            }

            // Create template for the table
            const oTemplate = new sap.m.ColumnListItem({
                cells: [
                    new sap.m.ObjectIdentifier({
                        title: "{ProductName}"
                    }),
                    new sap.m.Text({
                        text: "{Quantity}"
                    }),
                    new sap.m.Text({
                        text: "{UnitPrice}"
                    }),
                    new sap.m.Text({
                        text: {
                            parts    : ["Quantity", "UnitPrice"],
                            formatter: this.formatter.formatTotalPrice
                        }
                    }),
                ]
            });

            // Bind the table to the order items
            if(oTable){
                this.bindTable(
                    oTable, 
                    Constants.ENTITY.Orders, 
                    oParam.OrderNum, 
                    oTemplate,
                    Constants.ENTITY.OrderItem
                );
            }
        },
        _onBtnPressProductCreate: function(){

        },
        _onBtnPressProductDelete: function(){

        },
        onBtnPressOrderSave: function(){
            
        },
        /**
         * Cancel the operation and go back to main page.
         * @public
         */
        onBtnPressCancel: function(){
            const _this = this;
            const sConfirmMsgCancel = this.getText("confirm.cancelEdit");

            MessageBox.confirm(sConfirmMsgCancel, {
                actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                onClose: function (sAction){
                    if (sAction === MessageBox.Action.YES){
                        _this.navigateToMain(Constants.ROUTE.Main.Name);
                    }
                }
            });
        }
    });
});