/*
 * jQuery File Upload User Interface Plugin 7.1.1
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*jslint nomen: true, unparam: true, regexp: true */
/*global define, window, URL, webkitURL, FileReader */
// Centero.WEB 의 ui js
var doneFiles = [];
var deleteFiles = [];
var deleteActive = 0;
var lastLoaded = 0;
var totalSize = 0;
var uploadStatus = '';

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            'tmpl',
            'load-image',
            './jquery.fileupload-fp'
        ], factory);
    } else {
        // Browser globals:
        factory(
            window.jQuery,
            window.tmpl,
            window.loadImage
        );
    }
}(function ($, tmpl, loadImage) {
    'use strict';

    // The UI version extends the file upload widget
    // and adds complete user interface interaction:
    $.widget('blueimp.fileupload', $.blueimp.fileupload, {

        options: {
            // By default, files added to the widget are uploaded as soon
            // as the user clicks on the start buttons. To enable automatic
            // uploads, set the following option to true:
            autoUpload: false,
            SuccessCallbackFnNM: 'OnAfterUploadCompleted',
            AfterUploadCompletedPerFileFnNM: undefined,
            AfterRemoveFileFnNM: undefined,
            AfterAddFileFnNM: undefined,
            UploadErrorFnNM: 'OnUploadError',
            // The following option limits the number of files that are
            // allowed to be uploaded using this widget:
            maxNumberOfFiles: undefined,
            // The maximum allowed file size:
            maxFileSize: undefined,
            // The minimum allowed file size:
            minFileSize: undefined,
            // The regular expression for allowed file types, matches
            // against either file type or file name:
            acceptFileTypes: /.+$/i,
            // 수정 - 프리뷰 이미지 필요치 않음.
            //// The regular expression to define for which files a preview
            //// image is shown, matched against the file type:
            //previewSourceFileTypes: /^image\/(gif|jpeg|png)$/,
            //// The maximum file size of images that are to be displayed as preview:
            //previewSourceMaxFileSize: 5000000, // 5MB
            //// The maximum width of the preview images:
            //previewMaxWidth: 80,
            //// The maximum height of the preview images:
            //previewMaxHeight: 80,
            //// By default, preview images are displayed as canvas elements
            //// if supported by the browser. Set the following option to false
            //// to always display preview images as img elements:
            //previewAsCanvas: true,
            // The ID of the upload template:
            uploadTemplateId: 'template-upload',
            // The ID of the download template:
            //downloadTemplateId: 'template-download',
            // The container for the list of files. If undefined, it is set to
            // an element with class "files" inside of the widget element:
            filesContainer: undefined,
            // By default, files are appended to the files container.
            // Set the following option to true, to prepend files instead:
            prependFiles: false,
            // The expected data type of the upload response, sets the dataType
            // option of the $.ajax upload requests:
            dataType: 'json',

            // The add callback is invoked as soon as files are added to the fileupload
            // widget (via file input selection, drag & drop or add API call).
            // See the basic file upload widget for more information:
            add: function (e, data) {
                var that = $(this).data('fileupload'),
                    options = that.options,
                    files = data.files;
                $(this).fileupload('process', data).done(function () {
                    that._adjustMaxNumberOfFiles(-files.length);
                    data.maxNumberOfFilesAdjusted = true;
                    //data.files.valid = data.isValidated = true// 수정 - 벨리데이션 하지 않음. that._validate(files);
                    data.files.valid = data.isValidated = that._validate(files);
                    data.context = that._renderUpload(files).data('data', data);
                    options.filesContainer[
                        options.prependFiles ? 'prepend' : 'append'
                    ](data.context);
                    // 수정 - 프리뷰 하지 않음
                    //that._renderPreviews(files, data.context);
                    that._forceReflow(data.context);
                    that._transition(data.context).done(
                        function () {
                            if ((that._trigger('added', e, data) !== false) &&
                                (options.autoUpload || data.autoUpload) &&
                                data.autoUpload !== false && data.isValidated) {
                                data.submit();
                            }
                        }
                    );
                    for (var i = 0; i < data.files.length; i++) {
                        totalSize = totalSize + data.files[i].size;
                    }
                    $(document.getElementById('spnFUTotalSize')).text(that._formatFileSize(totalSize));


                });
            },
            // Callback for the start of each file upload request:
            send: function (e, data) {
                var that = $(this).data('fileupload');
                if (!data.isValidated) {
                    if (!data.maxNumberOfFilesAdjusted) {
                        that._adjustMaxNumberOfFiles(-data.files.length);
                        data.maxNumberOfFilesAdjusted = true;
                    }
                    // 수정 - 벨리데이션 하지 않음.
                    if (!that._validate(data.files)) {
                        return false;
                    }
                }
                if (data.context && data.dataType &&
                    data.dataType.substr(0, 6) === 'iframe') {
                    // Iframe Transport does not support progress events.
                    // In lack of an indeterminate progress bar, we set
                    // the progress to 100%, showing the full animated bar:
                    data.context
                        .find('.progress-bar').addClass(
                            !$.support.transition && 'progress-animated'
                        )
                        .attr('aria-valuenow', 100)
                        .find('.progress-bar').css(
                            'width',
                            '100%'
                        );
                }
                return that._trigger('sent', e, data);
            },
            // Callback for successful uploads:
            done: function (e, data) {
                var that = $(this).data('fileupload'),
                    files = that._getFilesFromResponse(data),
                    template,
                    deferred;
                doneFiles.push(files);
                if (data.context) {
                    data.context.each(function (index) {
                        var file = files[index] ||
                            { error: 'Empty file upload result' },
                            deferred = that._addFinishedDeferreds();
                        if (file.error) {
                            that._adjustMaxNumberOfFiles(1);
                        }
                        //that._transition($(this)).done(
                        //    function () {
                        //        var node = $(this);
                        //template = that._renderDownload([file])
                        //    .replaceAll(node);
                        //        that._forceReflow(template);
                        //        that._transition(template).done(
                        //            function () {
                        //                data.context = $(this);
                        //                that._trigger('completed', e, data);
                        //                that._trigger('finished', e, data);
                        //                deferred.resolve();
                        //            }
                        //        );
                        //    }
                        //);
                    });
                } else {
                    if (files.length) {
                        $.each(files, function (index, file) {
                            if (data.maxNumberOfFilesAdjusted && file.error) {
                                that._adjustMaxNumberOfFiles(1);
                            } else if (!data.maxNumberOfFilesAdjusted &&
                                !file.error) {
                                that._adjustMaxNumberOfFiles(-1);
                            }
                        });
                        data.maxNumberOfFilesAdjusted = true;
                    }
                    //template = that._renderDownload(files)
                    //    .appendTo(that.options.filesContainer);
                    //that._forceReflow(template);
                    //deferred = that._addFinishedDeferreds();
                    //that._transition(template).done(
                    //    function () {
                    //        data.context = $(this);
                    //        that._trigger('completed', e, data);
                    //        that._trigger('finished', e, data);
                    //        deferred.resolve();
                    //    }
                    //);
                }
            },
            // Callback for failed (abort or error) uploads:
            fail: function (e, data) {
                var that = $(this).data('fileupload'),
                    template,
                    deferred;
                if (data.maxNumberOfFilesAdjusted) {
                    that._adjustMaxNumberOfFiles(data.files.length);
                }
                if (data.context) {
                    data.context.each(function (index) {
                        if (data.errorThrown !== 'abort') {
                            var file = data.files[index];
                            file.error = file.error || data.errorThrown ||
                                true;
                            deferred = that._addFinishedDeferreds();
                            that._transition($(this)).done(
                                function () {
                                    var node = $(this);
                                    template = that._renderDownload([file])
                                        .replaceAll(node);
                                    that._forceReflow(template);
                                    that._transition(template).done(
                                        function () {
                                            data.context = $(this);
                                            that._trigger('failed', e, data);
                                            that._trigger('finished', e, data);
                                            deferred.resolve();
                                        }
                                    );
                                }
                            );
                        } else {
                            deferred = that._addFinishedDeferreds();
                            that._transition($(this)).done(
                                function () {
                                    $(this).remove();
                                    that._trigger('failed', e, data);
                                    that._trigger('finished', e, data);
                                    deferred.resolve();
                                }
                            );
                        }
                    });
                } else if (data.errorThrown !== 'abort') {
                    data.context = that._renderUpload(data.files)
                        .appendTo(that.options.filesContainer)
                        .data('data', data);
                    that._forceReflow(data.context);
                    deferred = that._addFinishedDeferreds();
                    that._transition(data.context).done(
                        function () {
                            data.context = $(this);
                            that._trigger('failed', e, data);
                            that._trigger('finished', e, data);
                            deferred.resolve();
                        }
                    );
                } else {
                    that._trigger('failed', e, data);
                    that._trigger('finished', e, data);
                    that._addFinishedDeferreds().resolve();
                }
            },
            // Callback for upload progress events:
            progress: function (e, data) {
                if (data.context) {
                    var progress = parseInt(data.loaded / data.total * 100, 10);
                    data.context.find('.progress')
                        .attr('aria-valuenow', progress)
                        .find('.progress-bar').css(
                            'width',
                            progress + '%'
                        )
                        .find('span')
                        .text(progress + '%');
                }
            },
            // Callback for global upload progress events:
            progressall: function (e, data) {
                var $this = $(this),
                    progress = parseInt(data.loaded / data.total * 100, 10),
                    globalProgressNode = $this.find('#divFUGlobalProgress'),
                    extendedProgressNode = globalProgressNode
                        .find('#tdProgressExtended');
                if (extendedProgressNode.length) {
                    extendedProgressNode.html(
                        $this.data('fileupload')._renderExtendedProgress(data)
                    );
                }
                globalProgressNode
                    .find('.progress')
                    .attr('aria-valuenow', progress)
                    .find('.progress-bar').css(
                        'width',
                        progress + '%'
                    )
                    .find('span')
                            .text(progress + '%');

            },
            // Callback for uploads start, equivalent to the global ajaxStart event:
            start: function (e) {
                var that = $(this).data('fileupload');
                that._resetFinishedDeferreds();
                that._transition($(this).find('#divFUGlobalProgress')).done(
                    function () {
                        that._trigger('started', e);
                    }
                );
            },
            // Callback for uploads stop, equivalent to the global ajaxStop event:
            stop: function (e, data) {
                var that = $(this).data('fileupload'),
                    deferred = that._addFinishedDeferreds();
                $.when.apply($, that._getFinishedDeferreds())
                    .done(function () {
                        that._trigger('stopped', e);
                    });
                //that._transition($(this).find('#divFUGlobalProgress')).done(
                //    function () {
                //        $(this).find('.progress')
                //            .attr('aria-valuenow', '0')
                //            .find('.progress-bar').css('width', '0%');
                //        $(this).find('.progress-extended').html('&nbsp;');
                //        deferred.resolve();
                //    }
                //);
                uploadStatus = data;
                if (uploadStatus == "success" || uploadStatus == "abort") {
                    OnAfterUploadStop();
                } else {
                    saveYN = false;
                    that.options.UploadErrorFnNM != undefined ? eval(that.options.UploadErrorFnNM)(null, data, null) : null;
                }
            },
            // Callback for file deletion:
            destroy: function (e, data) {
                var that = $(this).data('fileupload');
                if (data.url) {
                    $.ajax(data);
                    that._adjustMaxNumberOfFiles(1);
                }
                that._transition(data.context).done(
                    function () {
                        $(this).remove();
                        that._trigger('destroyed', e, data);
                    }
                );
            }
        },

        _resetFinishedDeferreds: function () {
            this._finishedUploads = [];
        },

        _addFinishedDeferreds: function (deferred) {
            if (!deferred) {
                deferred = $.Deferred();
            }
            this._finishedUploads.push(deferred);
            return deferred;
        },

        _getFinishedDeferreds: function () {
            return this._finishedUploads;
        },

        _getFilesFromResponse: function (data) {
            if (data.result && $.isArray(data.result.files)) {
                return data.result.files;
            }
            return [];
        },

        // Link handler, that allows to download files
        // by drag & drop of the links to the desktop:
        _enableDragToDesktop: function () {
            var link = $(this),
                url = link.prop('href'),
                name = link.prop('download'),
                type = 'application/octet-stream';
            link.bind('dragstart', function (e) {
                try {
                    e.originalEvent.dataTransfer.setData(
                        'DownloadURL',
                        [type, name, url].join(':')
                    );
                } catch (err) { }
            });
        },

        _adjustMaxNumberOfFiles: function (operand) {
            if (typeof this.options.maxNumberOfFiles === 'number') {
                this.options.maxNumberOfFiles += operand;
                if (this.options.maxNumberOfFiles < 1) {
                    this._disableFileInputButton();
                } else {
                    this._enableFileInputButton();
                }
            }
        },

        _formatFileSize: function (bytes) {
            if (typeof bytes !== 'number') {
                return '';
            }
            if (bytes >= 1000000000) {
                return (bytes / 1000000000).toFixed(2) + ' GB';
            }
            if (bytes >= 1000000) {
                return (bytes / 1000000).toFixed(2) + ' MB';
            }
            return (bytes / 1000).toFixed(2) + ' KB';
        },

        _formatBitrate: function (bits) {
            if (typeof bits !== 'number') {
                return '';
            }
            if (bits >= 1000000000) {
                return (bits / 1000000000).toFixed(2) + ' Gbit/s';
            }
            if (bits >= 1000000) {
                return (bits / 1000000).toFixed(2) + ' Mbit/s';
            }
            if (bits >= 1000) {
                return (bits / 1000).toFixed(2) + ' kbit/s';
            }
            return bits.toFixed(2) + ' bit/s';
        },

        _formatTime: function (seconds) {
            var date = new Date(seconds * 1000),
                days = parseInt(seconds / 86400, 10);
            days = days ? days + 'd ' : '';
            return days +
                ('0' + date.getUTCHours()).slice(-2) + ':' +
                ('0' + date.getUTCMinutes()).slice(-2) + ':' +
                ('0' + date.getUTCSeconds()).slice(-2);
        },

        _formatPercentage: function (floatValue) {
            return (floatValue * 100).toFixed(2) + ' %';
        },

        _renderExtendedProgress: function (data) {
            return '<span>' + this._formatBitrate(data.bitrate) + '</span> &nbsp;| &nbsp;<span>' +
                this._formatTime(
                    (data.total - data.loaded) * 8 / data.bitrate
                ) + '</span> &nbsp;|&nbsp; <span><span class="progress-txtGreen">' +
                //this._formatPercentage(
                //    data.loaded / data.total
                //) + ' | ' +
                this._formatFileSize(data.loaded) + '</span> / ' +
                this._formatFileSize(data.total) + '</span>';
        },

        _hasError: function (file) {
            if (file.error) {
                return file.error;
            }
            // The number of added files is subtracted from
            // maxNumberOfFiles before validation, so we check if
            // maxNumberOfFiles is below 0 (instead of below 1):
            if (this.options.maxNumberOfFiles < 0) {
                return 'Maximum number of files exceeded';
            }
            // Files are accepted if either the file type or the file name
            // matches against the acceptFileTypes regular expression, as
            // only browsers with support for the File API report the type:
            if (!(this.options.acceptFileTypes.test(file.type) ||
                this.options.acceptFileTypes.test(file.name))) {
                return 'Filetype not allowed';
            }
            if (this.options.maxFileSize &&
                file.size > this.options.maxFileSize) {
                return 'File is too big';
            }
            if (typeof file.size === 'number' &&
                file.size < this.options.minFileSize) {
                return 'File is too small';
            }
            return null;
        },

        // 수정 = 벨리데이션 하지 않음.
        _validate: function (files) {
            var that = this,
                valid = !!files.length;
            $.each(files, function (index, file) {
                file.error = that._hasError(file);
                if (file.error) {
                    valid = false;
                }
            });
            return valid;
        },

        _renderTemplate: function (func, files) {
            if (!func) {
                return $();
            }
            var result = func({
                files: files,
                formatFileSize: this._formatFileSize,
                options: this.options
            });
            if (result instanceof $) {
                return result;
            }
            return $(this.options.templatesContainer).html(result).children();
        },

        // 수정 - preview 하지 않음.
        //_renderPreview: function (file, node) {
        //    var that = this,
        //        options = this.options,
        //        dfd = $.Deferred();
        //    return ((loadImage && loadImage(
        //        file,
        //        function (img) {
        //            node.append(img);
        //            that._forceReflow(node);
        //            that._transition(node).done(function () {
        //                dfd.resolveWith(node);
        //            });
        //            if (!$.contains(that.document[0].body, node[0])) {
        //                // If the element is not part of the DOM,
        //                // transition events are not triggered,
        //                // so we have to resolve manually:
        //                dfd.resolveWith(node);
        //            }
        //        },
        //        {
        //            maxWidth: options.previewMaxWidth,
        //            maxHeight: options.previewMaxHeight,
        //            canvas: options.previewAsCanvas
        //        }
        //    )) || dfd.resolveWith(node)) && dfd;
        //},

        //_renderPreviews: function (files, nodes) {
        //    var that = this,
        //        options = this.options;
        //    nodes.find('.preview span').each(function (index, element) {
        //        var file = files[index];
        //        if (options.previewSourceFileTypes.test(file.type) &&
        //                ($.type(options.previewSourceMaxFileSize) !== 'number' ||
        //                file.size < options.previewSourceMaxFileSize)) {
        //            that._processingQueue = that._processingQueue.pipe(function () {
        //                var dfd = $.Deferred();
        //                that._renderPreview(file, $(element)).done(
        //                    function () {
        //                        dfd.resolveWith(that);
        //                    }
        //                );
        //                return dfd.promise();
        //            });
        //        }
        //    });
        //    return this._processingQueue;
        //},

        _renderUpload: function (files) {
            return this._renderTemplate(
                this.options.uploadTemplate,
                files
            );
        },

        _renderDownload: function (files) {
            return this._renderTemplate(
                this.options.downloadTemplate,
                files
            ).find('a[download]').each(this._enableDragToDesktop).end();
        },

        _startHandler: function (e) {
            e.preventDefault();
            var button = $(e.currentTarget),
                template = button.closest("tr[name='trUpload']"),
                data = template.data('data'),
                btnDeletes = this.element.find('.files button[name="btnDelete"]');
            if (data && data.submit && !data.jqXHR && data.submit()) {
                //button.prop('disabled', true);
                btnDeletes.prop('disabled', true);
            }
        },

        _cancelHandler: function (e) {
            e.preventDefault();
            var template = $(e.currentTarget).closest("tr[name='trUpload']"),
                data = template.data('data') || {};
            if (!data.jqXHR) {
                data.errorThrown = 'abort';
                this._trigger('fail', e, data);
            } else {
                data.jqXHR.abort();
            }
            for (var i = 0; i < data.files.length; i++) {
                totalSize = totalSize - data.files[i].size;
            }
            $(document.getElementById('spnFUTotalSize')).text(this._formatFileSize(totalSize));
        },

        _deleteHandler: function (e) {
            e.preventDefault();
            var button = $(e.currentTarget),
                fuOptions = $("#fileupload").data('fileupload').options,
                url = button.data().url,
                arr = url.split("/");

            if (button.closest("tr[name='trDownload']").length > 0) {
                this._trigger('destroy', e, $.extend({
                    context: button.closest("tr[name='trDownload']"),
                    type: 'DELETE',
                    dataType: this.options.dataType,
                    beforeSend: function () {
                        deleteActive++;
                    },
                    success: function (data, textStatus, jqXHR) {
                        deleteFiles.push(data.files);
                        fuOptions.AfterRemoveFileFnNM != undefined ? eval(fuOptions.AfterRemoveFileFnNM)(data, textStatus, jqXHR) : null;
                        //deleteActive--;
                        //if(deleteActive == 0)
                        //    deleteSuccess(JSON.stringify(deleteFiles));
                    },
                    fail: function (data, textStatus, jqXHR) {
                        fuOptions.UploadErrorFnNM != undefined ? eval(fuOptions.UploadErrorFnNM)(data, textStatus, jqXHR) : null;
                        //deleteActive--;
                        //if(deleteActive == 0)
                        //    deleteSuccess(JSON.stringify(deleteFiles));
                    }

                }, button.data()));
            } else {

                var template = $(e.currentTarget).closest("tr[name='trUpload']"),
                    data = template.data('data') || {};
                data.errorThrown = 'abort';
                this._trigger('fail', e, data);
            }
            //if (button.closest("tr[name='trDownload']").length > 0) {

            //    $.ajax({
            //        type: "DELETE",
            //        url: "/" + arr[1] + "/" + arr[2],
            //        //dataType: this.options.dataType,
            //            data: { subFolder: arr[3], fileSEQ: arr[4], fileName: arr[5], chgName: arr[6], fileType: arr[7], fileSize: arr[8]},
            //        success: function (data, textStatus, jqXHR) {
            //            //options.SuccessCallbackFnNM != undefined ? eval(options.SuccessCallbackFnNM)(data + "||" + JSON.stringify(deleteFiles), textStatus, jqXHR) : null;
            //            1 + 1;

            //        },
            //        error: function (jqXHR, textStatus, error) {
            //            //options.UploadErrorFnNM != undefined ? eval(options.UploadErrorFnNM)(error, textStatus, jqXHR) : null;
            //            1 + 1;
            //        }
            //    });
            //    this._trigger('destroy', e, $.extend({
            //        context: button.closest("tr[name='trDownload']"),
            //        type: 'DELETE',
            //        dataType: this.options.dataType,
            //        beforeSend: function () {
            //            deleteActive++;
            //        },
            //        success: function (data, textStatus, jqXHR) {
            //            deleteFiles.push(data.files);
            //            fuOptions.AfterRemoveFileFnNM != undefined ? eval(fuOptions.AfterRemoveFileFnNM)(data, textStatus, jqXHR) : null;
            //            //deleteActive--;
            //            //if(deleteActive == 0)
            //            //    deleteSuccess(JSON.stringify(deleteFiles));
            //        },
            //        fail: function (data, textStatus, jqXHR) {
            //            fuOptions.UploadErrorFnNM != undefined ? eval(fuOptions.UploadErrorFnNM)(data, textStatus, jqXHR) : null;
            //            //deleteActive--;
            //            //if(deleteActive == 0)
            //            //    deleteSuccess(JSON.stringify(deleteFiles));
            //        }

            //    }, button.data()));
            //} else {

            //    var template = $(e.currentTarget).closest("tr[name='trUpload']"),
            //        data = template.data('data') || {};
            //    data.errorThrown = 'abort';
            //    this._trigger('fail', e, data);
            //}
        },

        _forceReflow: function (node) {
            return $.support.transition && node.length &&
                node[0].offsetWidth;
        },

        _transition: function (node) {
            var dfd = $.Deferred();
            if ($.support.transition && node.hasClass('fade')) {
                node.bind(
                    $.support.transition.end,
                    function (e) {
                        // Make sure we don't respond to other transitions events
                        // in the container element, e.g. from button elements:
                        if (e.target === node[0]) {
                            node.unbind($.support.transition.end);
                            dfd.resolveWith(node);
                        }
                    }
                ).toggleClass('in');
            } else {
                node.toggleClass('in');
                dfd.resolveWith(node);
            }
            return dfd;
        },

        _initButtonBarEventHandlers: function () {
            var fileUploadButtonBar = this.element.find('#divFUButtons'),
                filesList = this.options.filesContainer;
            this._on(fileUploadButtonBar.find('#btnFUStart'), {
                click: function (e) {
                    e.preventDefault();
                    if (filesList.find("button:enabled[name='btnStart']").length > 0)
                        filesList.find("button:enabled[name='btnStart']").click();
                    else {
                        OnAfterUploadStop();
                    }
                }
            });
            this._on(fileUploadButtonBar.find('#btnFUCancel'), {
                click: function (e) {
                    e.preventDefault();

                    // 컨트롤에서 선택 된 파일에 대해서 업로드 취소
                    var cancelFileList = filesList.find("td[name='tdCheck'] input:checked").parent().parent().find("button[name='btnCancel']");
                    if (cancelFileList.length === 0) {
                        GtDivMsg.OpenWarning('업로드를 취소 할 파일을 선택해주세요.');
                        return;
                    } else {
                        cancelFileList.click();

                        // 체크박스 초기화
                        var chkBox = fileUploadButtonBar.find('.toggle');
                        chkBox.prop('checked', false);
                        chkBox.attr('checkYN', '');
                    }

                    // 전체 파일 업로드 취소
                    //var template = this.element.find('tr[name="trUpload"]'),
                    //    data,
                    //    confirmYN = true;

                    //for (var i = 0; i < template.length; i++) {
                    //    data = $(template[i]).data('data');
                    //    if (!data.jqXHR) {
                    //        //data.errorThrown = 'abort';
                    //        //this._trigger('fail', e, data);
                    //    } else {
                    //        if (confirmYN && confirm("전체 업로드를 취소하시겠습니까?") === "0") {
                    //            break;
                    //        } else {
                    //            data.jqXHR.abort();
                    //            confirmYN = false;
                            //}
                    //    }
                    //}
                    //filesList.find("button[name='btnCancel']").click();
                }
            });
            this._on(fileUploadButtonBar.find('#btnFUDelete'), {
                click: function (e) {
                    e.preventDefault();

                    // 기존에 등록 된 파일 중 선택 된 항목을 삭제
                    var delteFileList = filesList.find("td[name='tdCheck'] input:checked").parent().parent().find("button[name='btnDelete']");
                    if (delteFileList.length === 0) {
                        GtDivMsg.OpenWarning('삭제 할 파일을 선택해주세요.');
                        return;
                    }

                    delteFileList.click();

                    // 체크박스 초기화
                    var chkBox = fileUploadButtonBar.find('.toggle');
                    chkBox.prop('checked', false);
                    chkBox.attr('checkYN', '');
                }
            });
            this._on(fileUploadButtonBar.find('#btnFUSelectAll'), {
                click: function (e) {
                    var checked = $(e.currentTarget).attr("checkYN") == "" ? "checked" : "";
                    filesList.find("td[name='tdCheck'] input").prop(
                        'checked',
                        checked
                    );
                    $(e.currentTarget).attr("checkYN", checked);
                }
            });
        },

        _destroyButtonBarEventHandlers: function () {
            this._off(
                this.element.find('#divFUButtons button'),
                'click'
            );
            this._off(
                this.element.find('#divFUButtons #btnFUSelectAll'),
                'change.'
            );
        },

        _initEventHandlers: function () {
            this._super();
            this._on(this.options.filesContainer, {
                "click button[name='btnStart']": this._startHandler,
                "click button[name='btnCancel']": this._cancelHandler,
                "click button[name='btnDelete']": this._deleteHandler
            });
            this._initButtonBarEventHandlers();
        },

        _destroyEventHandlers: function () {
            this._destroyButtonBarEventHandlers();
            this._off(this.options.filesContainer, 'click');
            this._super();
        },

        _enableFileInputButton: function () {
            this.element.find('.fileinput-button input')
                .prop('disabled', false)
                .parent().removeClass('disabled');
        },

        _disableFileInputButton: function () {
            this.element.find('.fileinput-button input')
                .prop('disabled', true)
                .parent().addClass('disabled');
        },

        _initTemplates: function () {
            var options = this.options;
            options.templatesContainer = this.document[0].createElement(
                options.filesContainer.prop('nodeName')
            );
            if (tmpl) {
                if (options.uploadTemplateId) {
                    options.uploadTemplate = tmpl(options.uploadTemplateId);
                }
                if (options.downloadTemplateId) {
                    options.downloadTemplate = tmpl(options.downloadTemplateId);
                }
            }
        },

        _initFilesContainer: function () {
            var options = this.options;
            if (options.filesContainer === undefined) {
                options.filesContainer = this.element.find('.files');
            } else if (!(options.filesContainer instanceof $)) {
                options.filesContainer = $(options.filesContainer);
            }
        },

        _stringToRegExp: function (str) {
            var parts = str.split('/'),
                modifiers = parts.pop();
            parts.shift();
            return new RegExp(parts.join('/'), modifiers);
        },

        _initRegExpOptions: function () {
            var options = this.options;
            if ($.type(options.acceptFileTypes) === 'string') {
                options.acceptFileTypes = this._stringToRegExp(
                    options.acceptFileTypes
                );
            }
            if ($.type(options.previewSourceFileTypes) === 'string') {
                options.previewSourceFileTypes = this._stringToRegExp(
                    options.previewSourceFileTypes
                );
            }
        },

        _initSpecialOptions: function () {
            this._super();
            this._initFilesContainer();
            this._initTemplates();
            this._initRegExpOptions();
        },

        _setOption: function (key, value) {
            this._super(key, value);
            if (key === 'maxNumberOfFiles') {
                this._adjustMaxNumberOfFiles(0);
            }
        },

        _create: function () {
            this._super();
            this._refreshOptionsList.push(
                'filesContainer',
                'uploadTemplateId',
                'downloadTemplateId'
            );
            if (!this._processingQueue) {
                this._processingQueue = $.Deferred().resolveWith(this).promise();
                this.process = function () {
                    return this._processingQueue;
                };
            }
            this._resetFinishedDeferreds();
        },

        enable: function () {
            var wasDisabled = false;
            if (this.options.disabled) {
                wasDisabled = true;
            }
            this._super();
            if (wasDisabled) {
                this.element.find('input, button').prop('disabled', false);
                this._enableFileInputButton();
            }
        },

        disable: function () {
            if (!this.options.disabled) {
                this.element.find('input, button').prop('disabled', true);
                this._disableFileInputButton();
            }
            this._super();
        }

    });

}));
