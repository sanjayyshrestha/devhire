'use server'

import { prisma } from "@/lib/prisma";
import { getRole, getUser, getUserId } from "./user.action"
import { revalidatePath } from "next/cache";


export async function createProject(formData:FormData){
  const role=await getRole();
  if(role!=='CLIENT') throw new Error("Unauthorized");
  const clientId=await getUserId()
  if (!clientId) throw new Error("User not found");
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const budgetStr = formData.get("budget") as string;
    const durationStr = formData.get("duration") as string;
    const techRaw = formData.get("techStack") as string | null;

    // Basic validation
    if (!title || !description || !budgetStr || !durationStr) {
      return { success: false, message: "Missing required fields" };
    }

    const budget = Number(budgetStr);
    const duration = Number(durationStr);
    const techStack = techRaw ? techRaw.split(",").map((t) => t.trim()).filter(Boolean) : [];

    // Create project
    const project = await prisma.project.create({
      data: {
        title,
        description,
        budget,
        duration,
        techStack,
        status: "ACTIVE", // default status
        clientId,
      },
    });
     
    revalidatePath('dashboard/client/projects')
    return { success: true, project };
  } catch (error) {
   
    return{
      success:false,
      message:"Failed to create project"
    }
  }
}

export async function getProjects(){
  const userId=await getUserId();

  try {

  const projects=  await prisma.project.findMany({
      where:{clientId:userId},
      include:{
        _count:{
          select:{
            application:true
          }
        }
      }
    })

    return projects
    
  } catch (error) {
    console.log('Error in getting project : ',error)
  }
}

export async function getClientDashboardData(){
const userId=await getUserId();
const user=await getUser()
console.log('User : ',user)
  const [totalProjects,totalApplications,totalHiredDevs,recentProjects]=await prisma.$transaction([
    prisma.project.count({
      where:{clientId:userId}
    }),

    prisma.application.count({
      where:{
        project:{
          clientId:userId
        }
      }
    }),

    prisma.project.count({
      where:{
      clientId:userId,
       hiredDevId:{
        not:null
       }
      }
    }),

    prisma.project.findMany({
      where:{clientId:userId},
      orderBy:{
        createdAt:'desc'
      },
      include:{
        _count:{
          select:{
            application:true
          }
        }
      },
      take:3
    })
  ])

  return {
    totalProjects,totalApplications,totalHiredDevs,recentProjects
  }
}


export async function getMyProjectApplications(){
const userId=await getUserId();
  const applications=await prisma.application.findMany({
    where:{project:{clientId:userId}},
    include:{
      project:{
        select:{
          title:true
        },
      },
      developer:{
        select:{
          name:true
        }
      }
    }
  })

  return applications
}