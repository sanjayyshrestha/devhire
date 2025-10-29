import { StatCard } from "@/components/ui/stat-card";
import { FolderKanban, FileText, Users, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ClientDashboardProps } from "@/app/dashboard/client/page";

export default function ClientDashboard({
  clientDashboardData,
}: {
  clientDashboardData: ClientDashboardProps;
}) {
  const { totalProjects, totalApplications, totalHiredDevs, recentProjects } = clientDashboardData;

  // Map the stats dynamically
  const stats = [
    {
      title: "Total Projects",
      value: totalProjects.toString(),
      icon: FolderKanban,
      
    },
    {
      title: "Applications",
      value: totalApplications.toString(),
      icon: FileText,
     
    },
    {
      title: "Hired Developers",
      value: totalHiredDevs.toString(),
      icon: Users,
    },
    
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your projects.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Projects & Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>Your latest project postings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentProjects.length ? (
              recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <p className="font-medium">{project.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {project._count.application} applications
                    </p>
                  </div>
                  <Badge variant={project.status === "COMPLETED" ? "secondary" : "default"}>
                    {project.status}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No recent projects.</p>
            )}
            <Link href="/dashboard/client/projects">
              <Button variant="outline" className="w-full">
                View All Projects
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/dashboard/client/projects">
              <Button className="w-full justify-start" variant="outline">
                <FolderKanban className="mr-2 h-4 w-4" />
                Create New Project
              </Button>
            </Link>
            <Link href="/dashboard/client/applications">
              <Button className="w-full justify-start" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Review Applications
              </Button>
            </Link>
            <Link href="/dashboard/client/team">
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Manage Team
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
