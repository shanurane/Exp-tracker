import React from "react";

const Footer = () => {
  return (
    <div
      className="flex justify-center items-center w-full text-white bg-gradient-to-r from-zinc-600 via-zinc-700 to-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-400 dark:focus:ring-zinc-900 shadow-lg shadow-zinc-500/50 dark:shadow-lg dark:shadow-zinc-800/80 font-medium text-sm px-4 py-2.5 text-center me-2 mb-2"
      style={{ height: "60px", lineHeight: "60px" }}
    >
      <h6 className="text-center text-white">
        All rights reserved &copy; 2025 EXP TRACK
      </h6>
    </div>
  );
};

export default Footer;
