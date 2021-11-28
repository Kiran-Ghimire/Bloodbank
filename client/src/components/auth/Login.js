import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { BiDonateBlood } from "react-icons/bi";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginNewUser } from "../redux/authSlice";
import { useSelector } from "react-redux";

const Login = () => {
  const userData = useSelector((state) => state.authUser.userData);
  const history = useHistory();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    dispatch(loginNewUser(values));
    if (userData?.length > 0) {
      console.log("datatatatatattatatta");
      history.push("/");
    } else {
      console.log("Error ayo");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        gap: "40px",
      }}
    >
      <div>
        <BiDonateBlood size={120} color="red" />
        <h1>Blood Bank</h1>
      </div>

      <div style={{ height: "50%", width: "25%" }}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Link to="/forgetpassword" className="login-form-forgot">
              Forgot password
            </Link>
          </Form.Item>

          <Form.Item style={{ textAlign: "center" }}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
        <div>
          Or <Link to="/signup">register now!</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
