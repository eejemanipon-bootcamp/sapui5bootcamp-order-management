sap.ui.define([
    "com/ui5/trng/sapui5bootcampordermanagement/controller/BaseController",
    "com/ui5/trng/sapui5bootcampordermanagement/utils/Constants",
    "sap/m/MessageBox"
], (BaseController, Constants, MessageBox) => {
    "use strict";

    return BaseController.extend("com.ui5.trng.sapui5bootcampordermanagement.controller.Create", {
        onInit() {
            this.getComponentRouter().getRoute(Constants.ROUTE.Create.Name).attachPatternMatched(this._onPatternMatched, this);
        },
        /**
         * Navigates back using browser history.
         * If no previous hash exists, falls back to a default route.
         * @public
         * @param {sap.ui.base.Event} [oEvent] Event handler
         */
        _onPatternMatched: function(oEvent){
            const sRouteName = oEvent.getParameter(Constants.PARAM.Name);

            this.initViewStateModel(Constants.ROUTE.Create.View);

            this.updateViewStateFromRoute(sRouteName);
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