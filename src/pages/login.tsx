import { getDefaultLayout, IDefaultLayoutPage } from "@/components/layout/default-layout";
import { Button, Checkbox, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { GetStaticPropsContext } from 'next';
import { signIn, SignInResponse } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

interface ILoginFormValue {
  username?: string;
  password?: string;
  remember?: string;
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default
    }
  };
}
const LoginPage: IDefaultLayoutPage = () => {
  const router = useRouter();
  const [form] = useForm<ILoginFormValue>();
  const handleFinish = useCallback(async (values: ILoginFormValue) => {
    try {
      const result = await signIn("login-credentials", {
        username: values.username
        , password: values.password
        , redirect: false
      }) as SignInResponse;
      if (result.ok) {
        console.log("ok");
        router.push("/");
      } else {
        console.log("fail", result);
        form.resetFields();
      }
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className="master_height">
        <div className="main_con_body">
          <div className="contents_body">
            <div className="login_visual_wrap">
              <div className="login_visual_colorbg"></div>
              <div className="login_visual_shape">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1440 120">
                  <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
                </svg>
              </div>
              <canvas className="particles-js-canvas-el" width="1851" height="380" style={{ "width": "100%", "height": "100%" }}></canvas>
            </div>
            <div className="login_wrap">
              <div className="form_box">
                <h1>환영합니다!</h1>
                <h2>Centero에 로그인 하세요.</h2>
                <div>
                  <Form<ILoginFormValue>
                    form={form}
                    onFinish={handleFinish}
                    autoComplete="off"
                    initialValues={{ remember: true }}
                  >
                    <div className="form-group">
                      <label htmlFor="username">ID</label>
                      <Form.Item<ILoginFormValue> name="username" id="username" rules={[{ required: true, message: "아이디를 입력해주세요" }]}>
                        <Input className="form-control" />
                      </Form.Item>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">패스워드</label>
                      <Form.Item<ILoginFormValue> id="password" name="password" rules={[{ required: true, message: "비밀번호를 입력해주세요" }]}>
                        <Input.Password className="form-control" autoComplete="false" placeholder="패스워드를 입력해 주세요." />
                      </Form.Item>
                    </div>
                    <div className="form-group">
                      <Form.Item<ILoginFormValue> name="remember" valuePropName="checked" >
                        <Checkbox className="form-check-label" >아이디 저장</Checkbox>
                      </Form.Item>
                    </div>
                    <Form.Item >
                      <Button htmlType="submit" className="btn btn_centero_default btn-lg btn-block btn_login"
                      >
                        로그인
                      </Button>
                    </Form.Item>
                  </Form>

                </div>
                <div className="login_find_wrap">
                  <a href="/Account/FindID">아이디를 잊으셨나요?</a>
                  <a href="/Account/FindPassword">비밀번호를 잊으셨나요?</a>
                </div>
                <div className="signup_txt">
                  <span>계정이 없으신가요?</span>
                  <a href="/Account/AccountAgreement">회원가입</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

LoginPage.getLayout = getDefaultLayout;

export default LoginPage;
