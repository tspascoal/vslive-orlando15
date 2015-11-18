//---------------------------------------------------------------------
// <copyright file="addTagApp.ts">
//    This code is licensed under the MIT License.
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF 
//    ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED 
//    TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
//    PARTICULAR PURPOSE AND NONINFRINGEMENT.
// </copyright>
/// <reference path='ref/jquery.d.ts' />
/// <reference path='ref/VSS.d.ts' />

class TagBuildManager {

    private projectName: string;
    private buildId: string;

    constructor(projectName: string, buildId: string) {
        this.projectName = projectName;
        this.buildId = buildId;
    }

    public addTag(tag) {
        var that = this;
        VSS.require(["VSS/Service", "TFS/Build/RestClient"], function (VSSService, WebAPI) {

            VSS.ready(() => {
                var vsoContext = VSS.getWebContext();
                // Get the REST client
                var buildClient = VSSService.getCollectionClient(WebAPI.BuildHttpClient);
                buildClient.addBuildTag(that.projectName, that.buildId, tag).then(tags => {
                });
            });
        });
    }
}


var tagBuildMenu = (function () {
    "use strict";

    var dialog;
    var buildManager;
    return {
        openAddTagDialog: function (actionContext) {
            VSS.getService("ms.vss-web.dialog-service").then(function (dialogSvc: IHostDialogService) {
                var extInfo = VSS.getExtensionContext();
                var vsoContext = VSS.getWebContext();

                var dialog;
                var dialogForm;

                var dialogOptions = {
                    title: "Add Build Tag",
                    width: 400,
                    height: 150,
                    okText: "Add",
                    cancelText: "Cancel",
                    okCallback: function (tag) {
                        // Log the result to the console
                        console.log(JSON.stringify(tag));
                        if (tag !== "") {
                            buildManager.addTag(tag);
                        }
                        dialog.close();
                    },
                    getDialogResult: function () {
                        // Get the result from form object
                        return dialogForm.getFormData();
                    }
                };

                buildManager = new TagBuildManager(vsoContext.project.name, actionContext.id);

                dialogSvc.openDialog(extInfo.publisherId + "." + extInfo.extensionId + "." + "addTagForm", dialogOptions, null).then((dlg) => {
                    dialog = dlg;

                    dialog.getContributionInstance("addTagForm").then(function (formInstance) {
                        dialogForm = formInstance;
                        dialog.updateOkButton(true);
                    });
                });
            });
        },
        execute: function (actionContext) {
            this.openAddTagDialog(actionContext);
        }
    };
} ());

VSS.register("addTagBuildMenu", function (context) {
    return tagBuildMenu;
});