import { Form, Input, Button, Select } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchDonor } from "../redux/authSlice";
import DonorDetailCard from "./donorDetailCard";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const SearchDonor = () => {
  const dispatch = useDispatch();
  const donors = useSelector((state) => state.authUser.donors);
  const [form] = Form.useForm();
  const donorRequest = useSelector((state) => state.authUser.donorRequest);
  const { userid } = donorRequest;
  const onFinish = (values) => {
    console.log(values);
    dispatch(searchDonor(values));
  };

  return (
    <>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="address"
          label="Address"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="bloodtype"
          label="BloodType"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select a Bloodtype"
            //   onChange={onGenderChange}
            allowClear
          >
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

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Form>
      {donors ? <DonorDetailCard donors={donors} /> : null}
    </>
  );
};

export default SearchDonor;
