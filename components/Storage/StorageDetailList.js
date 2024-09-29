import { collection, getDocs, getFirestore, query, where ,onSnapshot} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { app } from '../../Config/FirebaseConfig'
import { useSession } from 'next-auth/react'
import StorageSize from "../../Services/StorageSize"
import StorageDetailItem from './StorageDetailItem';

const StorageDetailList = () => {
    const [fileList,setFileList]=useState([])
    const db=getFirestore(app)
    const {data:session}=useSession();
    const [imageSize,setImageSize]=useState(0);
    const [vidSize,setVidSize]=useState(0);
    const [audSize,setAudSize]=useState(0);
    const [otherSize, setOtherSize] = useState(0);

    const [docSize,setDocSize]=useState(0);
    let totalSize=0;


    // useEffect(()=>{
    //     if(session){
    //         totalSize=0;
    //         getAllFiles()
    //     }
    // },[session])

    // useEffect(() => {
    //     // console.log("File List:", fileList);
    //     console.log("updating..")
    //   }, [fileList]);
    useEffect(() => {
      if (session) {
        const q = query(
          collection(db, "files"),
          where("createdBy", "==", session.user?.email)
        );
  
        // Real-time listener for Firestore changes
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const files = [];
          querySnapshot.forEach((doc) => {
            files.push(doc.data());
          });
          setFileList(files); // Update the fileList state with new data
        });
  
        // Cleanup the listener on unmount
        return () => unsubscribe();
      }
    }, [session, db]);

    useEffect(()=>{
        setImageSize(StorageSize.getStorageByType(fileList,['png','jpg','avif','jpeg']));
        setDocSize(StorageSize.getStorageByType(fileList,['pdf','docx','csv','pptx']));
        setVidSize(StorageSize.getStorageByType(fileList, ['mp4', 'mov'])); 
        setAudSize(StorageSize.getStorageByType(fileList, ['mp3','com'])); 
        setOtherSize(StorageSize.getStorageByType(fileList, ['zip', 'rar', 'exe']));
        // console.log("Imag", imageSize)
    },[fileList])

    // const getAllFiles=async()=>{
    //     const q=query(collection(db,"files"),
    //     where("createdBy","==",session.user?.email)
        
    // )
    // const querySnapshot = await getDocs(q)
    // querySnapshot.forEach((doc)=>{
    //     // totalSize=totalSize+doc.data()['size'];
    //     // files.push(doc.data()); 
    //     setFileList(fileList=>([...fileList,doc.data()]))
        
    // })
    // // setFileList(files);
    // // setTotalSizeUsed((totalSize/1024**2).toFixed(2)+" MB");
    // }


    const storageList = [
        {
          id: 1,
          type: "Images",
          totalFile: fileList.filter(file => ['png', 'jpg','avif','jpeg'].includes(file.type)).length,
          size: `${imageSize} MB`,
          logo:'M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
        },
        {
          id: 1,
          type: "Videos",
          totalFile: fileList.filter(file => ['mp4', 'mov'].includes(file.type)).length,
          size: `${vidSize} MB`,
          logo:'M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z'

        },
        {
          id: 1,
          type: "Audio",
          totalFile: fileList.filter(file => ['mp3' ].includes(file.type)).length,
          size: `${audSize} MB`,
          logo:'M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z'

        },
        {
          id: 1,
          type: "Documents",
          totalFile: fileList.filter(file => ['docx','pdf','csv','pptx'].includes(file.type)).length,
          size: `${docSize} MB`,
          logo:'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'

        },
        {
          id: 1,
          type: "Others",
          totalFile:fileList.filter((file) => ['zip', 'rar', 'exe'].includes(file.type)).length,
          size: `${otherSize} MB`,
          logo:'M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z'

        },
      ];
  return (
    <div>
       {storageList.map((item,index)=>(
     <StorageDetailItem item={item} key={index} />

    ))}
    </div>
  )
}

export default StorageDetailList
