import { Form, Input, Button, Checkbox } from "antd";
import { BiDonateBlood } from "react-icons/bi";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verifyNewUser } from "../redux/authSlice";

const Verify = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    console.log("Success:", values);
    dispatch(verifyNewUser(values));
    history.push("/login");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="User ID"
            name="userid"
            rules={[
              {
                required: true,
                message: "Please input your userid!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Token"
            name="token"
            rules={[
              {
                required: true,
                message: "Please input your token!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Verify;
