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
import { createProject, deleteProject, updateProject } from "@/action/client.action";
import { Projects } from "@/app/dashboard/client/projects/page";
import { formatDuration } from "@/lib/formatDuration";
import toast from "react-hot-toast";

function EditProjectForm({ project }: { project: any }) {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [budget, setBudget] = useState(project.budget);
  const [duration, setDuration] = useState(project.duration);
  const [techStack, setTechStack] = useState(project.techStack.join(", "));
  const [isUpdating, setIsUpdating] = useState(false);

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", project.id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("budget", budget.toString());
    formData.append("duration", duration.toString());
    formData.append("techStack", techStack);

    try {
      setIsUpdating(true);
      const res = await updateProject(formData);
      if(res.success){
        return toast.success(res.message)
      }
      toast.error(res.message)
    } catch (err) {
      console.error("Error updating:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <form onSubmit={handleEdit} className="grid gap-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="budget">Budget ($)</Label>
          <Input id="budget" type="number" value={budget} onChange={(e) => setBudget(Number(e.target.value))} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration (days)</Label>
          <Input id="duration" type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tech">Tech Stack</Label>
        <Input id="tech" value={techStack} onChange={(e) => setTechStack(e.target.value)} />
      </div>

      <DialogFooter>
        <Button type="submit" disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Save Changes"}
        </Button>
      </DialogFooter>
    </form>
  );
}


export default function ClientProjects({projects}:{
  projects:Projects
}) {
  const [isDeleting,setIsDeleting]=useState(false);
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
  <div className="flex justify-end gap-2">

    {/* --- VIEW --- */}
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription>{project.description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <p><strong>Budget:</strong> ${project.budget}</p>
          <p><strong>Duration:</strong> {formatDuration(Number(project.duration))}</p>
          <p><strong>Status:</strong> {project.status}</p>
          <div className="flex gap-1 mt-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="secondary">{tech}</Badge>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>

    {/* --- EDIT --- */}
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>Modify your project details below</DialogDescription>
        </DialogHeader>

        <EditProjectForm project={project} />
      </DialogContent>
    </Dialog>

    {/* --- DELETE --- */}
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Project</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{project.title}</strong>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button
            variant="destructive"
            disabled={isDeleting}
            onClick={async () => {
              try {
                setIsDeleting(true)
               const res= await deleteProject(project.id)
                if(res.success){
                  return toast.success(res.message)
                }
              toast.error(res.message)
              } catch (err) {
                console.error("Error deleting project:", err)
              }finally{
                setIsDeleting(false)
              }
            }}
          >
            {isDeleting?"Deleting...":"Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  </div>
</TableCell>

                </TableRow>
              )):(
                <span>No project found</span>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
