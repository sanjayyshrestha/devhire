import {  getUser } from '@/action/user.action'
import DeveloperDashboard from '@/components/DeveloperDashboard'
import React from 'react'

const DeveloperDashboardPage =async () => {
 
  const user=await getUser()
  console.log('User is ',user)
  return (
   <DeveloperDashboard/>
  )
}

export default DeveloperDashboardPage