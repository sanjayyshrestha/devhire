'use client'

import { useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, Code } from "lucide-react"
import { selectRole } from "@/action/user.action"

const roles = [
  {
    id: "CLIENT",
    title: "Client",
    description: "Post your projects and find skilled developers.",
    icon: Briefcase,
  },
  {
    id: "DEVELOPER",
    title: "Developer",
    description: "Browse projects and submit proposals to clients.",
    icon: Code,
  },
]

export default function RoleSelect() {
  const [isPending, startTransition] = useTransition()
  const [selectedRole, setSelectedRole] = useState<"CLIENT" | "DEVELOPER" | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSelect = (role: "CLIENT" | "DEVELOPER") => {
    setSelectedRole(role)

    startTransition(async () => {
      try {
        const userId = searchParams.get('userId') as string
        const result = await selectRole(userId, role)

        if (result.success) {
          router.push(`/profile-setup?role=${role.toLowerCase()}&userId=${userId}`)
        } else {
          console.error("Failed to set role:", result.error)
          setSelectedRole(null)
        }
      } catch (err) {
        console.error("Error selecting role:", err)
        setSelectedRole(null)
      }
    })
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-muted/20 px-4">
      <div className="max-w-3xl w-full space-y-8 text-center">
        <header>
          <h1 className="text-3xl font-semibold tracking-tight">Select Your Role</h1>
          <p className="text-muted-foreground mt-2">Choose how you want to get started on DevHire</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {roles.map((role) => (
            <Card
              key={role.id}
              className={`hover:border-primary/40 transition-all duration-200 hover:shadow-sm group cursor-pointer ${
                selectedRole === role.id ? "border-primary" : ""
              }`}
              onClick={() => handleSelect(role.id as "CLIENT" | "DEVELOPER")}
            >
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 mx-auto group-hover:bg-primary/20 transition-colors">
                  <role.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{role.title}</CardTitle>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full"
                  variant="outline"
                  disabled={isPending && selectedRole === role.id}
                >
                  {isPending && selectedRole === role.id
                    ? "Saving..."
                    : `Continue as ${role.title}`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <footer>
          <p className="text-sm text-muted-foreground">
            Admin access?{" "}
            <a href="/dashboard/admin" className="text-primary hover:underline">
              Sign in here
            </a>
          </p>
        </footer>
      </div>
    </main>
  )
}
