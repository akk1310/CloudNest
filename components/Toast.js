import React,{useEffect,useContext} from "react";
import { ShowToastContext } from "@/app/context/ShowToastContext";

const Toast = ({msg}) => {
    const {showToastMsg,setShowToastMsg}=useContext(ShowToastContext)
    useEffect(()=>{
        const timer = setTimeout(() => {
            setShowToastMsg(null);
          }, 3000);
          return () => clearTimeout(timer);
    },[setShowToastMsg,msg])
  return (
    <div className="toast toast-top toast-end">
      <div className="alert alert-success">
        <span>{msg}</span>
      </div>
    </div>
  );
};

export default Toast;
