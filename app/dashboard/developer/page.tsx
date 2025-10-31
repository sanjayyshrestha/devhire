import { getDeveloperDashboardData } from '@/action/developer.action'
import {  getUser } from '@/action/user.action'
import DeveloperDashboard from '@/components/DeveloperDashboard'
import React from 'react'
export type DeveloperDashboardData=Awaited<ReturnType<typeof getDeveloperDashboardData>>
const DeveloperDashboardPage =async () => {
  const data=await getDeveloperDashboardData()
  return (
   <DeveloperDashboard dashboardData={data}/>
  )
}

export default DeveloperDashboardPage