"use client";

import { StatCard } from "@/components/ui/stat-card";
import { Users, FolderKanban, CheckCircle2, DollarSign } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { AdminDashboardProps } from "@/app/dashboard/admin/page";

export default function AdminDashboard({
  data,
}: {
  data: AdminDashboardProps;
}) {
  const {
    totalUsers,
    totalActiveProjects,
    totalHiredDevs,
    adminCount,
    clientCount,
    developerCount,
    monthlyProjectData: projectData,
  } = data;
  const stats = [
    { title: "Total Users", value: totalUsers, icon: Users },
    {
      title: "Active Projects",
      value: totalActiveProjects,
      icon: FolderKanban,
    },
    { title: "Completed Hires", value: totalHiredDevs, icon: CheckCircle2 },
  ];

  const userTypeData = [
    { name: "Clients", value: clientCount, color: "hsl(var(--primary))" },
    { name: "Developers", value: developerCount, color: "hsl(var(--accent))" },
    {
      name: "Admins",
      value: adminCount,
      color: "hsl(var(--muted-foreground))",
    },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Platform overview and analytics</p>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Projects Over Time</CardTitle>
            <CardDescription>Monthly project postings</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="projects" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
            <CardDescription>Users by role type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${((percent as number) * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="hsl(var(--primary))"
                  dataKey="value"
                >
                  {userTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
