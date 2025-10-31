import { DeveloperDashboardData } from "@/app/dashboard/developer/page";
import { StatCard } from "@/components/ui/stat-card";
import { Search, FileText, CheckCircle2 } from "lucide-react";

export default function DeveloperDashboard({dashboardData}:{
  dashboardData:DeveloperDashboardData
}) {
  const stats = [
  { title: "Available Projects", value:dashboardData.availableProjects, icon: Search},
  { title: "My Applications", value: dashboardData.myApplications, icon: FileText },
  { title: "Accepted", value: dashboardData.acceptedApplication, icon: CheckCircle2,},
];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Find your next opportunity</p>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
     
    </div>
  );
}
