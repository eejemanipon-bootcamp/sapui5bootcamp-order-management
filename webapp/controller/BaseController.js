sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/ui5/trng/sapui5bootcampordermanagement/utils/Constants",
    "com/ui5/trng/sapui5bootcampordermanagement/model/formatter",
    "sap/ui/model/json/JSONModel"
], (Controller, Constants, Formatter, JSONModel) => {
    "use strict";

    return Controller.extend("com.ui5.trng.sapui5bootcampordermanagement.controller.BaseController", {
        formatter: Formatter, 
        /**
         * Shortcut to get i18n text form ResourceBundle.
         * @public
         * @param {String} [sKey] The i18n Key
         * @param {Array} [aArgs] Optional arguments for placeholders
         * @returns {String} Localized string
         */
        getText: function(sKey, aArgs){
            var oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            return oBundle.getText(sKey, aArgs);
        },
        /**
         * Returns the default model attached to the view.
         * @public
         * @returns {sap.ui.model.Model} The default model instance.
         */
        getModel: function(){
            return this.getView().getModel();
        },
        /**
         * Returns a named model attached to the component (global scope).
         * Useful for accessing shared models like i18n or device.
         * @public
         * @param {string} [sName] The name of the component model.
         * @returns {sap.ui.model.Model} The named component model instance.
         */
        getComponentModel: function(sName){
            return this.getOwnerComponent().getModel(sName);
        },
        /**
         * Sets a model to the view.
         * @public
         * @param {sap.ui.model.Model} [oModel] The model instance to set.
         * @param {string} [sName] Optional name for the model.
         * @returns {sap.ui.core.mvc.View} The view instance for chaining.
         */
        setModel: function(oModel, sName){
            return this.getView().setModel(oModel, sName);
        },
        /**
         * Set JSON Model status
         * @public
         */
        setStatusModel: function(){
            // Create status JSONModel
            let oStatusModel = new JSONModel({
                statusOptions:[
                    { key: Constants.STATUS.Created, text: Constants.STATUS.Created },
                    { key: Constants.STATUS.Released, text: Constants.STATUS.Released },
                    { key: Constants.STATUS.PartiallyCompleted, text: Constants.STATUS.PartiallyCompleted },
                    { key: Constants.STATUS.Delivered, text: Constants.STATUS.Delivered }
                ]
            });

            // Set status model
            this.setModel(oStatusModel, Constants.MODEL.Status);
        }
    });
});