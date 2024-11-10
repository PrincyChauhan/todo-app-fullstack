import { message, Modal, Typography } from "antd";
import { Form, Input, Button } from "antd";
import { Row, Col, Image } from "antd";
import "./register.scss";
import * as EmailValidator from "email-validator";
import registerImage from "../../../assets/register.svg";
import axios from "axios";

const { Password } = Input;
const { Title } = Typography;

const Register = ({ setUserStep }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      const payload = {
        userName: values.name,
        password: values.password,
        email: values.email,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}user/register`,
        payload
      );
      if (response?.data?.success) {
        message.success(response?.data?.message);
        setUserStep(1);
      } else {
        message.error(response?.data?.message);
      }
    } catch (error) {
      message.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="signupContainer">
      <Row
        className="rowFormClass"
        // style={{ width: "fit-content", margin: "auto" }}
        // gutter={[40, 32]}
      >
        <div className="left">
          <Col span={12} className="formColumn">
            <Title level={2} className="title">
              Registration
            </Title>

            <Form
              autoComplete="off"
              style={{ padding: "15px 0" }}
              form={form}
              layout="vertical"
              onFinish={(values) => {
                // REGISTER API INTEGRATION
                handleSubmit(values);
              }}
            >
              <Form.Item
                name="name"
                label="Name:"
                rules={[
                  {
                    required: true,
                    message: "Name is required",
                  },
                  {
                    pattern: /^[A-Za-z]{3,29}$/,
                    message:
                      "Name must be more than 3 Characters and not <br />Contain any Numeric Values",
                  },
                ]}
                hasFeedback
              >
                <Input type={"text"} placeholder="Enter Your Name" />
              </Form.Item>

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
                <Password placeholder="Enter Password"></Password>
              </Form.Item>

              <Form.Item
                label="Confirm Password:"
                name="confirm password"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "Confirm Password is required",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject("Password Doesn't match");
                    },
                  }),
                ]}
                hasFeedback
              >
                <Password placeholder="Re-Enter Password"></Password>
              </Form.Item>

              <Form.Item
                style={{
                  width: "fit-content",
                  margin: "auto",
                  paddingBottom: "10px",
                }}
              >
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </div>
        <div className="right">
          <Col span={12}>
            <div className="rightCol">
              <Image
                width={500}
                src={registerImage}
                style={{ marginTop: "120px" }}
                preview={false}
              />
              <Row>
                <Col span={24} offset={5} className="colToNavigate">
                  Already have an Account &nbsp;
                  <span onClick={() => setUserStep(1)}> LogIn </span>
                </Col>
              </Row>
            </div>
          </Col>
        </div>
      </Row>
    </div>
  );
};

export default Register;
