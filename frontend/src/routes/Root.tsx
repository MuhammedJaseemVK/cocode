import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";

const root = () => {
  return (
    <div className="min-h-screen w-full bg-[url(https://wallpaperaccess.com/full/1145374.jpg)]">
      <Outlet />
      <ToastContainer />
    </div>
  );
};

export default root;
