"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import menu from "@/data/menu";
import { useSession } from "next-auth/react";
import UploadFileModal from "./File/UploadFileModal";
import CreateFolderModal from "./Folder/CreateFolderModal";

const SideNavBar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { data: session } = useSession();
  const dialogRef = useRef(null);
  const router = useRouter();

  const onMenuClick = (item, index) => {
    setActiveIndex(index);
    router.push("/");
  };

  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return session&&(
    <div className="bg-slate-50 sticky top-0 z-10 shadow-blue-200 shadow-md pt-4 h-screen w-[250px]">
      <div>
        <Image
          alt="logos"
          className="cursor-pointer  mx-auto p-5"
          width={300}
          height={70}
          src="/log2.png"
          onClick={() => router.push("/")}
        />
      </div>
      <button
        onClick={() => window.upload_file.showModal()}
        className=" mx-auto flex gap-2 items-center justify-center mt-5 hover:scale-105 translate-all bg-blue-500 p-2 px-8 text-white rounded-lg"
      >
        Add New File
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
      <button
        onClick={openDialog}
        // onClick={() => document.getElementById("my_modal_1").showModal()}
        className="mx-auto flex gap-2 items-center mt-2 hover:scale-105 translate-all justify-center bg-blue-400 px-8 p-2 text-white rounded-lg"
      >
        Create Folder
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
      <hr className="mt-10" />
      <div className="mt-7">
        {menu.list.map((item, index) => (
          <h2
            onClick={() => onMenuClick(item, index)}
            key={index}
            className={`flex gap-2 justify-start mr-5 ml-6 text-lg items-center p-2 mt-3 text-gray-500 rounded-md cursor-pointer
            hover:bg-blue-500 hover:text-white ${
              activeIndex == index && "bg-blue-500 text-gray-50"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={item.logo}
              />
            </svg>
            {item.name}
          </h2>
        ))}
      </div>

      {/* <dialog id="my_modal_1" className="modal border-2  ">
        <div className="modal-box bg-white border-2 ">
          <div className="modal-action  flex justify-center ">
            <CreateFolderModal />
          </div>
        </div>
      </dialog> */}
      <dialog id="my_modal_1" ref={dialogRef} className="modal border-2">
        <div className="modal-box bg-white border-2">
          <CreateFolderModal onClose={closeDialog} />
        </div>
      </dialog>
      <dialog id="upload_file" className="modal">
        <UploadFileModal closeModal={() => window.upload_file.close()} />
      </dialog>
      <div className=" mt-48 flex ml-6">
        <a
          className="underline text-gray-600"
          target="_blank"
          href="https://github.com/akk1310"
        >
          @AdnanKundlik
        </a>
      </div>
    </div>
  );
};

export default SideNavBar;
