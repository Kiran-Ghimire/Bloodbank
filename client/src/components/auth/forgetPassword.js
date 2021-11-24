import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { BiDonateBlood } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../redux/authSlice";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    dispatch(forgetPassword(values));
    history.push("/setpassword");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "20%",
          display: "flex",
          height: "30%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          borderRadius: "10px",
          padding: "10px",
          boxShadow: "10px 10px 6px #ededed",
        }}
      >
        <div>ICON</div>
        <Form
          name="forget-password"
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
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email Address"
            />
          </Form.Item>

          <Form.Item style={{ textAlign: "center", borderRadius: "5px" }}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Reset Password
            </Button>
          </Form.Item>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {/* <Link to="/setpassword">Token Received</Link> */}
            <Link to="/login">Back to Login</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPassword;
