//---------------------------------------------------------------------
// <copyright file="showTagsApp.ts">
//    This code is licensed under the MIT License.
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF 
//    ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED 
//    TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
//    PARTICULAR PURPOSE AND NONINFRINGEMENT.
// </copyright>
/// <reference path='ref/jquery.d.ts' />
/// <reference path='ref/VSS.d.ts' />

var showTagsBuildMenu = (function () {
    "use strict";
    
    return {
        openShowTagsDialog: function (actionContext) {
            VSS.getService("ms.vss-web.dialog-service").then(function (dialogSvc: IHostDialogService) {
                var extInfo = VSS.getExtensionContext();
                var vsoContext = VSS.getWebContext();

                var dialogOptions = {
                    title: "Build Tags - " + actionContext.buildNumber,
                    width: 600,
                    height: 300,
                    buttons: null,
                };

                dialogSvc.openDialog(extInfo.publisherId + "." + extInfo.extensionId + "." + "showTagsDialog", dialogOptions, { buildId: actionContext.id });
            });
        },
        execute: function (actionContext) {
            this.openShowTagsDialog(actionContext);
        }
    };
} ());

VSS.register("showTagsBuildMenu", function (context) {
    return showTagsBuildMenu;
});