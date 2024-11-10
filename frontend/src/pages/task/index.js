import "./task.scss";
import { useEffect, useContext } from "react";
import {
  Table,
  Space,
  Modal,
  Popconfirm,
  message,
  Card,
  Form,
  Input,
  Button,
  Checkbox,
} from "antd";
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FileAddTwoTone,
} from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import TaskForm from "./taskForm";

const Task = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(true);
  const [taskData, setTaskData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [tempModalState, setTempModalState] = useState(false);
  const [viewData, setViewData] = useState({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const info = (e) => {
    Modal.info({
      title: <h2>View Task</h2>,
      content: (
        <div>
          <>
            <pre>
              <b>Title:</b> <p>{e?.title}</p>
              <b>Description:</b> <p>{e?.description}</p>
              <b>Status:</b> <p>{e?.completed ? "Completed" : "Pending"}</p>
            </pre>
          </>
        </div>
      ),
      onOk() {},
    });
  };

  const rowData = (e) => {
    info(e);
  };

  const handleChange = (e) => {
    setPagination(e);
    getTaskData(e);
  };
  const confirm = async (e) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}task/${e}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response?.data?.success) {
        message.success("Task deleted successfully.");
        setPagination({ ...pagination, current: 1 });
        getTaskData({ ...pagination, current: 1 });
      } else {
        message.error(response?.data?.message);
      }
    } catch (error) {
      message.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  //Table Columns
  const columns = [
    {
      title: "Sr No.",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "completed",
      key: "completed",
      render: (text) => (text ? "Completed" : "Pending"),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <EyeOutlined onClick={() => rowData(record)} />

          <EditOutlined
            className="editRecord"
            onClick={() => {
              setViewData(record);
              setTempModalState(true);
            }}
          />

          <Popconfirm
            title="Are you sure to delete this Data?"
            onConfirm={() => confirm(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  //Table Data
  let data =
    taskData?.length > 0 &&
    taskData?.map((val, index) => {
      return {
        id: val?._id,
        no: (pagination.current - 1) * pagination.pageSize + index + 1,
        title: val?.title,
        description: val?.description,
        completed: val?.completed,
      };
    });

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (values) => {
    try {
      let payload = values;
      const type = viewData?.id ? "put" : "post";
      const url = viewData?.id
        ? `${process.env.REACT_APP_API_URL}task/`
        : `${process.env.REACT_APP_API_URL}task/create`;
      if (viewData?.id) {
        payload.id = viewData?.id;
      }
      const response = await axios[type](url, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response?.data?.success) {
        message.success("Task created successfully.");
        setIsOpen(false);
        getTaskData();
      } else {
        message.error(response?.data?.message);
      }
    } catch (error) {
      message.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const getTaskData = async (e = {}) => {
    try {
      const payload = {
        page: e.current || pagination.current || 1,
        limit: e.pageSize || pagination.pageSize || 10,
        sort: "updatedAt",
        order: "DESC",
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}task/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response?.data?.success) {
        setTaskData(response?.data?.data?.tasks);
        setPagination((prev) => ({
          ...prev,
          total: response?.data?.data?.count,
        }));
      } else {
        message.error(response?.data?.message);
      }
    } catch (error) {
      message.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getTaskData();
  }, []);

  useEffect(() => {
    if (tempModalState) {
      setIsOpen(true);
      setTempModalState(false);
    }
  }, [tempModalState]);

  return (
    <div className="homeContainer">
      <div className="homeMain">
        <div className="actionbar">
          <div
            className="newRecord"
            onClick={() => {
              setViewData({});
              setTempModalState(true);
            }}
          >
            Add New Task
            <FileAddTwoTone />
          </div>
          <div className="logout">
            <button className="logoutBtn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
        <div className="table">
          <Table
            pagination={pagination}
            columns={columns}
            dataSource={data}
            onChange={handleChange}
          />
        </div>
      </div>

      <Modal
        title={viewData.id ? "Edit Task" : "Add Task"}
        open={isOpen}
        footer={null}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <TaskForm handleSubmit={handleSubmit} viewData={viewData} />
      </Modal>
    </div>
  );
};

export default Task;
