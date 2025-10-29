"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Code, Mail, Lock, User, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { signinUser, signupUser } from "@/action/user.action";
import toast from "react-hot-toast";

export default function Auth() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");

  // Sign-in fields
  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });

  // Sign-up fields
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (activeTab === "signup") {
        if (signupData.password !== signupData.confirmPassword) {
          alert("Passwords do not match!");
          setIsLoading(false);
          return;
        }

        const formData = new FormData();
        formData.append("name", signupData.name);
        formData.append("email", signupData.email);
        formData.append("password", signupData.password);
        formData.append("confirmPassword", signupData.confirmPassword);

        const res = await signupUser(formData);
        if (res?.success) {
          router.push(`/select-role?userId=${res.userId}`);
        } else {
          alert(res?.message || "Failed to create account.");
        }
      } else {
        // Sign in
        const formData = new FormData();
        formData.append("email", signinData.email);
        formData.append("password", signinData.password);

        const res = await signinUser(formData);
        if (res?.success) {
          router.push("/dashboard");
        } else {
          toast.error('Invalid credentials')
        }
      }
    } catch (error) {
      console.error("Error in auth:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-4">
      {/* Subtle background accent */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-cyan-500 opacity-10 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <a href="/" className="inline-flex items-center gap-2 mb-4 group">
            <Code className="h-8 w-8 text-cyan-400" />
            <span className="font-bold text-2xl text-white">DevHire</span>
          </a>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-white">Welcome back</h1>
            <p className="text-slate-400">
              Sign in to your account or create a new one
            </p>
          </div>
        </div>

        {/* Auth Tabs */}
        <Tabs
          defaultValue="signin"
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "signin" | "signup")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 bg-slate-900 border border-slate-800 p-1">
            <TabsTrigger
              value="signin"
              className="data-[state=active]:bg-slate-800 data-[state=active]:text-white text-slate-400"
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="data-[state=active]:bg-slate-800 data-[state=active]:text-white text-slate-400"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>

          {/* Sign In */}
          <TabsContent value="signin" className="mt-6">
            <form onSubmit={handleSubmit}>
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-xl text-white">Sign In</CardTitle>
                  <CardDescription className="text-slate-400 text-sm">
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-300 text-sm">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={signinData.email}
                        onChange={(e) =>
                          setSigninData({ ...signinData, email: e.target.value })
                        }
                        className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-slate-600"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-slate-300 text-sm">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={signinData.password}
                        onChange={(e) =>
                          setSigninData({
                            ...signinData,
                            password: e.target.value,
                          })
                        }
                        className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-slate-600"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end">
                    <a
                      href="#"
                      className="text-sm text-cyan-400 hover:text-cyan-300"
                    >
                      Forgot password?
                    </a>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full bg-slate-700 hover:bg-slate-600 text-white"
                    disabled={isLoading}
                    variant="secondary"
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                    {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </TabsContent>

          {/* Sign Up */}
          <TabsContent value="signup" className="mt-6">
            <form onSubmit={handleSubmit}>
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-xl text-white">
                    Create Account
                  </CardTitle>
                  <CardDescription className="text-slate-400 text-sm">
                    Enter your information to create an account
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-300 text-sm">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={signupData.name}
                        onChange={(e) =>
                          setSignupData({ ...signupData, name: e.target.value })
                        }
                        className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-slate-600"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-slate-300 text-sm">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="you@example.com"
                        value={signupData.email}
                        onChange={(e) =>
                          setSignupData({ ...signupData, email: e.target.value })
                        }
                        className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-slate-600"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-slate-300 text-sm">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        value={signupData.password}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            password: e.target.value,
                          })
                        }
                        className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-slate-600"
                        required
                      />
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-slate-300 text-sm">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                        value={signupData.confirmPassword}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-slate-600"
                        required
                      />
                    </div>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full bg-slate-700 hover:bg-slate-600 text-white"
                    disabled={isLoading}
                    variant="secondary"
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                    {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </TabsContent>
        </Tabs>

        {/* Footer text */}
        <p className="text-center text-xs text-slate-500">
          By continuing, you agree to our{" "}
          <a href="#" className="text-slate-400 hover:text-slate-300">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="text-slate-400 hover:text-slate-300">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
