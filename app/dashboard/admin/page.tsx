import { getDataForAdminDashboard } from "@/action/admin.action";
import AdminDashboard from "@/components/AdminDashboard";
import React from "react";
export type AdminDashboardProps=Awaited<ReturnType<typeof getDataForAdminDashboard>>
const AdminDashboardPage = async () => {
  const data=await getDataForAdminDashboard();
  return <AdminDashboard data={data} />;
};

export default AdminDashboardPage;
