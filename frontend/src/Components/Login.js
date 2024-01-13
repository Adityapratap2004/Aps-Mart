import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoLogInOutline } from "react-icons/io5";
import { login } from "../Api/authApi";
import { useDispatch } from "react-redux";
import { setToastify } from "../State/Slice/toastifySlice";
import Cookies from "js-cookie";

const Login = () => {
  const initialCridetentials = { Email: "", Password: "" };
  const [cridentials, setCridentials] = useState(initialCridetentials);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const handleChange = (e) => {
    setCridentials({ ...cridentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(cridentials);
    if (res.success) {
      console.log("success");
      dispatch(setToastify({ show: true, msg: "logged in successfully" }));
      console.log(Cookies.get('authToken'))
      localStorage.setItem('role',res.user.role)
      console.log(localStorage.getItem('role'))
      
      nav("/");
    } else {
      console.log("error");
    }
  };

  // const login = 2
  useEffect(() => {
    return () => {
      document.body.style.overflowY = "scroll";
    };
  });

  return (
    <div className="w-[100%] h-[100vh] flex justify-center items-center  bg-gray-200">
      <div className=" flex flex-col bg-white w-[300px] sm:w-[350px] h-[460px] p-5   border-gray-400 shadow-xl rounded-lg">
        <h1 className="text-center text-4xl mb-8 text-[#324d67] font-semibold drop-shadow-lg">
          Login
        </h1>
        <p className=" text-gray-400 mb-5 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className=" text-red-500">
            Create your account
          </Link>{" "}
          it takes less than a minute
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 text-gray-500">
            <label htmlFor="Email">Email</label>
            <input
              type="email"
              required
              id="Email"
              name="Email"
              onChange={handleChange}
              value={cridentials.Email}
              className="border-2 h-8 rounded-md focus:border-violet-500 focus:bg-violet-50 shadow-sm outline-none p-2"
            />
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              required
              id="Password"
              name="Password"
              onChange={handleChange}
              value={cridentials.Password}
              className="border-2 h-8 rounded-md focus:border-violet-500 focus:bg-violet-50 shadow-sm outline-none p-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-violet-500 justify-center flex cursor-pointer border my-9 h-9 rounded-md p-1 text-white font-semibold"
          >
            <IoLogInOutline className="w-6 h-6 mr-2" /> Login
          </button>
        </form>
        <div className="w-full flex justify-end">
          <Link to="/" className="text-sm text-violet-400">
            Forget Password ?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
