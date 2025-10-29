import { getProjects } from "@/action/client.action";
import ClientProjects from "@/components/ClientProjects";
import { ClientSidebar } from "@/components/ClientSidebar";
// import { DashboardLayout } from "@/components/DashboardLayout";
import React from "react";

export type Projects=Awaited<ReturnType<typeof getProjects>>
const ClientProjectsPage = async () => {
  const projects=await getProjects();
  // if(!projects) return <div>No project found</div>
  return (
   
      <ClientProjects projects={projects} />
  
  );
};

export default ClientProjectsPage;
