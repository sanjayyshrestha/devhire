"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit2, Mail, Calendar, Camera, Loader2 } from "lucide-react";
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
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    const previewUrl = URL.createObjectURL(file);
    setEditData((prev) => ({ ...prev, logo: previewUrl }));
  };

  const handleSave = async () => {
    try {
      setIsProfileUpdating(true);
      const res = await updateClientProfileData({
        userId: profile.userId,
        bio: editData.bio,
        companyName: editData.companyName,
        logo: selectedFile || editData.logo,
      });

      if (!res.success) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        setProfile(editData);
        setIsEditing(false);
        setSelectedFile(null);
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
    <div className="flex justify-center">
      <div className="w-full max-w-4xl space-y-6 p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Client Profile</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Manage your organization’s profile information
            </p>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
              <Edit2 className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          ) : (
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => setIsEditing(false)}
                variant="outline"
                size="sm"
              >
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isProfileUpdating} size="sm">
                {isProfileUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}
        </div>

        {/* Profile Card */}
        <Card className="overflow-hidden">
          <CardHeader className="border-b bg-muted/30">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Profile Image Upload */}
              <div className="relative group">
                <Avatar className="h-28 w-28 sm:h-32 sm:w-32 border-4 border-background shadow-lg">
                  <AvatarImage src={editData.logo || profile.logo} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-3xl sm:text-4xl">
                    {profile.companyName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                {/* Camera Icon */}
                <label
                  htmlFor="profile-image-upload"
                  className={`absolute bottom-2 right-2 p-2 rounded-full cursor-pointer bg-primary text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md hover:bg-primary/80 ${
                    !isEditing && "hidden"
                  }`}
                >
                  <Camera className="h-4 w-4" />
                </label>

                <input
                  id="profile-image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfileImageChange}
                />

                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
                    <Loader2 className="h-6 w-6 animate-spin text-white" />
                  </div>
                )}
              </div>

              {/* Company Info */}
              <div className="flex-1 w-full text-center sm:text-left space-y-3">
                {!isEditing ? (
                  <>
                    <h2 className="text-xl sm:text-2xl font-bold flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-start gap-2">
                      {profile.companyName}
                      <Badge variant="secondary">Client</Badge>
                    </h2>
                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-sm text-muted-foreground justify-center sm:justify-start">
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
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6 space-y-6">
            {/* About */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-center sm:text-left">
                About Company
              </h3>
              {!isEditing ? (
                <p className="text-muted-foreground text-sm sm:text-base text-center sm:text-left">
                  {profile.bio}
                </p>
              ) : (
                <Textarea
                  value={editData.bio}
                  onChange={(e) =>
                    setEditData({ ...editData, bio: e.target.value })
                  }
                  placeholder="Write something about your company..."
                />
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {userProfileData.user._count.project}
                </div>
                <p className="text-sm text-muted-foreground">Projects Posted</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {userProfileData.activeProject}
                </div>
                <p className="text-sm text-muted-foreground">Active Projects</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
