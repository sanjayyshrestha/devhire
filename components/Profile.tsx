// app/dashboard/developer/profile/Profile.tsx

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Edit2, Mail, Calendar, X } from "lucide-react";

import DashboardLayout from "@/app/dashboard/developer/layout";
import {
  ClientProfileData,
  DeveloperProfileData,
  ProfileData,
} from "@/app/dashboard/profile/page";


type FullProfileState = {
  id: string;
  role: "DEVELOPER" | "CLIENT";
  email: string;
  joinedDate: string;
  bio: string;
  // Developer fields (nullable for Client)
  name: string | null;
  avatar: string | null;
  skills: string[] | null;
  // Client fields (nullable for Developer)
  companyName: string | null;
  logo: string | null;
};

interface ProfileProps {
  // The component expects a non-null union type from the server component
  profile: Exclude<ProfileData, null>;
}

// Renamed to ProfilePage to match standard component naming for the file 'Profile.tsx'
export default function ProfilePage({ profile: initialProfile }: ProfileProps) {
  // --- State Initialization Helper ---
  const getInitialState = (p: Exclude<ProfileData, null>): FullProfileState => {
    const base = {
      id: p.id,
      role: p.role,
      email: p.email,
      joinedDate: p.joinedDate,
      // Ensure bio is handled defensively, but the type system ensures it's always there
      bio: p.bio,
    };

    if (p.role === "DEVELOPER") {
      const devP = p as DeveloperProfileData;
      return {
        ...base,
        name: devP.name ?? null,
        avatar: devP.avatar ?? null,
        skills: devP.skills ?? [],
        companyName: null,
        logo: null,
      };
    } else {
      // CLIENT
      const clientP = p as ClientProfileData;
      return {
        ...base,
        companyName: clientP.companyName ?? null,
        logo: clientP.logo ?? null,
        name: null,
        avatar: null,
        skills: null,
      };
    }
  };

  const [profile, setProfile] = useState<FullProfileState>(
    getInitialState(initialProfile)
  );
  const [editData, setEditData] = useState<FullProfileState>(profile);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSkill, setCurrentSkill] = useState("");

  const handleSave = () => {
    // This is where you'd call your API action to save the changes
    setProfile(editData);
    setIsEditing(false);
    console.log("Saved profile:", editData);
    // TODO: call your API to update profile in DB
  };

  const addSkill = () => {
    const skill = currentSkill.trim();
    // Check if skills is null/undefined before spreading
    if (skill && !(editData.skills ?? []).includes(skill)) {
      setEditData({ ...editData, skills: [...(editData.skills ?? []), skill] });
      setCurrentSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setEditData({
      ...editData,
      skills: (editData.skills ?? []).filter((s) => s !== skill),
    });
  };

  const isDeveloper = profile.role === "DEVELOPER";

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-muted-foreground">
              Manage your public profile information
            </p>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} variant="outline">
              <Edit2 className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={() => setIsEditing(false)} variant="outline">
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          )}
        </div>

        {/* Profile Card */}
        <Card>
          <CardHeader className="border-b bg-muted/30">
            <div className="flex items-start gap-6">
              <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                <AvatarImage
                  // Use nullish coalescing to safely access avatar/logo
                  src={isDeveloper ? profile.avatar ?? "" : profile.logo ?? ""}
                />
                <AvatarFallback className="bg-primary text-primary-foreground text-4xl">
                  {(isDeveloper
                    ? profile.name ?? "U"
                    : profile.companyName ?? "C"
                  )
                    .charAt(0)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                {!isEditing ? (
                  <>
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-bold">
                        {/* Safely display name/companyName */}
                        {isDeveloper ? profile.name : profile.companyName}
                      </h2>
                      <Badge variant="secondary" className="capitalize">
                        {profile.role.toLowerCase()}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {profile.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Joined{" "}
                        {new Date(profile.joinedDate).toLocaleDateString()}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    <Input
                      // Ensure value is a string for the Input component
                      value={
                        isDeveloper
                          ? editData.name ?? ""
                          : editData.companyName ?? ""
                      }
                      onChange={(e) =>
                        isDeveloper
                          ? setEditData({ ...editData, name: e.target.value })
                          : setEditData({
                              ...editData,
                              companyName: e.target.value,
                            })
                      }
                      placeholder={isDeveloper ? "Full Name" : "Company Name"}
                    />
                  </div>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6 space-y-6">
            {/* Bio */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">About</h3>
              {!isEditing ? (
                <p className="text-muted-foreground leading-relaxed">
                  {profile.bio}
                </p>
              ) : (
                <Textarea
                  value={editData.bio ?? ""}
                  onChange={(e) =>
                    setEditData({ ...editData, bio: e.target.value })
                  }
                  rows={4}
                  placeholder="Tell us about yourself..."
                />
              )}
            </div>

            {/* Skills */}
            {isDeveloper && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Skills</h3>
                {!isEditing ? (
                  <div className="flex flex-wrap gap-2">
                    {(profile.skills ?? []).map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="px-3 py-1 text-sm"
                      >
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
                      <Button
                        type="button"
                        onClick={addSkill}
                        variant="secondary"
                      >
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {/* We rely on editData.skills being an array here */}
                      {(editData.skills ?? []).map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="px-3 py-1"
                        >
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
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
