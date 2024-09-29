import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FolderItem from "./FolderItem";
import FoldersmallItem from "./FoldersmallItem";
import { query } from "firebase/firestore";

const FolderList = ({ folderList, isBig = true }) => {
  const [activeFolder, setActiveFolder] = useState();
  const router = useRouter();
  //     const folderList=[
  //       {
  //           id:1,
  //           name:'Folder 1 to Test Big Text'
  //       },
  //       {
  //           id:2,
  //           name:'Folder 2'
  //       },
  //       {
  //           id:3,
  //           name:'Folder 3'
  //       },
  //       {
  //           id:4,
  //           name:'Folder 4'
  //       },
  //       {
  //           id:5,
  //           name:'Folder 4'
  //       },
  //   ]
  const onFolderClick = (id, item) => {
    setActiveFolder(id);
    router.push(`/folder/${item.id}?name=${item.name}`);
  };

  return (
    <div className="p-5 mt-5 bg-white rounded-lg">
      {isBig ? (
        <h2 className="text-[17px] font-bold items-center">
          Recent Folders
          <span className="cursor-pointer float-right text-blue-400 font-normal text-[13px]">
            View All
          </span>
        </h2>
      ) : null}

      {isBig ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {folderList.map((item, id) => (
            <div
              key={id}
              onClick={() => {
                onFolderClick(id, item);
              }}
            >
              <FolderItem folder={item} activeFolder={activeFolder == id} />
            </div>
          ))}
        </div>
      ) : (
        <div
          className=""
        >
          {folderList.map((item, index) => (
            <div key={index} onClick={() => onFolderClick(index, item)}>
              <FoldersmallItem folder={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default FolderList;
