'use server'

import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function signupUser(formData:FormData){
  const email=formData.get('email') as string;
  const password=formData.get('password') as string;
  const confirmPassword=formData.get('confirmPassword') as string;
  if(!email || !password) {
    return{
      success:false,
      message:"Both email and password are required"
    }
  }
  if(!confirmPassword){
    return{
      success:false,
      message:"Confirm your password"
    }
  }
  if(confirmPassword!==password){
    return{
      success:false,
      message:"Both password should match"
    }
  }
  const hashedPassword=await bcrypt.hash(password,10);
  const user=await prisma.user.create({
    data:{
      email,
      password:hashedPassword
    }
  })

return {
  success:true,
  userId:user.id
};
}

export async function signinUser(formData:FormData){
  const email=formData.get('email') as string
  const password=formData.get('password') as string

    try {

    await signIn('credentials',{
      redirect:false,
      callbackUrl:'/',
      email,
      password
    })

    return {
      success:true
    }

  } catch (error) {
    const err=error as Error
    console.log(err.cause)
  }

  // redirect('/')
}

export async function selectRole(userId:string,role:"DEVELOPER" | "CLIENT"){
try {
    await prisma.user.update({
      where: { id: userId },
      data: { role },
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating role:", error);
    return { success: false, error: "Failed to update role" };
  }
}

export async function saveUserProfile(formData: FormData) {
  try {
    const userId = formData.get("userId") as string;
    const role = formData.get("role") as "client" | "developer";

    if (!userId || !role) {
      return { success: false, message: "Missing user or role." };
    }

    // Common fields
    const bio = formData.get("bio") as string | null;

    if (role === "developer") {
      const name = formData.get("name") as string;
      const avatar = formData.get("avatar") as string | null;
      const skillsRaw = formData.get("skills") as string | null;
      const skills = skillsRaw ? skillsRaw.split(",").map(s => s.trim()) : [];

      // Update user role + create or update Developer record
      await prisma.user.update({
        where: { id: userId },
        data: {
          role: "DEVELOPER",
          developer: {
            upsert: {
              create: {
                name,
                bio,
                avatar,
                skills,
              },
              update: {
                name,
                bio,
                avatar,
                skills,
              },
            },
          },
        },
      });

    } else if (role === "client") {
      const companyName = formData.get("companyName") as string;
      const logo = formData.get("logo") as string | null;

      await prisma.user.update({
        where: { id: userId },
        data: {
          role: "CLIENT",
          client: {
            upsert: {
              create: {
                companyName,
                bio,
                logo,
              },
              update: {
                companyName,
                bio,
                logo,
              },
            },
          },
        },
      });
    }

    return { success: true, message: "Profile saved successfully." };
  } catch (error) {
    console.error("❌ Error saving profile:", error);
    return { success: false, message: "Failed to save profile." };
  }
}
