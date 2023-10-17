import "@/styles/Common/FileUpload/css/GTFu.Style.css";
import { TableProps } from "antd";
import { useTranslations } from 'next-intl';
import React, { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";

interface IDefaultTableProps<T> extends TableProps<T> {
  countLabel?: number;
}
type Inputs = {
  example: string
  exampleRequired: string
}

const BoardFileUpload = <T extends object>({
  children,
  countLabel,
  ...tableProps
}: PropsWithChildren<IDefaultTableProps<T>>) => {
  const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm<Inputs>()
  const t = useTranslations('Common');

  return (
    <>
        <div className="fileupload_wrap">
            <div id="fileupload">
                <div id="divFUButtons" className="upload_button_wrap">
                    <div>
                        <button id="btnFUSelectAll" type="button" data-checkyn="" className="pl-0 btn btn-default rms-btn-size" style={{"fontSize": "14px"}}>
                        <i className="fa-regular fa-circle-check" style={{"fontSize": "14px"}}></i> Select All</button>
                    </div>
                    <div className="text-right">
                        <button id="btnFUStart" type="button" className="btn rms-btn-default rms-btn-size" style={{"visibility":"hidden"}}>
                            <i className="fa-solid fa-arrow-up-from-bracket"></i> Start Upload</button>
                        <span id="btnFUAdd" className="btn rms-btn-default rms-btn-size">
                            <i className="fa-solid fa-plus"></i>
                            <span>Add File</span>
                            <input style={{"position": "absolute", "top": "0px", "right": "0px", "margin": "0", "opacity": "0", "direction": "ltr", "cursor": "pointer!important", "width": "103px", "height": "24px"}} type="file" id="files" name="files[]" multiple={true} />
                        </span>
                        <button id="btnFUCancel" type="button" className="btn rms-btn-type-e rms-btn-size"><i className="fa-solid fa-ban"></i> Cancel Upload</button>
                        <button id="btnFUDelete" type="button" className="btn rms-btn-type-e rms-btn-size"><i className="fa-solid fa-xmark"></i> Remove</button>
                    </div>
                </div>
                <table id="tblFiles" border={0} cellSpacing={0} cellPadding="0" role="presentation" className="table rms-table-list3 mgB0">
                    <tbody className="files">
                    </tbody>
                </table>
                <div id="divFUGlobalProgress" className="mgT10" style={{"border":"1px dashed #ccc", "borderRadius":"4px", "background":"#f6f6f6; padding:8px;"}}>
                <table width="100%" border={0}>
                    <tbody><tr>
                        <td>
                            <div className="progress" style={{"background":"#FFF;"}}>
                                <div className="progress-bar" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} style={{"width":"0%"}}>
                                    <span className="txtWhite">0%</span>
                                </div>
                            </div>
                        </td>
                        <td id="tdProgressExtended" width="50%" className="text-right progress-info"><span>0KB/s</span> &nbsp; &nbsp;<span>00:00:00</span> &nbsp;&nbsp; <span className="progress-txtGreen">0KB</span>  <span id="spnFUTotalSize">0KB</span></td>
                    </tr>
                </tbody></table>
                </div>
            </div>
        </div>
    </>
  );
};

export default React.memo(BoardFileUpload) as typeof BoardFileUpload;
