import { ChangeEvent, useEffect, useState } from "react";
import { useStore, Data } from "./store";
import { Table, Input, Button } from "antd";
import { ColumnsType } from "antd/es/table";
import { createDraft, finishDraft } from 'immer';
import * as React from 'react';
import { AddUser } from "./AddUser";


function App() {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [isAddUserModalVisible, setIsAddUserModalVisible] = useState(false);
  const data = useStore((state) => state.data);
  const addData = useStore((state) => state.addData);
  const updateData = useStore((state) => state.updateData);
  const deleteData = useStore((state) => state.deleteData);

  useEffect(() => {
    async function fetchData() {
      await useStore.getState().getData();
    }
    fetchData();
  }, []);


  
  const showAddUserModal = () => {
    setIsAddUserModalVisible(true);
  };

  const handleCancel = () => {
    setIsAddUserModalVisible(false);
  };

  const handleAddUser = async (newData: Data) => {
    await addData(newData);
    setIsAddUserModalVisible(false);
  };

  const handleUpdate = async (id: string, updatedData: Partial<Data>, event: ChangeEvent<HTMLInputElement>) => {
    await updateData(id, updatedData);
  
    // Update the local data array with the new values
    useStore.setState((state) => {
      const draft = createDraft(state);
      const index = draft.data.findIndex((item) => item.id === id);
      if (index !== -1) {
        draft.data[index] = { ...draft.data[index], ...updatedData };
      }
      const nextState = finishDraft(draft);
      return nextState;
    });
  
    // Clear the selected row
    setSelectedRow(null);
  
    // Prevent form submission behavior
    event.preventDefault();
  };
  
 
  
  

  const handleDelete = async (id: number) => {
    await deleteData(id.toString());
  };
  
  const columns: ColumnsType<Data> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, record) =>
        selectedRow === record.id ? (
          <Input
            value={name}
            onChange={(event) =>
              handleUpdate(record.id, { name: event.target.value }, event)
            }
          />
        ) : (
          name
        ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email, record) =>
        selectedRow === record.id ? (
          <Input
            value={email}
            onChange={(event) =>
              handleUpdate(record.id, { email: event.target.value }, event)
            }
          />
        ) : (
          email
        ),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (gender, record) =>
        selectedRow === record.id ? (
          <Input
            value={gender}
            onChange={(event) =>
              handleUpdate(record.id, { gender: event.target.value }, event)
            }
          />
        ) : (
          gender
        ),
    },
    {
      title: "Street",
      dataIndex: ["address", "street"],
      key: "street",
      render: (street, record) =>
        selectedRow === record.id ? (
          <Input
            value={street}
            onChange={(event) =>
              handleUpdate(record.id, {
                address: { ...record.address, street: event.target.value },
              }, event)
            }
          />
        ) : (
          street
        ),
    },
    {
      title: "City",
      dataIndex: ["address", "city"],
      key: "city",
      render: (city, record) =>
        selectedRow === record.id ? (
          <Input
            value={city}
            onChange={(event) =>
              handleUpdate(record.id, {
                address: { ...record.address, city: event.target.value },
              }, event)
            }
          />
        ) : (
          city
        ),
    },
    {
    title: "",
    dataIndex: "actions",
    key: "actions",
    render: (actions, record) => (
      <Button onClick={() => handleDelete(record.id)}>Delete</Button>
    ),
  },
  
    ];
    
    return (
      <div className="App">
      <Button onClick={showAddUserModal}>Add new user</Button>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
      <AddUser
        visible={isAddUserModalVisible}
        onCancel={handleCancel}
        onAddUser={handleAddUser}
      />
    </div>
    );
          
}

export default App;