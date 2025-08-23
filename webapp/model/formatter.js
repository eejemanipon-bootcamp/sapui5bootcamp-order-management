sap.ui.define([
    "com/ui5/trng/sapui5bootcampordermanagement/utils/Constants",
	"sap/ui/core/format/DateFormat"
], function(Constants, DateFormat) {
	"use strict";

	const formatter = {
        /**
         * Method to format OData date format (yyyy-MM-dd) into medium date format (dd MMM yyyy)
         * @public
         * @param {String} [sDate] OData date
         * @returns {Date} Medium date format
         */
        formatDate: function(sDate) {			
	        if(sDate){
                const oDateFormatInput = DateFormat.getDateInstance({ pattern: Constants.DATE_FORMAT.Pattern01 });
                let oDate = oDateFormatInput.parse(sDate);

                const oDateFormatOutput = DateFormat.getDateInstance({ pattern: Constants.DATE_FORMAT.Pattern02 });
                return oDateFormatOutput.format(oDate);
            }
        },
        /**
         * Method to format color to its corresponding state
         * @public
         * @param {String} [sStatus] Status value
         * @returns {ObjectStatus} Color for status
         */
        statusColor: function(sStatus) {
            switch(sStatus){
                case Constants.STATUS.Created:
                    return Constants.STATUS_COLOR.None;
                case Constants.STATUS.Released:
                    return Constants.STATUS_COLOR.Warning;
                case Constants.STATUS.PartiallyCompleted:
                    return Constants.STATUS_COLOR.Information;
                case Constants.STATUS.Delivered:
                    return Constants.STATUS_COLOR.Success;
                default:
                    return Constants.STATUS_COLOR.None;
            }
        }
	};

	return formatter;
});
