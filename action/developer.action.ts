'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";
import { getRole, getUserId } from "./user.action";
interface UpdateDeveloperProfileInput {
  userId: string;
  name?: string;
  bio?: string;
  avatar?: string;
  skills?: string[];
}

export async function getProjectsForDev(){
  const userId=await getUserId();
  const projects=await prisma.project.findMany({
    where:{hiredDevId:null},
    include:{
      client:{
        select:{
          companyName:true
        }
      },
      application:{
        where:{developerId:userId},
        select:{
          id:true,
          status:true
        }
      }
    }
  })

  return projects;
}

export async function applyToProject(formData: FormData) {
  const role = await getRole();
  const userId = await getUserId();

  if (role !== "DEVELOPER") {
    throw new Error("Unauthorized");
  }

  try {
    const cover = formData.get("cover") as string;
    const rate = Number(formData.get("rate"));
    const timeline = formData.get("timeline") as string;
    const projectId = formData.get("projectId") as string;

    if (!cover || !rate || !timeline || !projectId) {
      return {
        success: false,
        message: "All fields are required",
      };
    }

    // Create application in Prisma
    const newApplication = await prisma.application.create({
      data: {
        message:cover,
        expectedPay:rate,
        proposedTimeline:Number(timeline),
        projectId,
        developerId: userId,
      },
    });

    // Optional: refresh the developer's browse page
    revalidatePath("/dashboard/developer/browse");

    return {
      success: true,
      message: "Application submitted successfully",
      applicationId: newApplication.id,
    };
  } catch (error) {
    console.error("Error applying to project:", error);
    return {
      success: false,
      message: "Failed to apply for project",
    };
  }
}

export async function getMyAppliedProjects(){
  const userId=await getUserId();
 const applications= await prisma.application.findMany({
  where:{developerId:userId},
  include:{
    project:{
      select:{
        title:true,
        client:{
          select:{
            companyName:true
          }
        }
      },
    
    },

  }
  })

  return applications;
}

export async function getDeveloperProfileData(userId:string){

  
  const user= await prisma.developer.findUnique({
    where:{userId},
    include:{
      user:true,
      _count:{
        select:{
          application:true,
          hiredProjects:true
        }
      }
    }
  })

  return user;
 
}


export async function updateDeveloperProfileData(input: UpdateDeveloperProfileInput) {
  try {
    if (!input.userId) {
      return { success: false, message: "User ID is required" };
    }

    const updated = await prisma.developer.update({
      where: { userId: input.userId },
      data: {
        name: input.name,
        bio: input.bio,
        avatar: input.avatar,
        skills: input.skills,
      },
    });

    return { success: true, message: "Profile updated successfully", data: updated };
  } catch (error: any) {
    console.error("Failed to update developer profile:", error);
    return { success: false, message: error?.message || "Server error" };
  }
}