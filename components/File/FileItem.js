import React, { useState, useContext } from "react";
import Image from "next/image";
import moment from "moment/moment";
import { app } from "@/Config/FirebaseConfig";
import { ShowToastContext } from "@/app/context/ShowToastContext";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";

const FileItem = ({ file }) => {
  
  console.log("fn",file)
  const db=getFirestore(app)
  const image="/" + file.type + ".png"
  const {showToastMsg,setShowToastMsg}=useContext(ShowToastContext)
  const deleteFile=async(file)=>{
    // console.log("fid",file.id)
    // await deleteDoc(doc(db,"files",file.id.toString())).then(resp=>{
    //   setShowToastMsg('File Deleted!!!')
      try {
        await deleteDoc(doc(db, "files", file.id.toString()));
        setShowToastMsg("File Deleted!!!");
      } catch (error) {
        console.error("Error deleting file: ", error);
        setShowToastMsg("Error deleting file");
      }
}
const copyToClipboard = (url) => {
  console.log("url",url)
  navigator.clipboard
    .writeText(url)
    .then(() => {
      setShowToastMsg("Link copied to clipboard!"); // Show success message
    })
    .catch((error) => {
      console.error("Error copying text: ", error);
      setShowToastMsg("Failed to copy link");
    });
};

  return (
    <div
      className="grid grid-cols-1
    sm:grid-cols-2 gap-y-1  justify-between
    cursor-pointer hover:bg-gray-100
    p-3 rounded-md border-2 border-black w-full  xs:border-white "
    >
      <div className="flex gap-2  items-center">
        <Image src={image} alt="file-icon" width={26} height={20} on />
        <h2 onClick={()=>window.open(file.imageUrl)} className="text-[15px] truncate">{file.name}</h2>
      </div>
      <div className="grid gap-5   grid-cols-2   xs:grid-cols-4 place-content-start">
        <h2 className="text-[12px] md:text-[14px]">
            
          {/* {file.modifiedAt} */}
          {moment(file.modifiedAt).format("MMMM DD, YYYY")}
        </h2>
        <h2 className="text-[12px]  md:text-[14px]">
            {/* {file.size} */}
            {(file.size / 1024 ** 2).toFixed(2) + " MB"}

         

        </h2>
        <div className="text-[12px]  md:text-[14px]">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => deleteFile(file)}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 float-right text-red-500
           hover:scale-110 transition-all"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </div>
        <div className="ml-8">

         <svg onClick={() => copyToClipboard(file.imageUrl)} className="w-5 h-5 
           hover:scale-110 transition-all" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><path d="M307 34.8c-11.5 5.1-19 16.6-19 29.2l0 64-112 0C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96l96 0 0 64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z"/></svg>
        </div>
        
      </div>
    </div>
  );
}

export default FileItem;
