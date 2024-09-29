import { signOut, useSession } from "next-auth/react";
import React,{useState} from "react";
import Image from "next/image";

const UserInfo = () => {
  const { data: session } = useSession();
  console.log("prof", session?.user);
  const defaultImage = "/prof1.avif";
  // const userImage = session?.user?.image || defaultImage;
  const [userImage, setUserImage] = useState(session?.user?.image || defaultImage);

  return (
    <div>
      {session ? (
        <div className="flex justify-between flex-col xl:flex-row  tems-center">
          <div className="flex gap-2 items-center  ">
            <Image
              alt="user-image"
              src={userImage}
              width={40}
              height={40}
              className="rounded-full"
              unoptimized
              onError={() => setUserImage(defaultImage)}
            />
            <div>
              <h2 className="text-[15px] font-bold"> {session.user.name} </h2>
              <h2 className="text-[15px] text-gray-400 mt-[-4px] ">
                {" "}
                {session.user.email}{" "}
              </h2>
            </div>
          </div>
          <div
            className="bg-blue-200 flex justify-center items-center p-2 rounded-lg
            cursor-pointer w-fit mx-auto "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              onClick={() => signOut()}
              stroke="currentColor"
              className="w-6 h-6 text-red-500
                hover:animate-pulse transition-all "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserInfo;
