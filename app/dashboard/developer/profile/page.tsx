import { getDeveloperProfileData } from '@/action/developer.action'
import { getUserId } from '@/action/user.action'
import DeveloperProfile from '@/components/DeveloperProfile'
import React from 'react'

export type DeveloperProfileData=Awaited<ReturnType<typeof getDeveloperProfileData>>
const DeveloperProfilePage = async () => {
  const userId=await getUserId()
  const user=await getDeveloperProfileData(userId);
  return (
    <div>
      <DeveloperProfile userProfileData={user}/>
    </div>
  )
}

export default DeveloperProfilePage