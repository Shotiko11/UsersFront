import { Modal, Form } from "antd";
import { UserForm } from "./UserForm";
import { useStore } from "./store";
import React from "react";
import { Data } from "./store";
import { v4 as uuidv4 } from "uuid";

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
    onClose();
  };
  return (
    <Modal title="Add new user" open={visible} onCancel={onClose} footer={null}>
      <UserForm handleSubmit={handleSubmit} buttonTitle={"Add user"} />
    </Modal>
  );
};
