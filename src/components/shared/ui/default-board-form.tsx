import { TableProps } from "antd";
import { useTranslations } from 'next-intl';
import React, { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import BoardFileupload from "./board-fileupload";
interface IDefaultTableProps<T> extends TableProps<T> {
  countLabel?: number;
}
type Inputs = {
  example: string
  exampleRequired: string
}

const DefaultBoardForm = <T extends object>({
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
       <section className="con_box no_border">
          <div className="con_header no_border">
              <div>&nbsp;</div>
              <div>
                  <button className="btn btn_centero_grey" type="button" onClick={() => "BackToList()"}>{t('CMM_T_0035.value')}</button>
                  <button className="btn btn_centero_default" type="button" onClick={() => "fn_SaveFiles()"}>{t('CMM_T_0031.value')}</button>
              </div>
          </div>

          <div className="board_col_wrap">
              <input id="txtGHG_Program" name="GHG_Program" type="hidden" value=""></input>
              <input id="txtBRD_Cateogry" name="BRD_Category" type="hidden" value="CTR_NEWS"></input>
              <input data-val="true" data-val-number="BRD_SEQ 필드는 숫자여야 합니다." data-val-required="BRD_SEQ 필드가 필요합니다." id="txtBRD_SEQ" name="BoardEntity.BRD_SEQ" type="hidden" value=""></input>
              <input data-val="true" data-val-number="ROW_COUNT 필드는 숫자여야 합니다." data-val-required="ROW_COUNT 필드가 필요합니다." id="ROW_COUNT" name="ROW_COUNT" type="hidden" value="0"></input>
              <input id="PAGE_NUMBER" name="PAGE_NUMBER" type="hidden" value="1"></input>
              <table>
                  <colgroup>
                      <col width="200px" />
                      <col width="auto" />
                  </colgroup>
                  <tr>
                      <th>{t('CMM_T_0002.value')}</th>
                      <td>
                        <input className="form-control" id="txtTitle" maxLength={200} name="BoardEntity.BRD_Title" placeholder="제목을 입력하세요." type="text" value="" />
                      </td>
                  </tr>
                  <tr>
                      <th>{t('CMM_T_0003.value')}</th>
                      <td>ss</td>
                  </tr>
                  <tr>
                      <td colSpan={2}>
                          <textarea className="form-control" cols={20} id="txtContents" name="BoardEntity.BRD_Contents" placeholder="내용을 입력하세요." rows={15}></textarea>
                      </td>
                  </tr>
                  <tr>
                      <th>{t('CMM_T_0049.value')}</th>
                      <td>
                          <BoardFileupload /> 
                      </td>
                  </tr>
              </table>
          </div>
        <div className="btm_btn_wrap">
            <div>
                <button className="btn btn_centero_grey" type="button" onClick={() => "BackToList()"}>{t('CMM_T_0035.value')}</button>
                <button className="btn btn_centero_default" type="button" onClick={() => "fn_SaveFiles()"}>{t('CMM_T_0031.value')}</button>
            </div>
        </div>
        </ section>
    </>
  );
};

export default React.memo(DefaultBoardForm) as typeof DefaultBoardForm;
