
import { getProjectsForAdminDashboard } from '@/action/admin.action'
import AdminProjects from '@/components/AdminProjects'
import React from 'react'

export type AdminProject=Awaited<ReturnType<typeof getProjectsForAdminDashboard>>
const AdminProjectsPage = async () => {
  const projects=await getProjectsForAdminDashboard()
  return (
   <AdminProjects projects={projects}/>
  )
}

export default AdminProjectsPage