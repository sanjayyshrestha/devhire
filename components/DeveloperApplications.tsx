import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Calendar, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppliedProject } from "@/app/dashboard/developer/applications/page";
import { formatDaysAgo } from "@/lib/fomatDaysAgo";
import { formatDuration } from "@/lib/formatDuration";

const applications = [
  {
    id: 1,
    project: "E-commerce Platform Redesign",
    client: "TechCorp Inc.",
    appliedDate: "2 days ago",
    status: "pending",
    proposedRate: "$6,500",
    timeline: "2.5 months",
  },
  {
    id: 2,
    project: "Mobile App MVP",
    client: "StartupXYZ",
    appliedDate: "5 days ago",
    status: "accepted",
    proposedRate: "$9,500",
    timeline: "3 months",
  },
  {
    id: 3,
    project: "API Integration",
    client: "DataFlow Co.",
    appliedDate: "1 week ago",
    status: "rejected",
    proposedRate: "$3,200",
    timeline: "1 month",
  },
  {
    id: 4,
    project: "WordPress Plugin Development",
    client: "Digital Agency Co.",
    appliedDate: "3 days ago",
    status: "pending",
    proposedRate: "$3,000",
    timeline: "1 month",
  },
];

export default function DeveloperApplications({applications}:{
  applications:AppliedProject
}) {
  const pendingApps = applications.filter((app) => app.status === "PENDING");
  const acceptedApps = applications.filter((app) => app.status === "ACCEPTED");
  const rejectedApps = applications.filter((app) => app.status === "REJECTED");

  const ApplicationCard = ({ app }: { app: typeof applications[0] }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg">{app.project.title}</h3>
            <p className="text-sm text-muted-foreground">{app.project.client.companyName}</p>
          </div>
          <Badge
            variant={
              app.status === "ACCEPTED"
                ? "default"
                : app.status === "PENDING"
                  ? "secondary"
                  : "outline"
            }
          >
            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
          </Badge>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              <span className="text-xs">Proposed Rate</span>
            </div>
            <p className="font-semibold">{app.expectedPay}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-xs">Timeline</span>
            </div>
            <p className="font-semibold">{formatDuration(app.proposedTimeline)}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span className="text-xs">Applied</span>
            </div>
            <p className="font-semibold">{formatDaysAgo(app.createdAt.toString())}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Applications</h1>
        <p className="text-muted-foreground">Track your project applications</p>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">
            All
            <Badge variant="secondary" className="ml-2">
              {applications.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending
            {pendingApps.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {pendingApps.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="accepted">Accepted</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {applications.map((app) => (
            <ApplicationCard key={app.id} app={app} />
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {pendingApps.length > 0 ? (
            pendingApps.map((app) => <ApplicationCard key={app.id} app={app} />)
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No pending applications</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="accepted" className="space-y-4">
          {acceptedApps.length > 0 ? (
            acceptedApps.map((app) => <ApplicationCard key={app.id} app={app} />)
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No accepted applications yet</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {rejectedApps.length > 0 ? (
            rejectedApps.map((app) => <ApplicationCard key={app.id} app={app} />)
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No rejected applications</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
