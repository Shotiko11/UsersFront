import { Modal, Form, Input, Select, Button } from "antd";
import { useStore } from "./store";
import React from "react";
import { Data } from "./store";
import { v4 as uuidv4 } from 'uuid';


interface AddUserProps {
  visible: boolean;
  onClose: () => void;
}

interface FormValues {
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

export const AddUser: React.FC<AddUserProps> = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const addData = useStore((state) => state.addData);

  const handleSubmit = (values: FormValues) => {
    const data: Data = {
      id: uuidv4(),
      name: values.name,
      email: values.email,
      gender: values.gender,
      address: {
        street: values.address.street,
        city: values.address.city, 
        number: values.address.number,
      },
      phone: values.phone,
    };
    addData(data);
    form.resetFields();
    onClose();
  };
  return (
    <Modal
      title="Add new user"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter a name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[            { required: true, message: 'Please enter an email' },            { type: 'email', message: 'Please enter a valid email' },          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: 'Please select a gender' }]}
        >
          <Select>
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[            { required: true, message: 'Please enter a phone number' },            {              pattern: /^\d{10}$/,              message: 'Please enter a 10-digit phone number',            },          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please enter an address' }]}
        >
          <Input.Group>
            <Form.Item
              name={['address', 'street']}
              noStyle
              rules={[{ required: true, message: 'Please enter a street' }]}
            >
              <Input placeholder="Street" />
            </Form.Item>
            <Form.Item
              name={['address', 'number']}
              noStyle
              rules={[{ required: true, message: 'Please enter a number' }]}
            >
              <Input placeholder="Number" />
            </Form.Item>
            <Form.Item
              name={['address', 'city']}
              noStyle
              rules={[{ required: true, message: 'Please enter a city' }]}
            >
              <Input placeholder="City" />
            </Form.Item>
         
            </Input.Group>
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit">
        Add User
      </Button>
    </Form.Item>
  </Form>
</Modal>

);
};
