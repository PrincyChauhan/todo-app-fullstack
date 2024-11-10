import { Typography } from "antd";
import { Form, Input, Button } from "antd";
import { Row, Col, Image } from "antd";
import "./login.scss";
import * as EmailValidator from "email-validator";
import loginImage from "../../../assets/login.svg";

const { Title } = Typography;
const Login = () => {
  const [form] = Form.useForm();
  return (
    <>
      <div className="loginContainer">
        <Row className="rowClass" gutter={[40, 32]}>
          <Col span={12} className="loginformCol">
            <Title level={2} className="loginTitle">
              Login
            </Title>
            <Form
              style={{ padding: "15px 0" }}
              form={form}
              layout="vertical"
              //Triggered When Form Submitted
              onFinish={(values) => {
                // LOGIN API INTEGRATION
              }}
            >
              <Form.Item
                name="Email"
                label="Email Address:"
                rules={[
                  {
                    required: true,
                    message: "Email is required",
                  },
                  {
                    validator: (_, value) =>
                      value && EmailValidator.validate(value)
                        ? Promise.resolve()
                        : Promise.reject("Please Enter Valid Email"),
                  },
                ]}
                hasFeedback
              >
                <Input placeholder="Enter Your Email Id" />
              </Form.Item>

              <Form.Item
                label="Password:"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Password is required",
                  },
                  {
                    min: 6,
                    message: "Atleast 6 Characters Required in Password",
                  },
                  {
                    validator: (_, value) =>
                      value &&
                      /[A-Z]/.test(value) &&
                      /[a-z]/.test(value) &&
                      /[0-9]/.test(value) &&
                      /[@#$%^&]/.test(value)
                        ? Promise.resolve()
                        : Promise.reject(
                            "Note: Must use 1 capital, 1 small, 1 Numeric, 1 symbol"
                          ),
                  },
                ]}
                hasFeedback
              >
                <Input.Password placeholder="Enter Password"></Input.Password>
              </Form.Item>
              <Form.Item className="btn">
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={12}>
            <Image width={500} src={loginImage} preview={false} />
            <Row>
              <Col span={24} offset={10} className="navigateCol">
                Don't have an Account
                <span>SignUp</span>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Login;
