import Image from 'next/image'
import React from 'react'


function FoldersmallItem({folder}) {


//   const deleteFolder=async()=>{
//     await deleteDoc(doc(db, "Folders", folderId)).then(resp=>{
//         setShowToastMsg('Folder Deleted !')
//         // router.back();
//         window.history.back();
//     })
    
// }
  return (
    <div className=' flex justify-between
    hover:bg-gray-100
    p-2 rounded-md cursor-pointer'>
        <div className='flex gap-3'>

        <Image src='/folder.png'
        alt='folder'
        width={20}
        height={20}
        />
        <h1>{folder.name}</h1>
        </div>
        <div className='flex justify-end'>

             </div>
    </div>
  )
}

export default FoldersmallItem