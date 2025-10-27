'use client'

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, Code } from "lucide-react"

const roles = [
  {
    id: "client",
    title: "Client",
    description: "Post your projects and find skilled developers.",
    icon: Briefcase,
    href: "/profile-setup?role=client",
  },
  {
    id: "developer",
    title: "Developer",
    description: "Browse projects and submit proposals to clients.",
    icon: Code,
    href: "/profile-setup?role=developer",
  },
]

export default function RoleSelect() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-muted/20 px-4">
      <div className="max-w-3xl w-full space-y-8 text-center">
        <header>
          <h1 className="text-3xl font-semibold tracking-tight">Select Your Role</h1>
          <p className="text-muted-foreground mt-2">Choose how you want to get started on DevHire</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {roles.map((role) => (
            <Link key={role.id} href={role.href}>
              <Card className="hover:border-primary/40 transition-all duration-200 hover:shadow-sm group cursor-pointer">
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 mx-auto group-hover:bg-primary/20 transition-colors">
                    <role.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{role.title}</CardTitle>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Continue as {role.title}
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <footer>
          <p className="text-sm text-muted-foreground">
            Admin access?{" "}
            <Link href="/dashboard/admin" className="text-primary hover:underline">
              Sign in here
            </Link>
          </p>
        </footer>
      </div>
    </main>
  )
}
