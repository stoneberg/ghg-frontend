import { IBoard } from '@/client/board';
import { IComment } from '@/client/comment';
import { Form, FormInstance } from 'antd';
import TextArea from "antd/lib/input/TextArea";
import { getCommentList } from 'dummy/comment';
import { useTranslations } from 'next-intl';
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import CommentReplyForm from './comment-reply-form';

interface ICommentProps {
  boardDetail: IBoard
  sessionStatus?: "authenticated" | "loading" | "unauthenticated"
  comments?: Partial<IComment>[],
  commentOption?: Partial<IComment>
}

const Comment = ({ ...props }: ICommentProps) => {
  const { boardDetail, sessionStatus = 'unauthenticated', comments, commentOption } = props;
  const t = useTranslations('Common');
  const [form] = Form.useForm();
  const router = useRouter();
  const formRef = useRef<FormInstance>(null);
  const [commentList, setCommentList] = useState<Partial<IComment>[]>(comments);
  // TODO: 세션처리 필요함.
  // const { data: session, status } = useSession();

  const handleFinish = useCallback(
    (formValue: IBoard) => {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, ...formValue },
      });
    },
    [router]
  );

  const handleCancelComment = useCallback(() => {
    formRef.current?.setFieldsValue({ txtComment: '' });
  }, [formRef]);

  const handleNextData = () => {
    console.log("handleNextData");
    const _commentList = getCommentList(
      commentOption,
      50,
      commentList[commentList.length - 1].cmtSeq + 1
    )
    setCommentList(_commentList);
  }

  const handleDeleteComment = (cmtSeq: number) => {
    //document.querySelector(`#DivContents${cmtSeq}`).textContent = "2222";

  }

  const handleUpdateComment = (comment: IComment) => {
    comment.modifyYn = 'Y'
    setCommentList(commentList.map(t => {
      if (t.cmtSeq === comment.cmtSeq) {
        return comment;
      } else {
        return t;
      }
    }));
  }

  const handleReplycomment = (comment: IComment) => {
    comment.replyWriteYn = 'Y'
    setCommentList(commentList.map(t => {
      if (t.cmtSeq === comment.cmtSeq) {
        return comment;
      } else {
        return t;
      }
    }));
  }

  const handleReplyCancelComment = (comment) => {
    comment.replyWriteYn = 'N'
    comment.modifyYn = 'N'
    setCommentList(commentList.map(t => {
      if (t.cmtSeq === comment.cmtSeq) {
        return comment;
      } else {
        return t;
      }
    }));
  }

  useEffect(() => {
    if (!comments) {
      setCommentList(getCommentList(commentOption, boardDetail.commentCnt));
    }
  }, [])

  return (
    <>
      <section className="con_box board_comment">
        <header>
          <h1>Comment <span className="badge comment_num">{boardDetail.commentCnt}</span></h1>
        </header>
        {sessionStatus === 'authenticated' ?
          <div className="comment_write_wrap">
            <div className="form-group">
              <Form form={form} name="commentForm"
                ref={formRef}
                onFinish={handleFinish}
              >
                <Form.Item name="txtComment" rules={[{ required: true }]}>
                  <TextArea className="border-0 form-control" rows={5} placeholder={t('CMM_M_0044.value')} />
                </Form.Item>
              </Form>
            </div>
            <div className="comment_button">
              <a className="link link_grey" style={{ "cursor": "pointer" }} onClick={() => handleCancelComment()}>{t('CMM_T_0035.value')} </a>
              <a className="link link_aqua" style={{ "cursor": "pointer" }} onClick={() => handleNextData()}>{t('CMM_T_0038.value')} </a>
            </div>
          </div>
          : null}
        <ul id="commentList" className="comment_list_wrap">
          {
            boardDetail.commentCnt == 0 ? (
              <li>
                <div className="comment" style={{ "textAlign": "center" }}>
                  {t('CMM_M_0044.value')}
                </div>
              </li>
            ) : null
          }
          {commentList && commentList.map((comment, index) => {
            return (
              < li id={`LiCmtArea${comment.cmtSeq}`} key={comment.cmtSeq} >
                {comment.modifyYn != 'Y' ?
                  <div className={"comment ".concat(comment.cmtParentSeq == 0 ? "" : "reply")} id={`DivCmtArea${comment.cmtSeq}`}>
                    <header>
                      <div className="comment_info">
                        <span className="comment_writer">{comment.createNm}</span>
                        <span className="comment_date">{comment.createDt}</span>
                      </div>

                      <div className="comment_button">
                        {comment.deletedYn == 'N' && comment.replyWriteYn != 'Y' ?
                          (
                            <>
                              <a className="link link_grey" style={{ "cursor": "pointer" }} onClick={() => handleDeleteComment(comment.cmtSeq)}>{t('CMM_T_0030.value')}</a>
                              <a className="link link_aqua" style={{ "cursor": "pointer" }} onClick={() => handleUpdateComment(comment)}>{t('CMM_T_0029.value')}</a>
                              <a className="link link_aqua" style={{ "cursor": "pointer" }} onClick={() => handleReplycomment(comment)}>{t('CMM_T_0027.value')}</a>
                            </>
                          ) : null
                        }
                      </div>

                    </header>
                    {comment.LVL < 2 ?
                      (
                        <div className="comment_txt">
                          <div className="board_Pre_line" id={`DivContents${comment.cmtSeq}`}>{comment.cmtContents.replace("<", "&lt;").replace(">", "&gt;")}</div>
                        </div>
                      ) : (
                        <div className="comment_txt" >
                          <span className="to_reply">{comment.replyNm}</span>  &nbsp;
                          <span >{comment.cmtContents.replace("<", "&lt;").replace(">", "&gt;")}
                          </span>
                        </div>
                      )
                    }
                  </div>
                  : (
                    <><CommentReplyForm comment={comment}
                      onCancel={() => handleReplyCancelComment(comment)}
                      replyOrModify='modify'
                    /></>
                  )
                }
                {
                  comment.replyWriteYn == 'Y' ? (
                    <><CommentReplyForm comment={comment}
                      onCancel={() => handleReplyCancelComment(comment)}
                      replyOrModify='reply'
                    /></>
                  ) : null
                }
              </li>
            )
          })
          }
          {boardDetail.commentCnt >= 50 ?
            <li className="no_border">
              <a className="btn_reply_more" style={{ "textAlign": "center" }} onClick={() => handleNextData()}>
                <i className="fa-solid fa-chevron-down"></i>
                {t('CMM_T_1000.value')}
              </a>
            </li >
            : null}
        </ul>
      </section >
    </>
  );
};

export default React.memo(Comment) as typeof Comment;
