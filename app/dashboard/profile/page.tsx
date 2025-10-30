// app/dashboard/developer/profile/page.tsx

import { getProfileData, getUserId } from '@/action/user.action'
import ProfilePage from '@/components/Profile';
// Import the Client Component

import React from 'react'

// --- 1. Define the Developer Return Type (The Source of Truth) ---
export type DeveloperProfileData = {
  id: string;
  role: "DEVELOPER";
  name: string;
  bio: string;
  avatar: string;
  skills: string[];
  email: string;
  joinedDate: string;
}

// --- 2. Define the Client Return Type (The Source of Truth) ---
export type ClientProfileData = {
  id: string;
  role: "CLIENT";
  companyName: string;
  bio: string;
  logo: string;
  email: string;
  joinedDate: string;
}

// --- 3. Union Type for the Frontend Component ---
export type ProfileData = DeveloperProfileData | ClientProfileData | null; 

const ProfileServerPage = async () => {
  // Assuming these are server actions
  const userId = await getUserId();
  const profile: ProfileData = await getProfileData(userId); 
  
  if (!profile) {
    // Graceful handling if profile doesn't exist
    return <div>Error: Profile data could not be loaded or found.</div> 
  }

  // Passing the fetched data to the Client Component
  return (
    // Note: The file name is 'Profile.tsx', so the component is 'ProfilePage'
    <ProfilePage profile={profile} /> 
  )
}

export default ProfileServerPage;