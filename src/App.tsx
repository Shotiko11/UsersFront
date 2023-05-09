import { useEffect, useState } from "react";
import { useStore, Data } from "./store";
import { Table, Button, Menu } from "antd";
import { ColumnsType } from "antd/es/table";
import { AddUser } from "./AddUser";
import { EditUser } from "./EditUser";
import { Chart } from "./Chart";
import { Route, Link, Switch } from "react-router-dom";

function App() {
  const [selectedRow, setSelectedRow] = useState<object | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
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
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setSelectedRow(null);
    setIsModalVisible(false);
  };

  const handleAddUser = async (newData: Data) => {
    await addData(newData);
    setIsModalVisible(false);
  };

  const handleUpdate = async (id: string, updatedData: Partial<Data>) => {
    await updateData(id, updatedData);

    // Clear the selected row
    setSelectedRow(null);
  };

  const handleDelete = async (id: number) => {
    await deleteData(id.toString());
  };

  const columns: ColumnsType<Data> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Street",
      dataIndex: ["address", "street"],
      key: "street",
    },
    {
      title: "City",
      dataIndex: ["address", "city"],
      key: "city",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone"
    },    
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Button onClick={() => handleDelete(record.id)}>Delete</Button>
      ),
    },
  ];
  return (
    <div className="App">
      <Menu theme="light" mode="horizontal">
        <Menu.Item key="home">
          <Link to="/home">Home</Link>
        </Menu.Item>
        <Menu.Item key="chart">
          <Link to="/chart">Chart</Link>
        </Menu.Item>
      </Menu>
      <Switch>
        <Route path="/home">
          <Button onClick={showAddUserModal}>Add new user</Button>
          <Table
            dataSource={data}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            onRow={(record) => {
              return {
                onDoubleClick: () => {
                  setSelectedRow(record);
                  setIsModalVisible(true);
                },
              };
            }}
          />
          {!selectedRow?.id ? (
            <AddUser
              visible={isModalVisible}
              onClose={handleCancel}
              onAddUser={handleAddUser}
            />
          ) : (
            <EditUser
              visible={isModalVisible}
              onClose={handleCancel}
              onUpdateUser={handleUpdateUser}
              selectedRow={selectedRow}
            />
          )}
        </Route>
        <Route path="/chart">
          <Chart data={data} />
        </Route>
      </Switch>
    </div>
  );
  
  
}

export default App;