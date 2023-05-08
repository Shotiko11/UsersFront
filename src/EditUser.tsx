import { Modal } from "antd";
import { UserForm } from "./UserForm";
import React from "react";

interface FormValues {
  id: number;
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
interface EditUserProps {
  visible: boolean;
  onClose: () => void;
  userData: FormValues;
  onEditUser: () => void;
}

export const EditUser: React.FC<EditUserProps> = ({
  visible,
  onClose,
  userData,
  onEditUser,
}) => {
  const handleSubmit = (values: FormValues) => {
    onEditUser(userData.id, values);
    onClose();
  };  
  return (
    <Modal title="Edit user" open={visible} onCancel={onClose} footer={null}>
      <UserForm
        handleSubmit={handleSubmit}
        buttonTitle={"Save"}
        userData={userData}
      />
    </Modal>
  );
};
