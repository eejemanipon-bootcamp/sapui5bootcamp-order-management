sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/ui5/trng/sapui5bootcampordermanagement/utils/Constants",
    "com/ui5/trng/sapui5bootcampordermanagement/model/formatter"
], (Controller, Constants, Formatter) => {
    "use strict";

    return Controller.extend("com.ui5.trng.sapui5bootcampordermanagement.controller.BaseController", {
        formatter: Formatter, //Usage: .fomatter.<formatter.js function>
    });
});