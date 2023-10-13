/*
 * jQuery File Upload Plugin JS Example 7.0
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*jslint nomen: true, unparam: true, regexp: true */
/*global $, window, document */
var saveYN = false;
//$(function () {
(function ($) {
    'use strict';

    $('#fileupload').fileupload({

        url: uploadAction
    });

    var options = $('#fileupload').data('fileupload').options;
    $('#fileupload')
        .bind('fileuploadadd', function (e, data) { options.AfterAddFileFnNM != undefined ? eval(options.AfterAddFileFnNM)(e, data) : null; })
        .bind('fileuploaddone', function (e, data) { options.AfterUploadCompletedPerFileFnNM != undefined ? eval(options.AfterUploadCompletedPerFileFnNM)(e, data) : null; })


    // Enable iframe cross-domain access via redirect option:
    $('#fileupload').fileupload(
        'option',
        'redirect',
        window.location.href.replace(
            /\/[^\/]*$/,
            '/cors/result.html?%s'
        )
    );

    // Load existing files:
    $.ajax({
        // Uncomment the following to send cross-domain cookies:
        //xhrFields: {withCredentials: true},
        url: $('#fileupload').fileupload('option', 'url'),
        dataType: 'json',
        context: $('#fileupload')[0]
    }).done(function (result) {
        $(this).fileupload('option', 'done')
            .call(this, null, { result: result });
    });

});

function StartUpload() {
    $("#btnFUStart").click();
}

function OnAfterUploadStop() {

    var options = $('#fileupload').data('fileupload').options;
    if (saveYN || uploadStatus == "abort") {
        $.ajax({
            type: "POST",
            url: "/Files/UploadRealFiles/" + uploadStatus,
            //contentType: "application/json; charset=utf-8",
            data: { uploadFileList: (doneFiles == undefined ? null : JSON.stringify(doneFiles)), deleteFileList: (deleteFiles == undefined ? null : JSON.stringify(deleteFiles)), maxExitSEQ: $("#hdExitFileCNT").val(), subFolder: document.getElementById("hdSubFolder").value },
            //dataType: "json",
            dataType: "text",
            success: function (data, textStatus, jqXHR) {
                if (uploadStatus != "abort")
                    options.SuccessCallbackFnNM != undefined ? eval(options.SuccessCallbackFnNM)(data + "||" + JSON.stringify(deleteFiles), textStatus, jqXHR) : null;
                doneFiles = [];
                deleteFiles = [];

            },
            error: function (jqXHR, textStatus, error) {
                doneFiles = [];
                deleteFiles = [];

                options.UploadErrorFnNM != undefined ? eval(options.UploadErrorFnNM)(error, textStatus, jqXHR) : null;
            }
        });
        saveYN = false;
    }
}
