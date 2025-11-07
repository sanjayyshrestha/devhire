"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit2, Mail, Calendar, X } from "lucide-react";
import { DeveloperProfileData } from "@/app/dashboard/developer/profile/page";
import { updateDeveloperProfileData } from "@/action/developer.action";
import toast from "react-hot-toast";

export default function DeveloperProfile({
  userProfileData,
}: {
  userProfileData: DeveloperProfileData;
}) {
  const [isEditing, setIsEditing] = useState(false);

  // 🧩 Safely extract data from possibly null userProfileData
  const baseProfile = userProfileData
    ? {
        name: userProfileData.name || "",
        email: userProfileData.user?.email || "",
        bio:
          userProfileData.bio ||
          "Full-stack developer passionate about building scalable applications.",
        avatar: userProfileData.avatar || "",
        skills: userProfileData.skills || [],
       
        joinedDate: new Date(
          userProfileData.user?.createdAt || new Date()
        ).toLocaleDateString("en-US", { month: "long", year: "numeric" }),
        role: userProfileData.user?.role || "developer",
        applications: userProfileData._count?.application || 0,
        hired: userProfileData._count?.hiredProjects || 0,
      }
    : {
        name: "",
        email: "",
        bio: "",
        avatar: "",
        skills: [],
  
        joinedDate: "",
        role: "",
        applications: 0,
        hired: 0,
      };

  const [profile, setProfile] = useState(baseProfile);
  const [editData, setEditData] = useState(baseProfile);
  const [currentSkill, setCurrentSkill] = useState("");
  const [isUpdating,setIsUpdating]=useState(false)
  // Update UI when DB data changes
  useEffect(() => {
    if (userProfileData) {
      setProfile(baseProfile);
      setEditData(baseProfile);
    }
  }, [userProfileData]);

const handleSave = async () => {
    if (!userProfileData?.user?.id) return;
    try {
      setIsUpdating(true);
      const res = await updateDeveloperProfileData({
        userId: userProfileData.user.id,
        name: editData.name,
        bio: editData.bio,
        avatar: editData.avatar,
        skills: editData.skills,
      });

      if (!res.success) {
        toast.error(res.message || "Failed to update profile");
        return;
      }

      toast.success(res.message || "Profile updated successfully");
      setProfile(editData);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error("Error updating profile");
    } finally {
      setIsUpdating(false);
    }
  };

  const addSkill = () => {
    if (currentSkill.trim() && !editData.skills.includes(currentSkill.trim())) {
      setEditData({
        ...editData,
        skills: [...editData.skills, currentSkill.trim()],
      });
      setCurrentSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setEditData({
      ...editData,
      skills: editData.skills.filter((s) => s !== skill),
    });
  };

  return (
    <div className="flex">
      <div className="flex-1 max-w-4xl mx-auto space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Developer Profile</h1>
            <p className="text-muted-foreground">
              Manage your public developer information
            </p>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} variant="outline">
              <Edit2 className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={() => setIsEditing(false)} variant="outline">
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isUpdating} >{isUpdating?"Saving...":"Save Changes"}</Button>
            </div>
          )}
        </div>

        {/* Profile Card */}
        <Card>
          <CardHeader className="border-b bg-muted/30">
            <div className="flex items-start gap-6">
              <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                <AvatarImage src={profile.avatar} />
                <AvatarFallback className="bg-primary text-primary-foreground text-4xl">
                  {profile.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-3">
                {!isEditing ? (
                  <>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      {profile.name}
                      <Badge variant="secondary">Developer</Badge>
                    </h2>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <Mail className="h-4 w-4" /> {profile.email}
                      </span>
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" /> Joined{" "}
                        {profile.joinedDate}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <Input
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                      placeholder="Full Name"
                    />
                   
                  </>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6 space-y-6">
            {/* About Section */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">About</h3>
              {!isEditing ? (
                <p className="text-muted-foreground">{profile.bio}</p>
              ) : (
                <Textarea
                  value={editData.bio}
                  onChange={(e) =>
                    setEditData({ ...editData, bio: e.target.value })
                  }
                />
              )}
            </div>

            {/* Skills Section */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Skills</h3>
              {!isEditing ? (
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              ) : (
                <>
                  <div className="flex gap-2">
                    <Input
                      value={currentSkill}
                      onChange={(e) => setCurrentSkill(e.target.value)}
                      placeholder="Add a skill"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addSkill();
                        }
                      }}
                    />
                    <Button onClick={addSkill} variant="secondary">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {editData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
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
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {profile.applications}
                </div>
                <p className="text-sm text-muted-foreground">Applications</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {profile.hired}
                </div>
                <p className="text-sm text-muted-foreground">Hired</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
