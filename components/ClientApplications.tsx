import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Check, X, Star, DollarSign } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const applications = [
  {
    id: 1,
    project: "E-commerce Platform Redesign",
    developer: {
      name: "Sarah Johnson",
      initials: "SJ",
      rating: 4.9,
      completedProjects: 48,
    },
    coverMessage: "I have 5+ years of experience building e-commerce platforms with React and Node.js...",
    expectedRate: "$6,500",
    status: "pending",
  },
  {
    id: 2,
    project: "E-commerce Platform Redesign",
    developer: {
      name: "Michael Chen",
      initials: "MC",
      rating: 4.8,
      completedProjects: 32,
    },
    coverMessage: "Full-stack developer specializing in scalable e-commerce solutions...",
    expectedRate: "$7,000",
    status: "pending",
  },
  {
    id: 3,
    project: "Mobile App MVP",
    developer: {
      name: "Emily Davis",
      initials: "ED",
      rating: 5.0,
      completedProjects: 25,
    },
    coverMessage: "Expert in React Native with a proven track record of successful MVPs...",
    expectedRate: "$9,500",
    status: "accepted",
  },
];

export default function ClientApplications() {
  const pendingApps = applications.filter((app) => app.status === "pending");
  const acceptedApps = applications.filter((app) => app.status === "accepted");
  const rejectedApps = applications.filter((app) => app.status === "rejected");

  const ApplicationCard = ({ app }: { app: typeof applications[0] }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {app.developer.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-3">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{app.developer.name}</h3>
                  <p className="text-sm text-muted-foreground">Applied to: {app.project}</p>
                </div>
                {app.status === "pending" && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="default">
                      <Check className="h-4 w-4 mr-1" />
                      Accept
                    </Button>
                    <Button size="sm" variant="outline">
                      <X className="h-4 w-4 mr-1" />
                      Decline
                    </Button>
                  </div>
                )}
                {app.status === "accepted" && <Badge>Accepted</Badge>}
                {app.status === "rejected" && <Badge variant="secondary">Rejected</Badge>}
              </div>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{app.developer.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {app.developer.completedProjects} projects completed
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm">{app.coverMessage}</p>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold">{app.expectedRate}</span>
                <span className="text-sm text-muted-foreground">expected rate</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Applications</h1>
        <p className="text-muted-foreground">Review and manage developer applications</p>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
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
