import React from "react";
import Image from "next/image";

const FolderItem = ({folder}) => {
  return (
    
      <div
        className={`w-full
    flex flex-col justify-center 
    items-center h-[120px]
    border-2 
    rounded-lg p-5 bg-white
    hover:scale-105 hover:shadow-md
    cursor-pointer `}
      >
        <Image src="/folder.png" alt="folder" width={40} height={40} />
        <h2 className="line-clamp-1 teext-[12px] text-center">{folder.name}</h2>
      </div>
    
  );
};

export default FolderItem;
