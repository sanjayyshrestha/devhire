"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit2, Mail, Calendar } from "lucide-react";
import { ClientProfileData } from "@/app/dashboard/client/profile/page";
import { updateClientProfileData } from "@/action/client.action";
import toast from "react-hot-toast";

export default function ClientProfile({
  userProfileData,
}: {
  userProfileData: ClientProfileData;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isProfileUpdating, setIsProfileUpdating] = useState(false);

  // ✅ Safely handle nullable user
  const baseProfile = userProfileData?.user
    ? {
        companyName: userProfileData.user.companyName || "",
        email: userProfileData.user.user?.email || "",
        bio:
          userProfileData.user.bio ||
          "We’re always looking for talented developers to join exciting projects.",
        logo: userProfileData.user.logo || "",
        joinedDate: new Date(
          userProfileData.user.user?.createdAt || new Date()
        ).toLocaleDateString("en-US", { month: "long", year: "numeric" }),
        role: userProfileData.user.user?.role || "client",
        userId: userProfileData.user.user?.id || "",
      }
    : {
        companyName: "",
        email: "",
        bio: "",
        logo: "",
        joinedDate: "",
        role: "",
        userId: "",
      };

  const [profile, setProfile] = useState(baseProfile);
  const [editData, setEditData] = useState(baseProfile);

  useEffect(() => {
    if (userProfileData?.user) {
      setProfile(baseProfile);
      setEditData(baseProfile);
    }
  }, [userProfileData]);

  const handleSave = async () => {
    try {
      setIsProfileUpdating(true);
      const res = await updateClientProfileData({
        userId: profile.userId,
        bio: editData.bio,
        companyName: editData.companyName,
        logo: editData.logo,
      });

      if (!res.success) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        setProfile(editData);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating client profile:", error);
      toast.error("Something went wrong while updating.");
    } finally {
      setIsProfileUpdating(false);
    }
  };

  if (!userProfileData?.user) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        No profile data available.
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="flex-1 max-w-4xl mx-auto space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Client Profile</h1>
            <p className="text-muted-foreground">
              Manage your organization’s profile information
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
              <Button onClick={handleSave} disabled={isProfileUpdating}>
                {isProfileUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}
        </div>

        {/* Profile Card */}
        {/* TODO:ADD A FEATURE TO UPDATE CLIENT PROFILE IMAGE  */}
        <Card>
          <CardHeader className="border-b bg-muted/30">
            <div className="flex items-start gap-6">
              <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                <AvatarImage src={profile.logo} />
                <AvatarFallback className="bg-primary text-primary-foreground text-4xl">
                  {profile.companyName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-3">
                {!isEditing ? (
                  <>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      {profile.companyName}
                      <Badge variant="secondary">Client</Badge>
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
                      value={editData.companyName}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          companyName: e.target.value,
                        })
                      }
                      placeholder="Company Name"
                    />
                  </>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">About Company</h3>
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

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{userProfileData.user._count.project}</div>
                <p className="text-sm text-muted-foreground">Projects Posted</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{userProfileData.activeProject}</div>
                <p className="text-sm text-muted-foreground">Active Projects</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
