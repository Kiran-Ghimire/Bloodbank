import { useSelector, useDispatch } from "react-redux";
import {
  Form,
  Input,
  InputNumber,
  Cascader,
  Select,
  DatePicker,
  Row,
  Col,
  Checkbox,
  Button,
  notification,
  AutoComplete,
} from "antd";
import { BiDonateBlood } from "react-icons/bi";
import { Link, useHistory } from "react-router-dom";
import { editProfile } from "../redux/authSlice";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 10,
    },
    //   sm: {
    //     span: 8,
    //   },
  },
  wrapperCol: {
    //   xs: {
    //     span: 24,
    //   },
    //   sm: {
    //     span: 16,
    //   },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const EditProfile = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const userData = useSelector((state) => state.authUser.userData[0]);

  console.log("editProfile", userData);
  const { userid, username, email, dob, gender, address, bloodtype, phone } =
    userData;
  const history = useHistory();
  const onFinish = (values) => {
    console.log("values", values);
    dispatch(editProfile({ id: userid, values: values }));

    history.push("/profile");
    // window.location.reload();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <BiDonateBlood size={120} color="red" />
        <h1>Blood Bank</h1>
        <h2>Edit Profile</h2>
      </div>

      <div style={{ height: "50%", width: "50%" }}>
        <Form
          initialValues={{
            username,
            email,
            // dob,
            gender,
            address,
            bloodtype,
            phone,
          }}
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: "Please input your Username",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item> */}

          {/* <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item> */}

          {/* <Form.Item
            name="newpassword"
            label="New Password"
            // rules={[
            //   {
            //     required: true,
            //     message: "Please input your new password!",
            //   },
            // ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item> */}

          <Form.Item
            name="bloodtype"
            label="Bloodtype"
            tooltip="What is your bloodgroup?"
            rules={[
              {
                required: true,
                message: "Please input your bloodtype!",
                whitespace: true,
              },
            ]}
          >
            <Select placeholder="select your bloodtype">
              <Option value="A+">A+</Option>
              <Option value="A-">A-</Option>
              <Option value="B+">B+</Option>
              <Option value="B-">B-</Option>
              <Option value="AB+">AB+</Option>
              <Option value="AB-">AB-</Option>
              <Option value="O+">O+</Option>
              <Option value="O-">O-</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="dob"
            label="DOB"
            rules={[
              {
                required: true,
                message: "Please input your date of birth!",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input
              //   addonBefore={prefixSelector}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[
              {
                required: true,
                message: "Please input your address!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
                message: "Please select gender!",
              },
            ]}
          >
            <Select placeholder="select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          {/* <Form.Item
            name="role"
            label="Role"
            rules={[
              {
                required: true,
                message: "Please select a Role!",
              },
            ]}
          >
            <Select placeholder="select your Role">
              <Option value="User">User</Option>
              <Option value="Donor">Donor</Option>
            </Select>
          </Form.Item> */}

          {/* <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item> */}
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Edit Profile
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditProfile;
