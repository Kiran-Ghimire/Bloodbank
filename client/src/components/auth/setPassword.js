import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { BiDonateBlood } from "react-icons/bi";
import { Link } from "react-router-dom";

const SetPassword = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
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
          width: "25%",
          display: "flex",
          height: "40%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
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
            name="id"
            rules={[
              {
                required: true,
                message: "Please input your User Id!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="id"
            />
          </Form.Item>
          <Form.Item
            name="token"
            rules={[
              {
                required: true,
                message: "Please input your token!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="token"
            />
          </Form.Item>{" "}
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Password"
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
            <Link to="/login">Back to Login</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SetPassword;
