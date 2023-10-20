import { IBoard } from "@/client/board/board";
import { Form } from 'antd';
import TextArea from "antd/lib/input/TextArea";
import { useTranslations } from 'next-intl';
import { useRouter } from "next/router";
import React, { PropsWithChildren, useCallback } from "react";

interface IBoardCommentProps {
  boardDetail: IBoard
}

const BoardComment = ({ ...props }: PropsWithChildren<IBoardCommentProps>) => {
  const t = useTranslations('Common');
  const [form] = Form.useForm();
  const router = useRouter();

  const handleFinish = useCallback(
    (formValue: IBoard) => {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, ...formValue },
      });
    },
    [router]
  );

  return (
    <>
       <section className="con_box board_comment">
          <header>
              <h1>Comment <span className="badge comment_num" id="totalCommentCnt">0</span></h1>
          </header>
          <div className="comment_write_wrap">
              <div className="form-group">
                  <Form form={form} name="advanced_search">
                     <Form.Item name="Search_Type">
                        <TextArea className="border-0 form-control" id="txtComment" rows={5} placeholder="Please fill out contents." />
                     </Form.Item>
                  </Form>
              </div>
              <div className="comment_button">
                  <a className="link link_grey" onClick={() => console.log("")}>{t('CMM_T_0035.value')} </a>
                  <a className="link link_aqua" onClick={() => console.log("")}>{t('CMM_T_0038.value')} </a>
              </div>
          </div>
          <ul id="commentList" className="comment_list_wrap">
            <li id="LiCmtArea23">
              <div className="comment" id="DivCmtArea23">
                <header>
                  <div className="comment_info">
                    <span className="comment_writer">유니온_관리자</span>
                    <span className="comment_date">2023-10-18 18:09:31</span>
                  </div>                              
                  <div className="comment_button">
                    <a className="link link_grey" id="DeleteBtn23" onClick={() => console.log("")}>Delete</a>
                    <a className="link link_aqua" id="UpdateBtn23"onClick={() => console.log("")}>Modify</a>
                    <a className="link link_aqua" id="ReplyBtn23" onClick={() => console.log("")}>Reply</a>
                  </div>
                </header>
                <div className="comment_txt">
                      <div className="board_Pre_line" id="DivContents23">dfdf</div>
                </div>
              </div>
              </li> 
            </ul>
        </section>
    </>
  );
};

export default React.memo(BoardComment) as typeof BoardComment;
