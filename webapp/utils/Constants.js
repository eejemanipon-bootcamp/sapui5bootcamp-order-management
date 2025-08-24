sap.ui.define([], () => {
    "use strict";

    var constants = {
        EMPTY : "",
        SPACE : " ",
        ROUTE : {
            "Main" : {
                "View" : "Main",
                "Name" : "RouteMain"
            },
            "Create" : {
                "View" : "Create",
                "Name" : "RouteCreate"
            },
            "Details" : {
                "View" : "Details",
                "Name" : "RouteDetails"
            },
            "Edit" : {
                "View" : "Edit",
                "Name" : "RouteEdit"
            },
        },
        CONTROLS : {
            "OrdersTable"           : "ordersTable",
            "OrdersTableTitle"      : "ordersTableTitle",
            "ProductsTable"         : "productsTable",
            "ProductsTableTitle"    : "productsTableTitle",
            "InpOrderNumber"        : "inpOrderNumber",
            "DateRangeCreationDate" : "dateRangeCreationDate",
            "MultiSelectStatus"     : "multiSelectStatus"
        },
        MODEL : {
            "Status"    : "statusModel",
            "i18n"      : "i18n",
            "ViewState" : "viewState"
        },
        PARAM : {
            "SelectionSet" : "selectionSet",
            "Items"        : "items",
            "Name"         : "name",
            "Arguments"    : "arguments",
            "Total"        : "total"
        },
        DATE_FORMAT : {
            "Pattern01" : "yyyy-MM-dd",
            "Pattern02" : "dd MMM yyyy"
        },
        STATUS : {
            "Created"            : "Created",
            "Released"           : "Released",
            "PartiallyCompleted" : "Partially Completed",
            "Delivered"          : "Delivered"
        },
        STATUS_COLOR : {
            "None"        : "None",
            "Warning"     : "Warning",
            "Information" : "Information",
            "Success"     : "Success"
        },
        FIELD : {
            "OrderNum" : "OrderNum"
        },
        FILTER_FIELD : {
            "OrderNum"  : "OrderNum",
            "CreateDat" : "CreateDat",
            "Status"    : "Status"
        },
        PROPERTY : {
            "Mode"     : "/mode",
        },
        ENTITY : {
            "Orders"    : "Orders",
            "OrderItem" : "OrderItem"
        },
        EVENT : {
            "UpdateFinished" : "updateFinished"
        }
    };

    return constants;
    
});