import { StatCard } from "@/components/ui/stat-card";
import { FolderKanban, FileText, Users, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const stats = [
  { title: "Total Projects", value: "12", icon: FolderKanban, trend: { value: "+2 this month", positive: true } },
  { title: "Applications", value: "48", icon: FileText, trend: { value: "+12 this week", positive: true } },
  { title: "Hired Developers", value: "8", icon: Users },
  { title: "Success Rate", value: "94%", icon: TrendingUp, trend: { value: "+5%", positive: true } },
];

const recentProjects = [
  { id: 1, title: "E-commerce Platform", status: "Active", applications: 12 },
  { id: 2, title: "Mobile App MVP", status: "In Progress", applications: 8 },
  { id: 3, title: "API Integration", status: "Completed", applications: 15 },
];

export default function ClientDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your projects.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>Your latest project postings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div>
                  <p className="font-medium">{project.title}</p>
                  <p className="text-sm text-muted-foreground">{project.applications} applications</p>
                </div>
                <Badge variant={project.status === "Completed" ? "secondary" : "default"}>
                  {project.status}
                </Badge>
              </div>
            ))}
            <Link href="/dashboard/client/projects">
              <Button variant="outline" className="w-full">View All Projects</Button>
            </Link>
          </CardContent>
        </Card>

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
            <Button className="w-full justify-start" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Manage Team
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
