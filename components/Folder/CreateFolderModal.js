import React,{useState,useContext,useEffect} from "react";
import Image from "next/image";
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 
import { app } from "@/Config/FirebaseConfig";
import { useSession } from "next-auth/react";
import { ShowToastContext } from "@/app/context/ShowToastContext";
import { ParentFolderIdContext } from "@/app/context/ParentFolderIdContext";

const CreateFolderModal = ({onClose}) => {
  const docId=Date.now().toString(); 
  const [folderName,setFolderName]=useState("");
  const db = getFirestore(app);
  const {data:session}=useSession()
  const {showToastMsg,setShowToastMsg}=useContext(ShowToastContext)
  const {parentFolderId,setParentFolderId}=useContext(ParentFolderIdContext)

  useEffect(()=>{
       
  },[])

  
  const onCreate=async(e)=>{
    e.preventDefault();
    // console.log(folderName)
    
    await setDoc(doc(db,"Folders",docId), {
      name: folderName,
      id:docId,
      createBy:session.user.email,
      parentFolderId:parentFolderId
    });
    setShowToastMsg('Folder Created Successfully!')
    setFolderName("");

    onClose();
  }

  return (
    <div>
     

      
      <form method="dialog border-2 border-black">
        <button  className="btn ml-60  bg-white text-black hover:bg-gray-400">
          Close
        </button>
        <div
          className="w-full   items-center 
        flex flex-col justify-center gap-3 "
        >
          <Image src="/folder.png" alt="folder" width={50} height={50} />
          <input
            value={folderName}
            type="text"
            placeholder="Folder Name"
            className="p-2 border-[1px] outline-none
                rounded-md text-black bg-white"
            onChange={(e) => setFolderName(e.target.value)}
          />
         
          <button
            className="bg-blue-500
          text-white rounded-md p-2 px-3 w-full"
            onClick={onCreate}
          >
            Create
          </button>
        </div>
      </form>
      
    </div>
  );
};

export default CreateFolderModal;
