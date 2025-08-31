// src/components/ToastMessage.jsx
import { ToastContainer } from "react-toastify";

const ToastMessage = () => {
  return (
    <ToastContainer 
      position="bottom-right"
      autoClose={700}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
      theme="colored"
    />
  );
};

export default ToastMessage;
