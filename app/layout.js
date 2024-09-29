"use client";
import { SessionProvider } from "next-auth/react";
import Toast from "@/components/Toast";
import localFont from "next/font/local";
import Storage from "@/components/Storage/Storage";
// import SessionWrapper from "@/components/SessionWrapper";
import "./styles/globals.css";
import SideNavBar from "@/components/SideNavBar";
import CreateFolderModal from "@/components/Folder/CreateFolderModal";
import { ShowToastContext } from "./context/ShowToastContext";
import { ParentFolderIdContext } from "./context/ParentFolderIdContext";
import { useState } from "react";

export default function RootLayout({ children, session }) {
  const [showToastMsg, setShowToastMsg] = useState();
  const [parentFolderId, setParentFolderId] = useState();
  return (
    // bg-[size:20px_20px]
    <html lang="en">
      <head>
        <title>Cloud Nest - Cloud Storage App</title>
        <link rel="icon" href="/logo4.png" />
      </head>
      <body className=" ">
        <SessionProvider session={session}>
          <ParentFolderIdContext.Provider
            value={{ parentFolderId, setParentFolderId }}
          >
            <ShowToastContext.Provider
              value={{ showToastMsg, setShowToastMsg }}
            >
              <div className="flex bg-white min-w-[499px] md:min-w-[999px] ">
                <SideNavBar />
                <div className="grid grid-cols-1 md:grid-cols-3 w-full">
                  <div className="col-span-2 w-full text-black  bg-slate-100 p-5">
                    {children}
                  </div>
                  <div className="text-lg w-full bg-white order-first md:order-last p-5">
                    {" "}
                    <Storage />{" "}
                  </div>
                </div>
                <div></div>
              </div>
              {showToastMsg && <Toast msg={showToastMsg} />}
            </ShowToastContext.Provider>
          </ParentFolderIdContext.Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
