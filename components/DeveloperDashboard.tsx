import { StatCard } from "@/components/ui/stat-card";
import { Search, FileText, CheckCircle2, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const stats = [
  { title: "Available Projects", value: "156", icon: Search, trend: { value: "+24 new", positive: true } },
  { title: "My Applications", value: "8", icon: FileText },
  { title: "Accepted", value: "3", icon: CheckCircle2, trend: { value: "+2 this month", positive: true } },
  { title: "Success Rate", value: "75%", icon: TrendingUp },
];

const recommendedProjects = [
  {
    id: 1,
    title: "React Dashboard Development",
    client: "TechStart Inc.",
    budget: "$4,000 - $6,000",
    tags: ["React", "TypeScript"],
    matchScore: 95,
  },
  {
    id: 2,
    title: "Node.js API Integration",
    client: "DataFlow Co.",
    budget: "$3,000 - $5,000",
    tags: ["Node.js", "API"],
    matchScore: 88,
  },
];

export default function DeveloperDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Find your next opportunity</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recommended Projects</CardTitle>
            <CardDescription>Based on your skills and experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendedProjects.map((project) => (
              <div key={project.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium">{project.title}</p>
                    <p className="text-sm text-muted-foreground">{project.client}</p>
                  </div>
                  <Badge variant="secondary">{project.matchScore}% match</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <span className="text-sm font-medium">{project.budget}</span>
                </div>
              </div>
            ))}
            <Link href="/dashboard/developer/browse">
              <Button variant="outline" className="w-full">Browse All Projects</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <div className="h-2 w-2 rounded-full bg-green-500 mt-2" />
              <div className="flex-1">
                <p className="text-sm font-medium">Application Accepted</p>
                <p className="text-xs text-muted-foreground">Mobile App MVP - 2 hours ago</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
              <div className="flex-1">
                <p className="text-sm font-medium">New Application Submitted</p>
                <p className="text-xs text-muted-foreground">E-commerce Platform - 1 day ago</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="h-2 w-2 rounded-full bg-purple-500 mt-2" />
              <div className="flex-1">
                <p className="text-sm font-medium">Profile Updated</p>
                <p className="text-xs text-muted-foreground">Added new skills - 3 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
