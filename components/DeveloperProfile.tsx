'use client';

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit2, Mail, Calendar, X, Camera } from "lucide-react";
import { DeveloperProfileData } from "@/app/dashboard/developer/profile/page";
import { updateDeveloperProfileData } from "@/action/developer.action";
import toast from "react-hot-toast";

export default function DeveloperProfile({ userProfileData }: { userProfileData: DeveloperProfileData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [editData, setEditData] = useState<any>(null);
  const [currentSkill, setCurrentSkill] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const baseProfile = userProfileData
    ? {
        name: userProfileData.name || "",
        email: userProfileData.user?.email || "",
        bio: userProfileData.bio || "Full-stack developer passionate about building scalable applications.",
        avatar: userProfileData.avatar || "",
        skills: userProfileData.skills || [],
        joinedDate: new Date(userProfileData.user?.createdAt || new Date()).toLocaleDateString("en-US", { month: "long", year: "numeric" }),
        role: userProfileData.user?.role || "developer",
        applications: userProfileData._count?.application || 0,
        hired: userProfileData._count?.hiredProjects || 0,
      }
    : { name: "", email: "", bio: "", avatar: "", skills: [], joinedDate: "", role: "", applications: 0, hired: 0 };

  useEffect(() => {
    if (userProfileData) {
      setProfile(baseProfile);
      setEditData(baseProfile);
    }
  }, [userProfileData]);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    const previewUrl = URL.createObjectURL(file);
    setEditData((prev: any) => ({ ...prev, avatar: previewUrl }));
  };

  const handleSave = async () => {
    if (!userProfileData?.user?.id) return;
    try {
      setIsUpdating(true);
      const res = await updateDeveloperProfileData({
        userId: userProfileData.user.id,
        name: editData.name,
        bio: editData.bio,
        avatar: selectedFile || editData.avatar,
        skills: editData.skills,
      });
      if (!res.success) {
        toast.error(res.message || "Failed to update profile");
        return;
      }
      toast.success(res.message || "Profile updated successfully");
      setProfile(editData);
      setIsEditing(false);
      setSelectedFile(null);
    } catch (err) {
      console.error(err);
      toast.error("Error updating profile");
    } finally {
      setIsUpdating(false);
    }
  };

  const addSkill = () => {
    if (currentSkill.trim() && !editData.skills.includes(currentSkill.trim())) {
      setEditData({ ...editData, skills: [...editData.skills, currentSkill.trim()] });
      setCurrentSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setEditData({ ...editData, skills: editData.skills.filter((s: string) => s !== skill) });
  };

  if (!profile) return <div className="p-6 text-center text-muted-foreground">No profile data available.</div>;

  return (
    <div className="flex justify-center">
      <div className="flex-1 max-w-4xl w-full space-y-6 p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Developer Profile</h1>
            <p className="text-muted-foreground">Manage your public developer information</p>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} variant="outline">
              <Edit2 className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={() => setIsEditing(false)} variant="outline">Cancel</Button>
              <Button onClick={handleSave} disabled={isUpdating}>{isUpdating ? "Saving..." : "Save Changes"}</Button>
            </div>
          )}
        </div>

        {/* Profile Card */}
        <Card>
          <CardHeader className="border-b bg-muted/30">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar */}
              <div className="relative group">
                <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-background shadow-lg">
                  <AvatarImage src={editData.avatar || profile.avatar} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-4xl">{profile.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                {isEditing && (
                  <>
                    <label htmlFor="profile-image-upload" className="absolute bottom-2 right-2 p-2 rounded-full cursor-pointer bg-primary text-primary-foreground shadow-md hover:bg-primary/80">
                      <Camera className="h-4 w-4" />
                    </label>
                    <input id="profile-image-upload" type="file" accept="image/*" className="hidden" onChange={handleProfileImageChange} />
                  </>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 space-y-3 w-full">
                {!isEditing ? (
                  <>
                    <h2 className="text-2xl font-bold flex flex-wrap items-center gap-2">
                      {profile.name} <Badge variant="secondary">Developer</Badge>
                    </h2>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-2"><Mail className="h-4 w-4" /> {profile.email}</span>
                      <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Joined {profile.joinedDate}</span>
                    </div>
                  </>
                ) : (
                  <Input value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} placeholder="Full Name" />
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6 space-y-6">
            {/* About */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">About</h3>
              {!isEditing ? (
                <p className="text-muted-foreground wrap-break-word">{profile.bio}</p>
              ) : (
                <Textarea value={editData.bio} onChange={(e) => setEditData({ ...editData, bio: e.target.value })} />
              )}
            </div>

            {/* Skills */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Skills</h3>
              {!isEditing ? (
                <div className="flex flex-wrap gap-2">{profile.skills.map((skill:string) => <Badge key={skill} variant="secondary">{skill}</Badge>)}</div>
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <Input value={currentSkill} onChange={(e) => setCurrentSkill(e.target.value)} placeholder="Add a skill" onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())} className="flex-1" />
                    <Button onClick={addSkill} variant="secondary" className="whitespace-nowrap">Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">{editData.skills.map((skill:string) => (
                    <Badge key={skill} variant="secondary" className="flex items-center">
                      {skill} <button type="button" onClick={() => removeSkill(skill)} className="ml-1 hover:text-destructive"><X className="h-3 w-3" /></button>
                    </Badge>
                  ))}</div>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{profile.applications}</div>
                <p className="text-sm text-muted-foreground">Applications</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{profile.hired}</div>
                <p className="text-sm text-muted-foreground">Hired</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
