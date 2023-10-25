import { IBoard } from '@/client/board';
import { IComment } from '@/client/comment';
import { Form, FormInstance } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useRouter } from "next/router";
import React, { PropsWithChildren, useCallback, useEffect, useRef } from "react";

interface ICommentReplyFormProps {
  replyOrModify: 'reply' | 'modify',
  comment: Partial<IComment>,
  onCancel: (comment: Partial<IComment>) => void
}

const CommentReplyForm = ({ ...props }: PropsWithChildren<ICommentReplyFormProps>) => {
  const { comment, onCancel, replyOrModify } = props;
  // const t = useTranslations('Common');
  const [form] = Form.useForm();
  const router = useRouter();
  const formRef = useRef<FormInstance>(null);

  const handleFinish = useCallback(
    (formValue: IBoard) => {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, ...formValue },
      });
    },
    [router]
  );

  useEffect(() => {
    console.log("dsksksksksskk");
  }, [])

  const handleCancelForm = () => {
    onCancel(comment);
  }

  const handleSaveComment = () => {

  }

  return (
    <>
      <div className={`comment ${replyOrModify == 'modify' ? "reply_write" : "comment_modify"} `} id={`Reply${comment.cmtSeq}`}>
        <header>
          <div className="comment_info">
            <span className="comment_writer">session user</span>
            {replyOrModify == 'modify' ?
              <span className="comment_date">{comment.createDt}</span>
              : null
            }
          </div>
        </header>
        <div className="comment_txt">
          <div className="form-group">
            <Form form={form} name="commentReplyForm"
              ref={formRef}
              onFinish={handleFinish}
            >
              {/* <textarea className="text-left border-0 form-control" rows={5} id={`txtReply${cmtSeq}`} placeholder={t('CMM_M_0007.value')}></textarea> */}
              <Form.Item name="txtComment" rules={[{ required: true }]} initialValue={replyOrModify == 'modify' ? comment.cmtContents : ""}>
                <TextArea className="text-left border-0 form-control" rows={5} placeholder={"12lk3j12lk3j"}
                />
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="comment_button">
          {/* <a className="link link_grey" onClick={() => handleCancelReply()}>{t('CMM_T_0035.value')}</a>
          <a className="link link_aqua" onClick={() => handleSaveComment()}>{t('CMM_T_0038.value')}</a> */}
          <a className="link link_grey" style={{ "cursor": "pointer" }} onClick={() => handleCancelForm()}>취소</a>
          <a className="link link_aqua" style={{ "cursor": "pointer" }} onClick={() => handleSaveComment()}>저장</a>
        </div>
      </div>
    </>
  );
};

export default React.memo(CommentReplyForm) as typeof CommentReplyForm;
