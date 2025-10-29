import { getClientDashboardData } from '@/action/client.action'
import ClientDashboard from '@/components/ClientDashboard'
import { ClientSidebar } from '@/components/ClientSidebar'
// import { DashboardLayout } from '@/components/DashboardLayout'
import React from 'react'

export type ClientDashboardProps=Awaited<ReturnType<typeof getClientDashboardData>>
const ClientDashboardPage = async () => {
  const clientDashboardData=await getClientDashboardData();
  return (
    <div>
     
        <ClientDashboard clientDashboardData={clientDashboardData}/>
      
    </div>
  )
}

export default ClientDashboardPage