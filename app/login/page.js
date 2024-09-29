'use client';
import React,{useEffect} from 'react'
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import Image from "next/image";
import { useRouter } from 'next/navigation';

const page = () => {
  const { data: session } = useSession();
  const router = useRouter()
  useEffect(()=>{
   
    if (session) {
      router.push('/')
    }

  },[session,router])

  

  return (
    <div className='flex bg-slate-300  items-center min-h-screen justify-center '>
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
      
        

        <button onClick={()=>signIn()} className='bg-blue-400 p-2 rounded-xl px-3 text-white'>Login with Google</button>

        
      
    </div>
    
  )
}

export default page
