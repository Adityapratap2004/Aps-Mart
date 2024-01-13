import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setToastify } from "../State/Slice/toastifySlice";

const Toastify = () => {
  const toastify = useSelector((state) => state.toastify);
  console.log(toastify.show);
  const dispatch = useDispatch();

  if (toastify.show) {
    toast(toastify.msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    
     setInterval(() => {
        dispatch(setToastify({ show: false, msg: "" }));
    }, 5000);

      

    
    
  }

  return (
    <div>
      {toastify.show && (
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      )}
    </div>
  );
};

export default Toastify;
