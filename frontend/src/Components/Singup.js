import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidLockAlt } from "react-icons/bi";
import { signup } from "../Api/authApi";
import { useDispatch } from "react-redux";
import { setToastify } from "../State/Slice/toastifySlice";
const Singup = () => {
  const nav = useNavigate();
  const dispatch=useDispatch();
  const initialState = { Name: "", Email: "", Password: "", Cpassword: "" };
  const [cridentials, setCridentials] = useState(initialState);
  const handleChange = (e) => {
    setCridentials({ ...cridentials, [e.target.name]: e.target.value });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cridentials.Cpassword !== cridentials.Password) {
      alert("password and confirm are not same");
      document.getElementById("Cpassword").focus();
    }
    const res = await signup(cridentials);
    if (res.success) {
      console.log(res.success);  
      localStorage.setItem('role',res.user.role)
      console.log(localStorage.getItem('role'))
      dispatch(setToastify({show:true,msg:"Signuped Successfully"}))
      nav("/")   
    } else {
      console.log("Error");
    }
  };

  return (
    <div className="contact-gradient h-[100vh] w-[100wv] flex items-center justify-center bg-gray-200">
      <div className="  flex flex-col bg-white w-[300px] sm:w-[350px] h-[475px] p-5   border-gray-400 shadow-xl rounded-lg">
        <h1 className="text-center text-3xl mb-8 text-[#324d67] font-semibold drop-shadow-lg">
          Create Account
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2 text-gray-500">
            <label htmlFor="Name">Name</label>
            <input
              type="text"
              id="Name"
              minLength="3"
              required
              name="Name"
              onChange={handleChange}
              value={cridentials.Name}
              className="border-2 h-8 rounded-md focus:border-violet-500 focus:bg-violet-50 shadow-sm outline-none p-2"
            />
            <label htmlFor="Email">Email</label>
            <input
              type="email"
              id="Email"
              name="Email"
              onChange={handleChange}
              value={cridentials.Email}
              className="border-2 h-8 rounded-md focus:border-violet-500 focus:bg-violet-50 shadow-sm outline-none p-2"
            />
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              minLength="8"
              id="Password"
              name="Password"
              onChange={handleChange}
              value={cridentials.Password}
              className="border-2 h-8 rounded-md focus:border-violet-500 focus:bg-violet-50 shadow-sm outline-none p-2"
            />
            <label htmlFor="Cpassword">Confirm Password</label>
            <input
              type="password"
              id="Cpassword"
              name="Cpassword"
              onChange={handleChange}
              value={cridentials.Cpassword}
              className={
                "border-2 h-8 rounded-md focus:border-violet-500 focus:bg-violet-50 shadow-sm outline-none p-2 "
              }
            />
          </div>
          <button
            type="submit"
            className="w-full  justify-center items-center flex cursor-pointer border my-9 h-9 rounded-md p-1  bg-violet-500 text-white font-semibold"
          >
            <BiSolidLockAlt className="w-6 h-6 mr-2" /> Create Account
          </button>
          <div className="-mt-7 text-sm flex justify-end px-2">
            <p>
              Have an account{" "}
              <span className=" text-green-500">
                <Link to="/login">login</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
      
    </div>
  );
};

export default Singup;
