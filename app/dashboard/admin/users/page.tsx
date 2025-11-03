
import { getUsersForAdminDashboard } from '@/action/admin.action'
import AdminUsers from '@/components/AdminUsers'
import React from 'react'
export type AdminUser=Awaited<ReturnType<typeof getUsersForAdminDashboard>>
const AdminUsersPage = async () => {
  const users=await getUsersForAdminDashboard()
  return (
    <AdminUsers users={users} />
  )
}

export default AdminUsersPage