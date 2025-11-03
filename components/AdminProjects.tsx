

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminProject } from "@/app/dashboard/admin/projects/page";
import { formatReadableDate } from "@/lib/formatReadableDate";

const projects = [
  {
    id: 1,
    title: "E-commerce Platform Redesign",
    client: "TechCorp Inc.",
    budget: "$5,000 - $8,000",
    status: "Active",
    applications: 12,
    postedDate: "Jan 20, 2025",
  },
  {
    id: 2,
    title: "Mobile App Development",
    client: "StartupXYZ",
    budget: "$10,000 - $15,000",
    status: "In Progress",
    applications: 8,
    postedDate: "Jan 18, 2025",
  },
  {
    id: 3,
    title: "AI Integration for SaaS",
    client: "InnovateLabs",
    budget: "$8,000 - $12,000",
    status: "Active",
    applications: 15,
    postedDate: "Jan 17, 2025",
  },
  {
    id: 4,
    title: "API Integration",
    client: "DataFlow Co.",
    budget: "$3,000",
    status: "Completed",
    applications: 10,
    postedDate: "Jan 15, 2025",
  },
];

export default function AdminProjects({projects}:{
  projects:AdminProject
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Project Management</h1>
        <p className="text-muted-foreground">View and manage all platform projects</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Projects</CardTitle>
              <CardDescription>Overview of project listings</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search projects..." className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applications</TableHead>
                <TableHead>Posted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>{project.client.companyName}</TableCell>
                  <TableCell>${project.budget}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        project.status === "ACTIVE"
                          ? "default"
                          : project.status === "COMPLETED"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{project._count.application}</TableCell>
                  <TableCell>{formatReadableDate(project.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
