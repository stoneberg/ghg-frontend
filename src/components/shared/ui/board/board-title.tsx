import { IBoardTitleProps } from "@/types/board";
import { Button, Form } from 'antd';
import { useTranslations } from 'next-intl';
import React, { PropsWithChildren } from "react";
import "./board-title.module.css";

const BoardTitle = ({ onSearch }: PropsWithChildren<IBoardTitleProps>) => {
  const t = useTranslations('Common');
  const [form] = Form.useForm();

  return  (
    <>
     <div className="con_header no_border board-title" >
       <div className="board_search_wrap">
        <div className="form-row align-items-center">
          <Form form={form} name="advanced_search" onFinish={onSearch}>
            <div className="col-auto">
              <div className="form-group">
                 <Form.Item name="Search_Type">
                    <select className="form-control" >
                      <option value="ALL">All</option>
                      <option value="1">{t('CMM_T_0002.value')}</option>
                      <option value="2">{t('MTD_T_0006.value')}</option>
                      <option value="3">{t('CMM_T_0003.value')}</option>
                    </select>
                </Form.Item>
              </div>
            </div>
            <div className="col-auto">
              <div className="form-group">
                 <Form.Item name="Search_Text">
                    <input className="form-control" id="txtSearchText" placeholder={t('CMM_M_0012.value')} type="text" value="" />
                 </Form.Item>
              </div>
            </div>
            <div className="col-auto">
              <Button className="btn btn_centero_outline_aqua" htmlType="submit" >
                {t('CMM_T_0025.value')}
              </Button>
            </div>
          </Form>
        </div>
        </div>
          <div>
            <button className="btn btn_centero_default" type="button" onClick={() => console.log("") }>{t('CMM_T_0003.value')}</button>
          </div>
      </div>
    </>
  );
};

export default React.memo(BoardTitle) as typeof BoardTitle;
