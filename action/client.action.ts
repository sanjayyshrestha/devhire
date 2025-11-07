'use server'

import { prisma } from "@/lib/prisma";
import { getRole, getUser, getUserId } from "./user.action"
import { revalidatePath } from "next/cache";
import { ProjectStatus } from "@prisma/client";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

interface UpdateClientProfileInput {
  userId: string;
  bio?: string;
  companyName?: string;
  logo: string | File;
  location?: string; // if you add this field later
}


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
          name:true,
          avatar:true
        }
      }
    }
  })

  return applications
}

export async function acceptApplication(applicationId:string){

  const application=await prisma.application.findUnique({
    where:{
      id:applicationId
    },
    include:{
      project:true
    }
  })

   if(!application) throw new Error("Application Not Found")

    await prisma.application.update({
      where:{id:applicationId},
      data:{
        status:'ACCEPTED'
      }
    })

    
    await prisma.project.update({
      where:{
        id:application.projectId
      },
      data:{
        hiredDevId:application.developerId,
        status:'IN_PROGRESS'
      }
    })

    await prisma.application.updateMany({
      where:{
       projectId:application.projectId,
      id:{
        not:applicationId
      }
      },
      data:{
        status:'REJECTED'
      }
    })
    revalidatePath('/dashboard/client/applications')
    return { success: true, message: "Developer accepted for project" };

}

export async function declineApplication(applicationId:string){

  await prisma.application.update({
    where:{id:applicationId},
    data:{
      status:"REJECTED"
    }
  })

  revalidatePath('/dashboard/client/applications')

  return{
    success:true,
    message:"Application declined successfully"
  }
}

export async function getClientProfileData(userId:string){

  
 const user= await prisma.client.findUnique({
    where:{userId},
    include:{
      user:true,
      _count:{
        select:{
          project:true,
        },
      },
    }
  })

  const activeProject=await prisma.project.count({
    where:{clientId:userId,status:'ACTIVE'},
  })
  
  return {user,activeProject};
}

export async function updateClientProfileData({
  userId,
  bio,
  companyName,
  logo,
}: UpdateClientProfileInput) {
  try {
    let logoUrl:string;

    if(logo instanceof File){
      logoUrl=await uploadImageToCloudinary(logo);
    }else{
      logoUrl=logo
    }

    const updatedProfile = await prisma.client.update({
      where: { userId },
      data: {
        bio,
        companyName,
        logo:logoUrl,
      },
      include: {
        user: true, // to return user email, createdAt, etc.
      },
    });

    return {
      success: true,
      message:"Profile Update successfully",
      data: updatedProfile,
    };
  } catch (error: any) {
    console.error("Error updating client profile:", error);
    return {
      success: false,
      message: error.message || "Failed to update client profile.",
    };
  }
}

export async function deleteProject(id: string) { 
  const userId=await getUserId();

  const project=await prisma.project.findUnique({
    where:{
      id
    }
  })

  if(project?.clientId!==userId) {
    return {success:false,message:"Unauthorized"}
  }

  await prisma.project.delete({
    where:{id}
  })

  revalidatePath('/dashboard/client/projects')

  return {
    success:true,
    message:"Project deleted successfully"
  }
  
 }

 export async function updateProject(formData: FormData) {
  const userId = await getUserId(); // get current logged-in user id
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const budget = Number(formData.get("budget"));
  const duration = Number(formData.get("duration"));
  const techStack = (formData.get("techStack") as string)
    ?.split(",")
    .map((t) => t.trim());
  // const status = formData.get("status") as string;

  try {
    // 🔒 check ownership first
    const existingProject = await prisma.project.findUnique({
      where: { id },
      select: { clientId: true },
    });

    if (!existingProject) {
      return { success: false, message: "Project not found" };
    }

    if (existingProject.clientId !== userId) {
      return { success: false, message: "Unauthorized: You do not own this project" };
    }

    // ✅ now update
   await prisma.project.update({
      where: { id },
      data: {
        title,
        description,
        budget,
        duration,
        techStack,
        // status: status as ProjectStatus,
      },
    });
    revalidatePath('/dashboard/client/projects')
    return { success: true, message:"Project Updated Successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to update project" };
  }
}


export async function getProjectById(id: string) { /* optional for view */ }