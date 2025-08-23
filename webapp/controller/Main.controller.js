sap.ui.define([
    "com/ui5/trng/sapui5bootcampordermanagement/controller/BaseController",
    "com/ui5/trng/sapui5bootcampordermanagement/utils/Constants",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (BaseController, Constants, Filter, FilterOperator) => {
    "use strict";

    return BaseController.extend("com.ui5.trng.sapui5bootcampordermanagement.controller.Main", {
        onInit() {
        },
        onFilterSearch: function(oEvent){
            let oTable    = this.byId("ordersTable"),
				aControls = oEvent.getParameter("selectionSet"),
				oBinding  = oTable.getBinding("items"),
				aFilters  = [];

            aControls.forEach( control => {
                let sId = control.getId();

                if (sId.includes("inpOrderNumber")){
                    // let sOrderNumber = control.getValue();

                    // if (sOrderNumber){
                    //     aFilters.push( new Filter("OrderNum", "EQ", sOrderNumber ));
                    // }

                }else if (sId.includes("dateRangeCreationDate")){
                    let dStartDate = control.getDateValue(),
                        dEndDate   = control.getSecondDateValue();

                    let iStartTimestamp = dStartDate ? dStartDate.getTime() : null,
                        iEndTimestamp   = dEndDate ? dEndDate.getTime() : null; 

                    let oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern: "yyyy-MM-dd"});
                    let sStartDate = oDateFormat.format(dStartDate);
                    let sEndDate = oDateFormat.format(dEndDate);

                    // aFilters.push( new Filter("CreateDat", FilterOperator.GE, sStartDate));
                    // aFilters.push( new Filter("CreateDat", FilterOperator.LE, sEndDate));

                    let oDate = new Date();

                    aFilters.push( new Filter("CreateDat", FilterOperator.EQ, oDate));

                    // let sStartDate = "/Date(" + iStartTimestamp + ")/";
                    // let sEndDate = "/Date(" + iEndTimestamp + ")/";

                    
                    if(iStartTimestamp && iEndTimestamp){
                        aFilters.push( new Filter("CreateDat", "BT", sStartDate, sEndDate ));
                    }
                }
            });

			// apply filter settings
			oBinding.filter(aFilters);
        },
        onFilterClear: function(){

        }
    });
});