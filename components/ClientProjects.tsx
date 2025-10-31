'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, DollarSign, Clock, Eye, Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createProject } from "@/action/client.action";
import { Projects } from "@/app/dashboard/client/projects/page";
import { formatDuration } from "@/lib/formatDuration";



export default function ClientProjects({projects}:{
  projects:Projects
}) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState<number | "">("");
  const [duration, setDuration] = useState<number | "">("");
  const [techStack, setTechStack] = useState("");
  const [isCreatingProject,setIsCreatingProject]=useState(false);
  const handleSubmit=async(e:React.FormEvent)=>{
  
  e.preventDefault();

  // Create FormData from state
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("budget", budget.toString());
  formData.append("duration", duration.toString());
  formData.append("techStack", techStack);

  try {
    setIsCreatingProject(true)
    const res = await createProject(formData);

    if (res.success) {
      console.log("Project created:", res.project);
      // Optional: reset form fields
      setTitle("");
      setDescription("");
      setBudget("");
      setDuration("");
      setTechStack("");
      setIsCreateOpen(false);
    } else {
      console.error("Failed to create project:", res.message);
      // Optional: show toast or alert
    }
  } catch (error) {
    console.error("Error submitting project:", error);
  }finally{
    setIsCreatingProject(false)
  }
};

  

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Projects</h1>
          <p className="text-muted-foreground">Manage and track all your project postings</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>Post a new project to find the right developer</DialogDescription>
            </DialogHeader>
           <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="title">Project Title</Label>
        <Input
          id="title"
          placeholder="E-commerce Platform Development"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          rows={4}
          placeholder="Describe your project..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="budget">Budget ($)</Label>
          <Input
            id="budget"
            type="number"
            min={0}
            placeholder="5000"
            value={budget}
            onChange={(e) => setBudget(e.target.value === "" ? "" : Number(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration (days)</Label>
          <Input
            id="duration"
            type="number"
            min={1}
            placeholder="90"
            value={duration}
            onChange={(e) => setDuration(e.target.value === "" ? "" : Number(e.target.value))}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tech">Tech Stack (comma separated)</Label>
        <Input
          id="tech"
          placeholder="React, Node.js, MongoDB"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
        />
      </div>

      <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isCreatingProject}>{isCreatingProject?"Posting...":"Post Project"}</Button>
            </DialogFooter>
    </form>
            
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
          <CardDescription>View and manage your project listings</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applications</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects?projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{project.title}</p>
                      <div className="flex gap-1 mt-1">
                        {project.techStack.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      {project.budget}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                     {formatDuration(Number(project.duration))}
                    </div>
                  </TableCell>
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
                  <TableCell>{project._count.application} received</TableCell>
                  <TableCell className="text-right">
                    {/* TODO:CREATE A ACTION FOR VIEW,EDIT AND DELETE  */}
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )):(
                <div>No project found</div>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
