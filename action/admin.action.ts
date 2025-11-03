"use server";

import { prisma } from "@/lib/prisma";

export async function getUsersForAdminDashboard() {
  const users = await prisma.user.findMany({
    include: {
      client: true,
      developer: true,
    },
  });

  return users;
}

export async function getProjectsForAdminDashboard() {
  const projects = await prisma.project.findMany({
    include: {
      client: {
        select: {
          companyName: true,
        },
      },
      _count: {
        select: {
          application: true,
        },
      },
    },
  });

  return projects;
}

export async function getDataForAdminDashboard() {
  const [
    totalUsers,
    totalActiveProjects,
    totalHiredDevs,
    adminCount,
    clientCount,
    developerCount,
    monthlyRawProject,
  ] = await prisma.$transaction([
    prisma.user.count(),

    prisma.project.count({
      where: { status: "ACTIVE" },
    }),

    prisma.project.count({
      where: {
        hiredDevId: {
          not: null,
        },
      },
    }),

    prisma.user.count({
      where: {
        role: "ADMIN",
      },
    }),

    prisma.user.count({
      where: {
        role: "CLIENT",
      },
    }),

    prisma.user.count({
      where: {
        role: "DEVELOPER",
      },
    }),

    prisma.project.groupBy({
      by: ["createdAt"],
      _count: {
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    }),
  ]);

  const monthlyCounts = Array(12).fill(0);

  monthlyRawProject.forEach((p) => {
    const month = new Date(p.createdAt).getMonth();

    monthlyCounts[month] += 1;
  });

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlyProjectData = monthNames.map((name, i) => ({
    name,
    projects: monthlyCounts[i],
  }));

  return {
    totalUsers,
    totalActiveProjects,
    totalHiredDevs,
    adminCount,
    clientCount,
    developerCount,
    monthlyProjectData,
  };
}
