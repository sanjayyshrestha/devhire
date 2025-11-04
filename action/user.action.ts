"use server";
import { auth, signIn, signOut } from "@/auth";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function signupUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const role = formData.get("role") as string;
  if (!email || !password) {
    return {
      success: false,
      message: "Both email and password are required",
    };
  }
  if (!confirmPassword) {
    return {
      success: false,
      message: "Confirm your password",
    };
  }
  if (confirmPassword !== password) {
    return {
      success: false,
      message: "Both password should match",
    };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: role as Role,
    },
  });

  await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  return {
    success: true,
    userId: user.id,
  };
}

export async function signinUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });

    const user = await prisma.user.findUnique({ where: { email } });
    return {
      success: true,
      role: user?.role,
    };
  } catch (error) {
    const err = error as Error;
    console.log(err.cause);

    return {
      success: false,
    };
  }

  // redirect('/')
}

export async function signoutUser() {
  await signOut();
}
export async function selectRole(userId: string, role: "DEVELOPER" | "CLIENT") {
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

    const bio = formData.get("bio") as string | null;

    if (role === "developer") {
      const name = formData.get("name") as string;
      const avatarFile = formData.get("avatar") as File | null;
      const skillsRaw = formData.get("skills") as string | null;
      const skills = skillsRaw ? skillsRaw.split(",").map((s) => s.trim()) : [];
      let avatarUrl: string | null = null;
      if (avatarFile && avatarFile.size > 0) {
        avatarUrl = await uploadImageToCloudinary(avatarFile);
      }
      await prisma.user.update({
        where: { id: userId },
        data: {
          role: "DEVELOPER",
          developer: {
            upsert: {
              create: {
                name,
                bio,
                avatar: avatarUrl,
                skills,
              },
              update: {
                name,
                bio,
                avatar: avatarUrl,
                skills,
              },
            },
          },
        },
      });
    } else if (role === "client") {
      const companyName = formData.get("companyName") as string;
      const logoFile = formData.get("logo") as File | null;

      let logoUrl: string | null = null;
      if (logoFile && logoFile.size > 0) {
        logoUrl = await uploadImageToCloudinary(logoFile);
      }

      await prisma.user.update({
        where: { id: userId },
        data: {
          role: "CLIENT",
          client: {
            upsert: {
              create: {
                companyName,
                bio,
                logo: logoUrl,
              },
              update: {
                companyName,
                bio,
                logo: logoUrl,
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

export async function getRole() {
  const session = await auth();
  return session?.user.role;
}

export async function getUserId() {
  const session = await auth();
  return session?.user.id;
}

export async function getUser() {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: { id: session?.user.id },
    include:{
      client:true,
      developer:true
    }
  });
  return user;
}
