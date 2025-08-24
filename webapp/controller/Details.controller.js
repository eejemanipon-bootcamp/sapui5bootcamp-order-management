sap.ui.define([
    "com/ui5/trng/sapui5bootcampordermanagement/controller/BaseController",
    "com/ui5/trng/sapui5bootcampordermanagement/utils/Constants"
], (BaseController, Constants) => {
    "use strict";

    return BaseController.extend("com.ui5.trng.sapui5bootcampordermanagement.controller.Details", {
        onInit() {
            this.getComponentRouter().getRoute(Constants.ROUTE.Details.Name).attachPatternMatched(this._onPatternMatched, this);

            // Initialize Status model
            this.initStatusModel();

            // Update the Table's title
            this.updateTableTitle(Constants.CONTROLS.ProductsTable, Constants.CONTROLS.ProductsTableTitle, this.getText("product.tableTitle"));
        },
        /**
         * Handles route match logic.
         * @public
         * @param {sap.ui.base.Event} [oEvent] Event handler
         */
        _onPatternMatched: function(oEvent){
            const sRouteName = oEvent.getParameter(Constants.PARAM.Name),
                  oParam     = oEvent.getParameter(Constants.PARAM.Arguments),
                  oTable     = this.byId(Constants.CONTROLS.ProductsTable);


            // Initialize and set viewState Model
            this.initViewStateModel(Constants.ROUTE.Details.View);

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
        /**
         * Navigate to Edit page of the order.
         * @public
         */
        onBtnPressOrderEdit: function(){
            const oContext  = this.getView().getBindingContext();

            if (oContext){
                const sOrderNum = oContext.getProperty(Constants.FIELD.OrderNum);

                this.navigateTo(Constants.ROUTE.Edit.Name, { OrderNum: sOrderNum });
            }
        },
        /**
         * Cancel the operation and go back to main page.
         * @public
         */
        onBtnPressCancel: function(){
            this.navigateToMain(Constants.ROUTE.Main.Name);
        }
    });
});