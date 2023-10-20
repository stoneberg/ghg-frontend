import { IBoard } from "@/client/board";
import { useTranslations } from 'next-intl';
import React, { PropsWithChildren } from "react";
import BoardComment from "./board-comment";

export interface IBoardDetailProps {
  data: IBoard;
  onDelete: () => void, 
  onUpdate: () => void, 
  onBack: () => void
}

const BoardDetail = ({ ...props }: PropsWithChildren<IBoardDetailProps>) => {
  const t = useTranslations('Common');

  return (
    <>
       <section className="con_box no_border">
        <header className="con_header no_border">
          <div>&nbsp;</div>
          <div>
                <button className="btn btn_centero_grey" type="button"    onClick={() => props.onDelete() }>{t('CMM_T_0030.value')}</button>
                <button className="btn btn_centero_default" type="button" onClick={() => props.onUpdate() }>{t('CMM_T_0035.value')}</button>
                <button className="btn btn_centero_default" type="button" onClick={() => props.onBack() }>{t('CMM_T_0024.value')}</button>
          </div>
        </header>
        <div className="board_detail_wrap">
          { props.data.attachFileCnt && props.data.attachFileCnt > 0 ? (
            <>
              <header className="board_header">
                  <div className="board_title ellipsis" title="CENTERO Notice (CenteroAdmin)" style={{"width":"860px"}}>CENTERO Notice (CenteroAdmin)</div>
                  <div className="board_info">
                      <span>CenteroAdmin</span>
                      <span>2023-05-11 13:08:35</span>
                  </div>
              </header>
              <div className="board_body">
                  Notice 정보입니다.
              </div>
              <div className="file_wrap">
                <div className="file_label">Attachment Files </div>
                <div className="file_list_wrap">
                    <ul className="file_list">
                      <li><a href="/Files/Find/2023|05/01.프로젝트 계획서 초안/8a0dad79-9b02-4ec8-b416-4088cefc28a4/doc" title="01.프로젝트 계획서 초안.doc" download="01.프로젝트 계획서 초안.doc"><i class="fa-solid fa-file-arrow-down"></i> 01.프로젝트 계획서 초안.doc</a></li>
                    </ul>
                </div>
              </div> 
            </>
          ) : (
            <>
              <header className="board_header">
                <div className="board_title">No Data</div>
                <div className="board_info">
                    <span>No Data</span>
                    <span>No Data</span>
                </div>
              </header>
              <div className="board_body">
                  No Data
              </div>
              <div className="file_wrap">
                <div className="file_label">Attachment Files </div>
                <div className="file_list_wrap">No Data</div>
              </div> 
            </>
          )}
          </div>
        </ section>
        <BoardComment boardDetail={props.data}/>
    </>
  );
};

export default React.memo(BoardDetail) as typeof BoardDetail;
