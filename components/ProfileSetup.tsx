"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, X, Code } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "react-hot-toast";
import { saveUserProfile } from "@/action/user.action";

type Role = "client" | "developer";

export default function ProfileSetup() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = (searchParams.get("role") as Role) || "client";
  const userId = searchParams.get("userId");

  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    bio: "",
    avatar: "",
    logo: "",
    skills: [] as string[],
  });
  const [currentSkill, setCurrentSkill] = useState("");
  const [progress, setProgress] = useState(33);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    updateProgress();
  }, [formData]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (role === "client") {
        setFormData(prev => ({ ...prev, logo: reader.result as string }));
      } else {
        setFormData(prev => ({ ...prev, avatar: reader.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  const addSkill = () => {
    const skill = currentSkill.trim();
    if (!skill || formData.skills.includes(skill)) return;
    setFormData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
    setCurrentSkill("");
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill),
    }));
  };

  const updateProgress = () => {
    let completed = 33;
    const nameField = role === "client" ? formData.companyName : formData.name;
    const imageField = role === "client" ? formData.logo : formData.avatar;
    if (nameField) completed += 22;
    if (formData.bio) completed += 22;
    if (imageField) completed += 23;
    setProgress(completed);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return toast.error("User ID missing.");

    setIsSubmitting(true);

    try {
      const submission = new FormData();
      submission.append("userId", userId);
      submission.append("role", role);
      submission.append("bio", formData.bio);
      if (role === "developer") {
        submission.append("name", formData.name);
        submission.append("avatar", formData.avatar);
        submission.append("skills", formData.skills.join(","));
      } else {
        submission.append("companyName", formData.companyName);
        submission.append("logo", formData.logo);
      }

      const result = await saveUserProfile(submission);

      if (result.success) {
        toast.success(result.message);
        router.push(`/dashboard/${role}`);
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to save profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 mb-4">
            <Code className="h-8 w-8 text-primary" />
            <span className="font-bold text-2xl">DevHire</span>
          </div>
          <h1 className="text-3xl font-bold">Complete Your Profile</h1>
          <p className="text-muted-foreground">
            Tell us about yourself to get started as a {role}
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Profile Setup</CardTitle>
                <CardDescription>Fill in your information below</CardDescription>
              </div>
              <Badge variant="outline" className="capitalize">
                {role}
              </Badge>
            </div>
            <Progress value={progress} className="mt-4" />
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Image */}
              <div className="space-y-2">
                <Label>{role === "client" ? "Company Logo" : "Profile Image"}</Label>
                <div className="flex items-center gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={role === "client" ? formData.logo : formData.avatar}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                      {(
                        role === "client" ? formData.companyName : formData.name
                      ).charAt(0).toUpperCase() || "?"}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <Label htmlFor="image-upload" className="cursor-pointer">
                      <div className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-muted transition-colors">
                        <Upload className="h-4 w-4" />
                        <span>Upload Image</span>
                      </div>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </Label>
                    <p className="text-xs text-muted-foreground mt-2">
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Name / Company */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  {role === "client" ? "Company Name *" : "Full Name *"}
                </Label>
                <Input
                  id="name"
                  placeholder={role === "client" ? "Acme Inc." : "John Doe"}
                  value={role === "client" ? formData.companyName : formData.name}
                  onChange={(e) =>
                    role === "client"
                      ? setFormData(prev => ({ ...prev, companyName: e.target.value }))
                      : setFormData(prev => ({ ...prev, name: e.target.value }))
                  }
                  required
                />
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Bio *</Label>
                <Textarea
                  id="bio"
                  placeholder={
                    role === "developer"
                      ? "Tell clients about your experience, expertise, and what makes you unique..."
                      : "Tell developers about your company and the types of projects you work on..."
                  }
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  rows={4}
                  required
                />
              </div>

              {/* Skills (Developer Only) */}
              {role === "developer" && (
                <div className="space-y-2">
                  <Label htmlFor="skills">Skills</Label>
                  <div className="flex gap-2">
                    <Input
                      id="skills"
                      placeholder="e.g., React, Node.js, Python"
                      value={currentSkill}
                      onChange={(e) => setCurrentSkill(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addSkill();
                        }
                      }}
                    />
                    <Button type="button" onClick={addSkill} variant="secondary">
                      Add
                    </Button>
                  </div>
                  {formData.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.skills.map(skill => (
                        <Badge key={skill} variant="secondary" className="px-3 py-1">
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="ml-2 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">
                  Back
                </Button>
                <Button type="submit" className="flex-1" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Complete Setup"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
