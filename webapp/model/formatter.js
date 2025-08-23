sap.ui.define([
	"sap/ui/core/library",
    "sap/ui/model/type/Currency"
], function(mobileLibrary,Currency) {
	"use strict";

	const formatter = {
        formatDate: function(sDate) {			
	        // if(!sDate) return"";

            // const iTimestamp = parseInt(sDate.replace(/\/Date\((\d+)\)\//, '$1'), 10);
            // const oDate = new Date(iTimestamp);
            // const oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "dd MMM yyyy" });
            // return oDateFormat.format(oDate);
        },
        statusColor: function(sStatus) {
            switch(sStatus){
                case "Created":
                    return "None";
                case "Released":
                    return "Warning";
                case "Partially Completed":
                    return "Information";
                case "Delivered":
                    return "Success";
                default:
                    return "None";
            }
        }
	};

	return formatter;
});
