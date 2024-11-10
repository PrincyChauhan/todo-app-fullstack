import { message, Typography } from "antd";
import { Form, Input, Button } from "antd";
import { Row, Col, Image } from "antd";
import "./login.scss";
import * as EmailValidator from "email-validator";
import loginImage from "../../../assets/login.svg";
import axios from "axios";
import { useNavigate } from "react-router";
import { generateTaskPattern, taskPattern } from "../../../Routes";

const { Title } = Typography;
const Login = ({ setUserStep }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const payload = values;
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}user/login`,
        payload
      );
      if (response?.data?.success) {
        message.success(response?.data?.message);
        localStorage.setItem("token", response?.data?.token);
        navigate(taskPattern);
      } else {
        message.error(response?.data?.message);
      }
    } catch (error) {
      message.error(error?.response?.data?.message || "Something went wrong");
    }
  };
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
                handleSubmit(values);
              }}
            >
              <Form.Item
                name="email"
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
                <span onClick={() => setUserStep(2)}>SignUp</span>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Login;
