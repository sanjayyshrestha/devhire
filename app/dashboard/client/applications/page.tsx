

import { getMyProjectApplications } from '@/action/client.action'
import ClientApplications from '@/components/ClientApplications'
import React from 'react'

export type MyProjectApplication =Awaited<ReturnType<typeof getMyProjectApplications>>
const ClientApplicationsPage =async () => {
  const applications=await getMyProjectApplications();
  return (
  <ClientApplications applications={applications}/>
  )
}

export default ClientApplicationsPage