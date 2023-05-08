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
  phone: number;
  address: {
    street: string;
    city: string;
  };
}

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
        rules={[{ required: true, message: "Enter name, it's required" }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Enter email, it's required" },
          { type: "email", message: "Please enter a valid email" },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Gender"
        name="gender"
        rules={[{ required: true, message: "Enter gender, it's required" }]}>
        <Select>
          <Select.Option value="male">Male</Select.Option>
          <Select.Option value="female">Female</Select.Option>
          <Select.Option value="female">Other</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
  label="Phone Number"
  name="phone"
  rules={[
    { required: true, message: "Enter phone number, it's required" },
    {
      pattern: /^\+1\s\(\d{3}\)\s\d{3}-\d{4}$/,
      message: "You should enter valid US phone number, format: +1(space)(XXX)(space)XXX-XXXX",
    },
  ]}>
  <Input placeholder="+1" />
</Form.Item>

      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: "Address is required" }]}>
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
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {buttonTitle}
        </Button>
      </Form.Item>
    </Form>
  );
};
