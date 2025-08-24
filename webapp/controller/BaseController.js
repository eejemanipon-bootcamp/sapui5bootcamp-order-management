sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/ui5/trng/sapui5bootcampordermanagement/utils/Constants",
    "com/ui5/trng/sapui5bootcampordermanagement/utils/Formatter",
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
            var oBundle = this.getOwnerComponent().getModel(Constants.MODEL.i18n).getResourceBundle();
            return oBundle.getText(sKey, aArgs);
        },
        /**
         * Returns the named default model attached to the view.
         * @public
         * @param {string} [sName] Optional name of the model.
         * @returns {sap.ui.model.Model} The default model instance.
         */
        getModel: function(sName){
            return this.getView().getModel(sName);
        },
        /**
         * Returns a named model attached to the component (global scope).
         * Useful for accessing shared models like i18n or device.
         * @public
         * @param {string} [sName] Optional name of the component model.
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
         * Initializes and sets the Status model
         * @public
         */
        initStatusModel: function(){
            // Create status JSONModel
            const oStatusModel = new JSONModel({
                statusOptions:[
                    { key: Constants.STATUS.Created, text: Constants.STATUS.Created },
                    { key: Constants.STATUS.Released, text: Constants.STATUS.Released },
                    { key: Constants.STATUS.PartiallyCompleted, text: Constants.STATUS.PartiallyCompleted },
                    { key: Constants.STATUS.Delivered, text: Constants.STATUS.Delivered }
                ]
            });

            // Set status model
            this.setModel(oStatusModel, Constants.MODEL.Status);
        },
        /**
         * Initializes and sets viewState model.
         * @public
         * @param {String} [sMode] The current mode ("Create", "Edit", "Details").
         */
        initViewStateModel: function(sMode){
            const oViewStateModel = new JSONModel({
                mode: sMode
            });

            this.setModel(oViewStateModel, Constants.MODEL.ViewState);
        },
        /**
         * Updates the viewState model based on route name.
         * @public
         * @param {String} [sRouteName] The route name
         */
        updateViewStateFromRoute: function(sRouteName){
            const sMode = sRouteName === Constants.ROUTE.Create.Name  ? Constants.ROUTE.Create.View :
                          sRouteName === Constants.ROUTE.Details.Name ? Constants.ROUTE.Details.View :
                          sRouteName === Constants.ROUTE.Edit.Name    ? Constants.ROUTE.Edit.View : 
                          Constants.EMPTY;

            this.getModel(Constants.MODEL.ViewState).setProperty(Constants.PROPERTY.Mode, sMode);
        },
        /**
         * Returns the router instance from the owner component.
         * @public
         * @returns {sap.ui.core.routing.Router} The router instance.
         */
        getComponentRouter: function(){
            return this.getOwnerComponent().getRouter();
        },
        /**
         * Navigates to a specific route defined in manifest.json.
         * @public
         * @param {String} [sRouteName] The name of the route to navigate to.
         * @param {Object} [oParams] Optional route parameters (key-value pairs).
         */
        navigateTo: function(sRouteName, oParams) {
            this.getComponentRouter().navTo(sRouteName, oParams || {});
        },
        /**
         * Navigates back using browser history.
         * If no previous hash exists, falls back to a default route.
         * @public
         * @param {String} [sFallbackRoute="Main"] Optional fallback route name if no history is available.
         */
        navigateBack: function(sFallbackRoute) {
            const oHistory = History.getInstance();
            const sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                this.getComponentRouter().navTo(sFallbackRoute || Constants.ROUTE.Main.View, {}, true); // true = replace history
            }
        },
        /**
         * Navigates directly to the main page, replacing browser history.
         * @public
         * @param {String} [sMainRoute="Main"] Optional route name for the main page.
         */
        navigateToMain: function(sMainRoute) {
            this.getComponentRouter().navTo(sMainRoute || Constants.ROUTE.Main.View, {}, true); // true = replace history
        },
        /**
         * Binds the given view to an OData entity path.
         * @public
         * @param {sap.ui.core.mvc.View} [oView] The view to bind.
         * @param {String} [sEntitySet] The name of the entity set.
         * @param {String} [sKey] The key of the entity.
         * @param {String} [sModel] Optional model name.
         */
        bindViewToEntity: function(oView, sEntitySet, sKey, sModel){
            const sPath = `/${sEntitySet}('${sKey}')`;

            oView.bindElement({
                path : sPath,
                model: sModel
            });
        },
        /**
         * Binds a table with given path and template.
         * @public
         * @param {sap.m.Table} [oTable] The table control to bind.
         * @param {String} [sEntitySet] The name of the entity set.
         * @param {String} [sKey] The key of the entity.
         * @param {sap.m.ColumnListItem} [oTemplate] The template ID.
         * @param {String} [sEntitySetLevel2] Optional name of the child entity set.
         * @param {String} [sModel] Optional model name.
         */
        bindTable: function(oTable, sEntitySet, sKey, oTemplate, sEntitySetLevel2, sModel){
            let sPath = `/${sEntitySet}('${sKey}')`;

            if(sEntitySetLevel2){
                sPath = `/${sEntitySet}('${sKey}')/${sEntitySetLevel2}`;
            }
            
            if(oTable){
                oTable.bindItems({
                    path             : sPath,
                    model            : sModel,
                    template         : oTemplate,
                    templateShareable: false
                });
            }
        },
        /**
         * Attaches an updateFinished handler to a table and update its title with item count.
         * @public
         * @param {String} [sTableId] The ID of the table control.
         * @param {String} [sTitleId] The ID of the title control inside the table's headerToolbar
         * @param {String} [sTitle] The base label to use in the title
         */
        updateTableTitle: function(sTableId, sTitleId, sTitle){
            const oTable = this.byId(sTableId);

            if(oTable){
                oTable.attachEvent(Constants.EVENT.UpdateFinished, function (oEvent){
                    let iCount  = oEvent.getParameter(Constants.PARAM.Total);

                    this.byId(sTitleId).setText(`${sTitle} (${iCount})`);
                }.bind(this));
            }
        }
    });
});