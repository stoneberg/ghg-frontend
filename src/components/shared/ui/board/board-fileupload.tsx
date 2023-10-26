import "@/styles/Common/FileUpload/css/GTFu.Style.css";
import { byteToSuffix } from "@/utils/fileUtil";
import { Upload, message } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import { UploadFile } from "antd/lib/upload/interface";
import { useTranslations } from 'next-intl';
import numeral from "numeral";
import React, { HTMLAttributes, useEffect, useRef, useState } from "react";

interface IUploadFile extends UploadFile {
    isChecked?: boolean
    errorMessage?: string
}

interface IBoardFileUploadProps<T> extends HTMLAttributes<HTMLStyleElement> {
    acceptFileTypes?: RegExp;
    maxFileSize?: number;
    maxCount?: number;
    files?: IUploadFile[]
}

const defaultFileUploadProps: IBoardFileUploadProps<null> = {
    acceptFileTypes: /(\.|\/)(gif|jpg|jpeg|png|xls|xlsx|doc|docx|ppt|pptx|pdf|hwp|txt)/i,
    maxFileSize: 209715200,
    maxCount: 5,
    files: [],
}

/**
 * 
 * @param props 
 * 
 *    $('#fileupload').fileupload({
       acceptFileTypes: acceptFileTypes,
       maxFileSize: maxFileSize,
       maxNumberOfFiles: maxNumberOfFiles,
       SuccessCallbackFnNM: 'OnAfterUploadCompleted',
       AfterUploadCompletedPerFileFnNM: undefined,
       AfterRemoveFileFnNM: undefined,
       AfterAddFileFnNM: undefined,
       UploadErrorFnNM: 'OnUploadError',
       url: uploadAction
   });
 * @returns 
 */

