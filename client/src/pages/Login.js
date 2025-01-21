import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL}/users/login`,
        values
      );
      setLoading(false);
      message.success("login success");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
    }
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <div className="resgister-page min-h-screen">
        {loading && <Spinner />}
        <Form
          layout="vertical"
          onFinish={submitHandler}
          className="border border-black px-4 py-5 rounded-2xl"
        >
          <h1 className="text-3xl font-bold text-center p-3">Login</h1>

          <Form.Item label="Email" name="email">
            <Input type="email" className="rounded-lg" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" className="rounded-lg" />
          </Form.Item>
          <div className="d-flex justify-content-between items-center gap-2">
            <Link to="/register">
              <p>New user ? Click Here to register</p>{" "}
            </Link>

            <button className="btn btn-primary">Login</button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
