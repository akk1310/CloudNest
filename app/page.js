"use client";
import { useContext, useEffect,useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import FolderList from "@/components/Folder/FolderList";
import FileList from "@/components/File/FileList";
import { app } from "@/Config/FirebaseConfig";
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { ParentFolderIdContext } from "./context/ParentFolderIdContext";
import { ShowToastContext } from "./context/ShowToastContext";

export default function Home() {
  const db = getFirestore(app);
  const { data: session } = useSession();
  const router = useRouter();
  const [folderList,setFolderList]=useState([])
  const [fileList,setFileList]=useState([])
  const {parentFolderId,setParentFolderId}=useContext(ParentFolderIdContext)
  const { showToastMsg, setShowToastMsg } = useContext(ShowToastContext);


  
  useEffect(() => {
    if (!session) {
      router.push("/login");
    } else{
      getFolderList()
      getFileList()
    }
    setParentFolderId(0)

  }, [session, router,showToastMsg]);

  const getFolderList = async () => {
    setFolderList([])
    const q = query(
      collection(db, "Folders"),
      where("parentFolderId","==",0),
      where("createBy", "==", session.user?.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      setFolderList(folderList =>([...folderList,doc.data()]))
    });
  };
  const getFileList = async () => {
    setFileList([])
    const q = query(
      collection(db, "files"),
      where("parentFolderId","==",0),
      where("createdBy", "==", session.user?.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      setFileList(fileList =>([...fileList,doc.data()]))
    });
  };
  return (
    <div>
      <SearchBar />
      <FolderList folderList={folderList} />
      <FileList fileList={fileList}/>
    </div>
  );
}
