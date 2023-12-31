import { Form, FormProps } from "antd";
import React, { PropsWithChildren, useCallback, useEffect, useRef } from "react";
import style from "./form.module.css";

interface IDefaultFormProps extends FormProps { }

const DefaultForm = <T,>({ children, ...formProps }: PropsWithChildren<IDefaultFormProps>) => {
  const formRef = useRef();

  const handleFormFailed = useCallback(
    ({ errorFields }: any) => {
      formProps.form?.scrollToField(errorFields[0].name);
    },
    [formProps.form]
  );

  useEffect(() => {

  })

  return (
    <Form<T>
      className={style["default-form"]}
      layout="vertical"
      requiredMark={false}
      onFinishFailed={handleFormFailed}
      {...formProps}
    >
      {children}
    </Form>
  );
};

export default React.memo(DefaultForm) as typeof DefaultForm;
