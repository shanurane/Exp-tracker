import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, message, Table, DatePicker } from "antd";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Spinner from "../components/Spinner";
import moment from "moment";
import Analytics from "../components/Analytics";
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "refrence",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div className="flex gap-3">
          <EditOutlined
            onClick={() => handleOpenModal(record)}
            className="p-1 rounded-full border-[1.3px] border-black hover:bg-black"
          />
          <DeleteOutlined
            onClick={() => handleDelete(record)}
            className="rounded-full border-[1.3px] border-black p-1 hover:bg-black"
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post(
          `${process.env.REACT_APP_URL}/transactions/get-transection`,
          {
            userid: user._id,
            frequency,
            selectedDate,
            type,
          }
        );
        setLoading(false);
        setAllTransaction(res.data);
      } catch (error) {
        setLoading(false);
        message.error("Fetch Issue With Transaction");
      }
    };
    getAllTransactions();
  }, [frequency, selectedDate, type]);

  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_URL}/transactions/delete-transection`,
        {
          transactionId: record._id,
        }
      );
      message.success("Transaction Deleted!");
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.post(
        `${process.env.REACT_APP_URL}/transactions/get-transection`,
        {
          userid: user._id,
          frequency,
          selectedDate,
          type,
        }
      );
      setAllTransaction(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Unable to Delete");
    }
  };

  const handleOpenModal = (record = null) => {
    setEditable(record);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditable(null);
    form.resetFields(); // Clear form fields when closing the modal
  };

  // Automatically update form fields when `editable` changes
  useEffect(() => {
    if (editable) {
      form.setFieldsValue(editable); // Populate form with transaction data
    } else {
      form.resetFields(); // Reset form fields for new transactions
    }
  }, [editable, form]);

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      if (editable) {
        // Update transaction
        await axios.post(
          `${process.env.REACT_APP_URL}/transactions/edit-transection`,
          {
            payload: { ...values, userid: user._id },
            transactionId: editable._id,
          }
        );
        message.success("Transaction Updated Successfully");
      } else {
        // Add new transaction
        await axios.post(
          `${process.env.REACT_APP_URL}/transactions/add-transection`,
          {
            ...values,
            userid: user._id,
          }
        );
        message.success("Transaction Added Successfully");
      }
      setLoading(false);
      handleCloseModal();

      // Refresh the transactions list
      const res = await axios.post(
        `${process.env.REACT_APP_URL}/transactions/get-transection`,
        {
          userid: user._id,
          frequency,
          selectedDate,
          type,
        }
      );
      setAllTransaction(res.data);
    } catch (error) {
      setLoading(false);
      message.error("Failed to process transaction");
    }
  };

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="w-full flex justify-around">
        <div className="flex flex-col justify-center items-center">
          <h6 className="text-md font-bold py-2">Select Frequency</h6>
          <div className="flex items-center">
            <Select
              value={frequency}
              onChange={(values) => setFrequency(values)}
              className="border-1 border-black rounded-md overflow-hidden outline-none w-auto focus:black focus:ring-0"
            >
              <Select.Option value="7">LAST 1 Week</Select.Option>
              <Select.Option value="30">LAST 1 Month</Select.Option>
              <Select.Option value="365">LAST 1 Year</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>
            {frequency === "custom" && (
              <RangePicker
                value={selectedDate}
                onChange={(values) => setSelectedDate(values)}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h6 className="text-md font-bold py-2">Select Type</h6>
          <Select
            value={type}
            onChange={(values) => setType(values)}
            className="border-1 border-black rounded-md overflow-hidden outline-none w-20"
          >
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense" className="min-w-fit">
              Expense
            </Select.Option>
          </Select>
        </div>

        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-md py-2">Add New Expense</h1>
          <button
            className="text-white bg-gradient-to-r from-zinc-500 via-zinc-600 to-zinc-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-zinc-300 dark:focus:ring-zinc-800 shadow-lg shadow-zinc-500/50 dark:shadow-lg dark:shadow-zinc-800/80 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2"
            onClick={() => handleOpenModal()}
          >
            Add New
          </button>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-md py-2">View</h1>
          <div className="border border-black p-[2px] rounded-full">
            <UnorderedListOutlined
              onClick={() => setViewData("table")}
              className={`p-2 ${
                viewData === "table"
                  ? "active-icon bg-zinc-400"
                  : "inactive-icon"
              } rounded-full`}
            />
            <AreaChartOutlined
              onClick={() => setViewData("analytics")}
              className={`p-2 ${
                viewData === "analytics"
                  ? "active-icon bg-zinc-400"
                  : "inactive-icon"
              } rounded-full`}
            />
          </div>
        </div>
      </div>
      <div className="content">
        {viewData === "table" ? (
          <Table
            columns={columns}
            dataSource={allTransaction}
            className="p-3"
            rowClassName={(record) =>
              record.type === "income" ? "text-green-500" : "text-red-500"
            }
          />
        ) : (
          <Analytics allTransaction={allTransaction} />
        )}
      </div>

      <Modal
        title={editable ? "Edit Transaction" : "Add Transaction"}
        open={showModal}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Amount is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: "Type is required" }]}
          >
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="Salary">Salary</Select.Option>
              <Select.Option value="Milk">Milk</Select.Option>
              <Select.Option value="Electricity">Electricity</Select.Option>
              <Select.Option value="Vegetables">Vegetables</Select.Option>
              <Select.Option value="Groceries">Groceries</Select.Option>
              <Select.Option value="EMI">EMI</Select.Option>
              <Select.Option value="Loan">Loan</Select.Option>
              <Select.Option value="Insurance Premium">
                Insurance Premium
              </Select.Option>
              <Select.Option value="Award">Award</Select.Option>
              <Select.Option value="Fees">Fees</Select.Option>
              <Select.Option value="Tax">Tax</Select.Option>
              <Select.Option value="Bill">Bill</Select.Option>
              <Select.Option value="Medical">Medical</Select.Option>
              <Select.Option value="Project">Project</Select.Option>
              <Select.Option value="Food">Food</Select.Option>
              <Select.Option value="Movie">Movie</Select.Option>
              <Select.Option value="Miscellaneous">Miscellaneous</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Reference" name="refrence">
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
