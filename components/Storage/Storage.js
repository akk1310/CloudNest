import React from 'react'
import UserInfo from './UserInfo'
import StorageInfo from './StorageInfo'
import StorageDetailList from './StorageDetailList'
import StorageUpgradeMsg from './StorageUpgradeMsg'
import { useSession } from 'next-auth/react'

const Storage = () => {
  const {data:session}=useSession()
  return session && (
    <div className='bg-white border-black  min-w-[210px]'>
      <UserInfo />
      <StorageInfo />
      <StorageDetailList />
      <StorageUpgradeMsg />
    </div>
  )
}

export default Storage
