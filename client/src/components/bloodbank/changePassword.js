import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { BiDonateBlood } from "react-icons/bi";
import { Link, useHistory } from "react-router-dom";
import { changePassword } from "../redux/authSlice";

import { useSelector, useDispatch } from "react-redux";

const Changepassword = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authUser.userData[0]);
  console.log("changePassword", userData);
  const { userid, password } = userData;
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    dispatch(
      changePassword({ id: userid, newpassword: password, values: values })
    );
    history.push("/profile");
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
            userid,
            password,
          }}
          onFinish={onFinish}
        >
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
          <Form.Item
            name="newpassword"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="New Password"
            />
          </Form.Item>
          <Form.Item style={{ textAlign: "center", borderRadius: "5px" }}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Changepassword;
