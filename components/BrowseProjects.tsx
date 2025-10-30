'use client';
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, Clock, Search, Briefcase } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";
import { DevProjects } from "@/app/dashboard/developer/browse/page";
import { formatDaysAgo } from "@/lib/fomatDaysAgo";
import { applyToProject } from "@/action/developer.action";

export default function BrowseProjects({ devProjects: projects }: { devProjects: DevProjects }) {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  // Controlled form state
  const [cover, setCover] = useState("");
  const [rate, setRate] = useState<number | "">("");
  const [timeline, setTimeline] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApply = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setIsApplyOpen(true);
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
     const formData = new FormData();
    formData.append("cover", cover);
    formData.append("rate", rate.toString());
    formData.append("timeline", timeline);
    formData.append("projectId", selectedProject?.id || "");

    const res = await applyToProject(formData);

    if (res.success) {
      toast.success(res.message);
      setIsApplyOpen(false);
      setCover("");
      setRate("");
      setTimeline("");
    } else {
      toast.error(res.message);
    }
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Browse Projects</h1>
        <p className="text-muted-foreground">Find your next opportunity</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="search" placeholder="Search projects..." className="pl-9" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Budget Range</Label>
              <Input id="budget" placeholder="e.g., $5,000 - $10,000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tech">Tech Stack</Label>
              <Input id="tech" placeholder="e.g., React, Node.js" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => {
          const status=project.application[0]?.status ?? null
          return  <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3" />
                    {project.client.companyName}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {formatDaysAgo(String(project.createdAt))}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">${project.budget}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{project.duration} days</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

<Button
  className="w-full"
  disabled={!!status} // disable only if already applied
  onClick={() => handleApply(project)}
  variant={
    status === "PENDING"
      ? "secondary"
      : status === "REJECTED"
      ? "destructive"
      : status === "ACCEPTED"
      ? "secondary"
      : "default"
  }
>
  {status === "PENDING" && "Applied"}
  {status === "REJECTED" && "Rejected"}
  {status === "ACCEPTED" && "Accepted"}
  {!status && "Apply Now"}
</Button>
            </CardContent>
          </Card>
        })}
      </div>
 
      {/* Apply Dialog */}
      <Dialog open={isApplyOpen} onOpenChange={setIsApplyOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Apply to Project</DialogTitle>
            <DialogDescription>
              {selectedProject?.title} – {selectedProject?.client.companyName}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleApplySubmit} className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="cover">Cover Message</Label>
              <Textarea
                id="cover"
                placeholder="Explain why you're the best fit for this project..."
                rows={5}
                value={cover}
                onChange={(e) => setCover(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rate">Your Expected Rate ($)</Label>
              <Input
                id="rate"
                type="number"
                min={0}
                placeholder="7000"
                value={rate}
                onChange={(e) => setRate(e.target.value === "" ? "" : Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeline">Proposed Timeline (days)</Label>
              <Input
                id="timeline"
                type="number"
                placeholder="60"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsApplyOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
