import { Form, Input, Select, Button } from "antd";
import React from "react";
import { useEffect } from "react";

interface UserFormProps {
  buttonTitle: string;
  handleSubmit: (values: FormValues) => void;
  userData: FormValues;
}

interface FormValues {
  id: string;
  name: string;
  email: string;
  gender: string;
  phone: string;
  address: {
    street: string;
    city: string;
    number: string;
  };
}

const validatePhone = (rule: any, value: string, callback: any) => {
  const phoneNumberPattern = /^\+1 \(\d{3}\) \d{3}-\d{4}$/;
  if (!value.match(phoneNumberPattern)) {
    callback("Please enter a valid phone number in the format +1 (xxx) xxx-xxxx");
  } else {
    callback();
  }
};

export const UserForm: React.FC<UserFormProps> = ({
  buttonTitle,
  handleSubmit,
  userData,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    userData?.id && form.setFieldsValue({ ...userData });
  }, [userData]);

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please enter a name" }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please enter an email" },
          { type: "email", message: "Please enter a valid email" },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Gender"
        name="gender"
        rules={[{ required: true, message: "Please select a gender" }]}>
        <Select>
          <Select.Option value="male">Male</Select.Option>
          <Select.Option value="female">Female</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: "Please enter an address" }]}>
        <Input.Group>
          <Form.Item
            name={["address", "street"]}
            noStyle
            rules={[{ required: true, message: "Please enter a street" }]}>
            <Input placeholder="Street" />
          </Form.Item>
          <Form.Item
            name={["address", "city"]}
            noStyle
            rules={[{ required: true, message: "Please enter a city" }]}>
            <Input placeholder="City" />
          </Form.Item>
        </Input.Group>
      </Form.Item>
      <Form.Item
  label="Phone Number"
  name="phone"
  rules={[
    {
      required: true,
      message: "Please enter a phone number",
    },
    {
      validator: validatePhone,
    },
  ]}
>
  <Input />
</Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {buttonTitle}
        </Button>
      </Form.Item>
    </Form>
  );
};
