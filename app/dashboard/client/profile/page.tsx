

import { getClientProfileData } from '@/action/client.action';
import { getUserId } from '@/action/user.action'
import ClientProfile from '@/components/ClientProfile'
import React from 'react'

export type ClientProfileData=Awaited<ReturnType <typeof getClientProfileData>>
const ClientProfilePage = async () => {
  const userId=await getUserId();
  const data=await getClientProfileData(userId);
  return (
    <div>
      <ClientProfile userProfileData={data} />
    </div>
  )
}

export default ClientProfilePage