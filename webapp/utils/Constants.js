sap.ui.define([], () => {
    "use strict";

    var constants = {
        EMPTY : "",
        SPACE : " ",
        ROUTE : {
            "Create" : "RouteCreate",
            "Details" : "RouteDetails",
            "Edit" : "RouteEdit"
        },
        CONTROLS : {
            "OrdersTable" : "ordersTable",
            "InpOrderNumber" : "inpOrderNumber",
            "DateRangeCreationDate" : "dateRangeCreationDate",
            "MultiSelectStatus" : "multiSelectStatus"
        },
        MODEL : {
            "Status" : "statusModel"
        },
        PARAM : {
            "SelectionSet" : "selectionSet",
            "Items" : "items"
        },
        DATE_FORMAT : {
            "Pattern01" : "yyyy-MM-dd",
            "Pattern02" : "dd MMM yyyy"
        },
        STATUS : {
            "Created" : "Created",
            "Released" : "Released",
            "PartiallyCompleted" : "Partially Completed",
            "Delivered" : "Delivered"
        },
        STATUS_COLOR : {
            "None" : "None",
            "Warning" : "Warning",
            "Information" : "Information",
            "Success" : "Success"
        },
        FILTER_FIELD : {
            "OrderNum" : "OrderNum",
            "CreateDat" : "CreateDat",
            "Status" : "Status"
        }
    };

    return constants;
    
});