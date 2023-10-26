import { Button, Form, FormProps, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useTranslations } from 'next-intl';
import React from "react";
import QuillEditor from "../../form/control/quill-editor";
import DefaultForm from "../../form/ui/default-form";
import BoardFileupload from "./board-fileupload";

type TBoardFormHiddenValue = {
  name: string,
  value: string
}
interface IBoardFormProps<T> extends FormProps<T> {
  onCancel: () => void,
  onFinish: () => void,
  hiddenValues?: TBoardFormHiddenValue[]
}

const BoardForm = <T extends object>(props: IBoardFormProps<T>) => {
  const { onCancel, onFinish, hiddenValues, ...formProps } = props;
  const t = useTranslations('Common');
  const [form] = useForm();

  const handleFinish = async (formValue: T) => {
    console.log(formValue)

    onFinish()


  }

  const handleCancel = () => {

    onCancel();
  }

  return (
    <>
      <DefaultForm<T> {...formProps} form={form} onFinish={handleFinish} >
        <section className="con_box no_border">
          <div className="con_header no_border">
            <div>&nbsp;</div>
            <div>
              <Button className="btn btn_centero_grey" onClick={handleCancel}>
                {t('CMM_T_0035.value')}
              </Button>&nbsp;
              <Button htmlType="submit" className="btn btn_centero_default" >
                {t('CMM_T_0031.value')}
              </Button>
            </div>
          </div>

          <div className="board_col_wrap">
            {hiddenValues?.map((hidden) => {
              return (
                <>
                  <Form.Item name={hidden.name} initialValue={hidden.value}>
                    <Input type="hidden" />
                  </Form.Item>
                </>
              )
            })
            }
            <table>
              <colgroup>
                <col width="200px" />
                <col width="auto" />
              </colgroup>
              <tr>
                <th>{t('CMM_T_0002.value')}</th>
                <td>
                  <Form.Item name="brdTitle" rules={[{ required: true, max: 200 }]}>
                    <Input className="form-control" placeholder="제목을 입력하세요." />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <th>{t('CMM_T_0003.value')}</th>
                <td>ss</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <Form.Item name="description" >
                    <QuillEditor />
                  </Form.Item>
                  {/* <textarea className="form-control" cols={20} id="txtContents" name="BoardEntity.BRD_Contents"  rows={15}></textarea> */}
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
              <Button className="btn btn_centero_grey" onClick={onCancel}>
                {t('CMM_T_0035.value')}
              </Button>&nbsp;
              <Button htmlType="submit" className="btn btn_centero_default" >
                {t('CMM_T_0031.value')}
              </Button>
            </div>
          </div>
        </ section>
      </DefaultForm>
    </>
  );
};

export default React.memo(BoardForm) as typeof BoardForm;
