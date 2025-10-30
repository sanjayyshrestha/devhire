'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";
import { getRole, getUserId } from "./user.action";

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