const BoardFileUpload = <T extends object>(props: IBoardFileUploadProps<T>) => {

    const mergeProps = { ...defaultFileUploadProps, ...props }
    const t = useTranslations('Common');
    const [fileList, setFileList] = useState<IUploadFile[]>(mergeProps.files);
    const [uploading, setUploading] = useState(false);
    const [totalFileSize, setTotalFileSize] = useState(0);
    const uploadRef = useRef();

    const handleUpload = () => {
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('files[]', file as RcFile);
        });
        setUploading(true);
        // You can use any AJAX library you like
        fetch('https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188', {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then(() => {
                setFileList([]);
                message.success('upload successfully.');
            })
            .catch(() => {
                message.error('upload failed.');
            })
            .finally(() => {
                setUploading(false);
            });
    };

    const handleCheckAll = () => {
        if (fileList.length > 0) {
            setFileList(fileList.map(t => {
                t.isChecked = !t.isChecked
                return t;
            }));
        }
    }
    const handleCheck = (item: IUploadFile) => {

        item.isChecked = !item.isChecked
        setFileList(fileList.map(t => {
            if (t.uid == item.uid)
                return item;
            else
                return t;
        }));
    }

    const handleCancelUploadOne = (item: IUploadFile) => {
        setFileList(fileList.filter((i) => {
            return i.uid != item.uid
        }));
    }

    const handleCancelUploadChecked = () => {
        setFileList(fileList.filter((i) => {
            return !i.isChecked
        }));
    }

    useEffect(() => {
        if (fileList && fileList.length > 0) {
            setTotalFileSize(fileList.reduce((p, c) => {
                return {
                    uid: "",
                    size: numeral(p.size).add(c.size).value(),
                    name: "total"
                }
            }).size);
        }
    }, [fileList])

    const uploadProps: UploadProps = {
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        fileList: fileList,
        multiple: true,
        progress: {
            format: (percent, successPerchent) => (
                <div>{percent}</div>
            ),
        },
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file: RcFile, uploadFileList) => {

            console.log("beforeUpload", file, uploadFileList);

            setFileList([...fileList, ...uploadFileList.map((item) => {
                let errorMessage = null;
                if (!mergeProps.acceptFileTypes.test((item.name))) {
                    errorMessage = "Filetype not allowed";
                }
                if (mergeProps.maxFileSize < item.size) {
                    errorMessage = "File is too big";
                }

                return {
                    name: item.name,
                    size: item.size,
                    isChecked: false,
                    uid: item.uid,
                    errorMessage: errorMessage
                }
            })]);
            console.log("123", uploadFileList);
            return false;
        },
        showUploadList: false,
        onChange(info) {
            console.log("onChange", info);

        },
    };

    return (
        <>
            <div className="fileupload_wrap" style={props.style}>
                <div id="fileupload">
                    <div id="divFUButtons" className="upload_button_wrap">
                        <div>
                            <button id="btnFUSelectAll" type="button" onClick={handleCheckAll} className="pl-0 btn btn-default rms-btn-size" style={{ "fontSize": "14px" }}>
                                <i className="fa-regular fa-circle-check" style={{ "fontSize": "14px" }}></i> Select All</button>
                        </div>
                        <div className="text-right">
                            <button id="btnFUStart" type="button" className="btn rms-btn-default rms-btn-size" style={{ "visibility": "hidden" }}>
                                <i className="fa-solid fa-arrow-up-from-bracket"></i>Start Upload
                            </button>
                            <Upload {...uploadProps} ref={uploadRef}>
                                <span id="btnFUAdd" className="btn rms-btn-default rms-btn-size">
                                    <i className="fa-solid fa-plus"></i>
                                    <span>Add File</span>
                                </span>
                            </Upload>
                            &nbsp;
                            <button id="btnFUCancel" type="button" className="btn rms-btn-type-e rms-btn-size" onClick={handleCancelUploadChecked}>
                                <i className="fa-solid fa-ban"></i> Cancel Upload
                            </button>
                            &nbsp;
                            <button id="btnFUDelete" type="button" className="btn rms-btn-type-e rms-btn-size"><i className="fa-solid fa-xmark"></i> Remove</button>
                        </div>
                    </div>
                    <table id="tblFiles" border={0} cellSpacing={0} cellPadding="0" role="presentation" className="table rms-table-list3 mgB0">
                        <tbody className="files">
                            {fileList.map((fileItem, index) => {
                                return (
                                    < tr key={index}>
                                        <td width="30" className="text-center">
                                            <input type="checkbox" style={{ "cursor": "pointer" }} className="checkbox-inline" checked={fileItem.isChecked} onChange={() => handleCheck(fileItem)} />
                                        </td>
                                        <td width="210">
                                            {fileItem.name}
                                        </td>
                                        <td width="120">{byteToSuffix(fileItem.size)}</td>
                                        {!fileItem.errorMessage ?
                                            <td>
                                                <div className="progress">
                                                    <div className="progress-bar" role="progressbar" aria-valuenow={0} aria-valuemin={0} aria-valuemax={100} style={{ "width": "0%" }}>
                                                        <span>0%</span>
                                                    </div>
                                                </div>
                                            </td>
                                            : <td id="tdText"><span className="label label-important">Error</span>&nbsp;{fileItem.errorMessage}</td>
                                        }
                                        <td width={130} className="text-right" >
                                            <div className="btn-group btn-img-inline">
                                                <button name="btnStart" className="btn btn-default rms-btn-icon" disabled={false} type="button" style={{ "visibility": "hidden" }}>
                                                    <i className="fa-solid fa-file-arrow-up font-size-16"></i>
                                                </button>
                                                <button className="btn btn-default rms-btn-icon" type="button">
                                                    <i className="rms-icon rms-icon-pause-c"></i>
                                                </button>
                                                <button name="btnDelete" className="btn btn-default rms-btn-icon" type="button" onClick={() => handleCancelUploadOne(fileItem)}>
                                                    <i className="fa-solid fa-circle-xmark font-size-16"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody >
                    </table>
                    <div id="divFUGlobalProgress" className="mgT10" style={{ "border": "1px dashed #ccc", "borderRadius": "4px", "background": "#f6f6f6; padding:8px;" }}>
                        <table width="100%" border={0}>
                            <tbody><tr>
                                <td>
                                    <div className="progress" style={{ "background": "#FFF;" }}>
                                        <div className="progress-bar" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} style={{ "width": "0%" }}>
                                            <span className="txtWhite">0%</span>
                                        </div>
                                    </div>
                                </td>
                                <td id="tdProgressExtended" width="50%" className="text-right progress-info"><span>0KB/s</span> &nbsp; &nbsp;<span>00:00:00</span> &nbsp;&nbsp; <span className="progress-txtGreen">0KB</span>  <span id="spnFUTotalSize">{byteToSuffix(totalFileSize)}</span></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        </>
    );
};

export default React.memo(BoardFileUpload) as typeof BoardFileUpload;
