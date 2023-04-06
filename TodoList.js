import React, { useState } from "react";
import { Table, Tag, Divider, Input, Button, Modal, Form } from "antd";
import './TodoList.css';
const { TextArea } = Input;

function TodoList() {
  // your code here
  const [todoList, setTodoList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [modalDueDate, setModalDueDate] = useState("");
  const [modalTags, setModalTags] = useState("");
  const [modalStatus, setModalStatus] = useState("");

  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const handleAddTodo = () => {
    setModalVisible(true);
  };

  const handleModalOk = () => {
    const newTodo = {
      key: Date.now(),
      title: modalTitle,
      description: modalDescription,
      dueDate: modalDueDate,
      tags: modalTags.split(","),
      status: modalStatus,
    };

    setTodoList([...todoList, newTodo]);
    setModalVisible(false);
    setModalTitle("");
    setModalDescription("");
    setModalDueDate("");
    setModalTags("");
    setModalStatus("");
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setModalTitle("");
    setModalDescription("");
    setModalDueDate("");
    setModalTags("");
    setModalStatus("");
  };

  const columns = [    {      title: "Title",      dataIndex: "title",      key: "title",      render: (text) => <a>{text}</a>,    },    {      title: "Description",      dataIndex: "description",      key: "description",    },    {      title: "Due Date",      dataIndex: "dueDate",      key: "dueDate",    },    {      title: "Tags",      key: "tags",      dataIndex: "tags",      render: (tags) => (        <>          {tags.map((tag) => (            <Tag color="blue" key={tag}>              {tag}            </Tag>          ))}        </>      ),    },    {      title: "Status",      dataIndex: "status",      key: "status",    },  ];
  const filteredTodoList = todoList.filter((todo) =>
    todo.title.toLowerCase().includes(searchText)
  );
  
  return (
    <div    >
      <Input
        placeholder="Search title..."
        value={searchText}
        onChange={handleSearch}
      />
      <Divider />
      <Button type="primary" onClick={handleAddTodo}>
        Add Todo
      </Button>
      <Table dataSource={filteredTodoList} columns={columns} />
      <Modal
        title="Add Todo"
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form    >
          <Form.Item label="Title">
            <Input   
              value={modalTitle}
              onChange={(e) => setModalTitle(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Description">
            <TextArea
              value={modalDescription}
              onChange={(e) => setModalDescription(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Due Date">
            <Input
              value={modalDueDate}
              onChange={(e) => setModalDueDate(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Tag">
            <Input
              value={modalTags}
              onChange={(e) => setModalTags(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Status">
            <Input
              value={modalStatus}
              onChange={(e) => setModalStatus(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default TodoList