import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";

const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/login");
  };
  return (
    <>
      <nav className="text-white bg-gradient-to-r from-zinc-500 via-zinc-600 to-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-400 dark:focus:ring-zinc-800 shadow-lg shadow-zinc-500/50 dark:shadow-lg dark:shadow-zinc-800/80 font-medium text-sm px-4 py-2.5 text-center me-2 mb-2">
        <div className="">
          <button
            className="sm:hidden border-[1.5px] border-white rounded-md text-white px-3 py-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
          </button>
          <div
            className="hidden sm:flex justify-between items-center"
            id="navbarTogglerDemo01"
          >
            <Link className="navbar-brand font-bold text-xl text-white" to="/">
              Expense Tracker
            </Link>
            <ul className="flex gap-4 items-center justify-center">
              <li className="nav-item flex items-center gap-1 justify-center">
                {" "}
                <p className="text-white pt-1">Welcome, </p>
                <p className="nav-link text-xl font-bold text-white">
                  {loginUser && loginUser.name}
                </p>{" "}
              </li>
              <li className="">
                <button
                  class="text-white bg-gradient-to-r from-zinc-500 via-zinc-600 to-zinc-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-zinc-300 dark:focus:ring-zinc-800 shadow-lg shadow-zinc-500/50 dark:shadow-lg dark:shadow-zinc-800/80 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
