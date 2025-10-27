'use client'
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, DollarSign, Clock, ArrowRight, CheckCircle2, Users, Shield, Sparkles, Zap, Target } from "lucide-react";
import Link from 'next/link';

const featuredProjects = [
  {
    id: 1,
    title: "E-commerce Platform Redesign",
    client: "TechCorp Inc.",
    budget: "$5,000 - $8,000",
    duration: "2-3 months",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 2,
    title: "Mobile App Development",
    client: "StartupXYZ",
    budget: "$10,000 - $15,000",
    duration: "3-4 months",
    tags: ["React Native", "Firebase"],
  },
  {
    id: 3,
    title: "AI Integration for SaaS",
    client: "InnovateLabs",
    budget: "$8,000 - $12,000",
    duration: "2 months",
    tags: ["Python", "TensorFlow", "API"],
  },
];

const features = [
  {
    icon: Users,
    title: "Top Talent",
    description: "Access a curated network of skilled developers",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Protected transactions and milestone-based payments",
  },
  {
    icon: CheckCircle2,
    title: "Quality Assurance",
    description: "Vetted professionals and project monitoring",
  },
];

const stats = [
  { value: "10K+", label: "Active Clients" },
  { value: "50K+", label: "Projects Completed" },
  { value: "98%", label: "Success Rate" },
  { value: "4.9/5", label: "Average Rating" },
];

export default function HomeComponent() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 opacity-10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950 bg-opacity-80 backdrop-blur-xl border-b border-white border-opacity-10 shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <Code className="h-8 w-8 text-cyan-400 transition-colors" />
            <span className="font-bold text-2xl text-cyan-400">DevHire</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href={'/auth'} className="text-white hover:text-cyan-400">Sign In</Link >
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <Badge className="w-fit bg-cyan-500 bg-opacity-20 text-cyan-300 border-cyan-500 border-opacity-30 px-4 py-1.5">
                <Sparkles className="w-3 h-3 mr-2 inline" />
                Trusted by 10,000+ clients
              </Badge>
              <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                Hire the{' '}
                <span className="text-cyan-400">
                  Right Developer
                </span>
                {' '}for Your Next Project
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed">
                Post your projects, receive proposals, and hire top developers. Build your dream team today with the most trusted platform in the industry.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white text-lg px-8 py-6 group">
                  Get Started 
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white border-opacity-20 hover:border-cyan-400 hover:border-opacity-50 text-lg px-8 py-6 text-white">
                  Browse Projects
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, idx) => (
                  <div key={idx} className="text-center group cursor-pointer">
                    <div className="text-3xl font-bold text-cyan-400 transition-transform group-hover:scale-110">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative group">
              <div className="absolute inset-0 bg-cyan-500 opacity-30 rounded-3xl blur-2xl transition-all group-hover:blur-3xl" />
              <div className="relative bg-slate-800 rounded-3xl p-8 border border-white border-opacity-10 shadow-2xl">
                <div className="aspect-video bg-slate-700 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <Code className="w-24 h-24 text-cyan-400 opacity-30" />
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 bg-cyan-500 rounded-2xl p-4 shadow-xl floating">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-purple-500 rounded-2xl p-4 shadow-xl floating-delayed">
                <Target className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-purple-500 bg-opacity-20 text-purple-300 border-purple-500 border-opacity-30 px-4 py-1.5">
              Why Choose Us
            </Badge>
            <h2 className="text-5xl font-bold">
              Built for{' '}
              <span className="text-purple-400">
                Modern Teams
              </span>
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Everything you need to build amazing products with the best developers
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-slate-900 bg-opacity-50 border-white border-opacity-10 hover:border-opacity-20 transition-all group hover:scale-105 cursor-pointer"
              >
                <CardHeader className="space-y-4">
                  <div className="h-16 w-16 rounded-2xl bg-cyan-500 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-white group-hover:text-cyan-400 transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-slate-300 text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between mb-16">
            <div className="space-y-2">
              <h2 className="text-5xl font-bold">
                <span className="text-orange-400">Trending</span> Projects
              </h2>
              <p className="text-slate-300 text-lg">Latest opportunities for developers</p>
            </div>
            <Button variant="outline" className="border-2 border-white border-opacity-20 hover:border-cyan-400 hover:border-opacity-50 text-white group">
              View All 
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <Card 
                key={project.id} 
                className="bg-slate-900 bg-opacity-50 border-white border-opacity-10 hover:border-opacity-20 transition-all group hover:scale-105 cursor-pointer overflow-hidden"
              >
                <CardHeader className="relative">
                  <CardTitle className="text-xl text-white group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-slate-400">{project.client}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 relative">
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <DollarSign className="h-4 w-4 text-green-400" />
                    <span className="font-semibold">{project.budget}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Clock className="h-4 w-4 text-blue-400" />
                    <span>{project.duration}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} className="bg-white bg-opacity-5 text-slate-300 border-white border-opacity-10">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full bg-white bg-opacity-5 hover:bg-cyan-500 border border-white border-opacity-10 text-white transition-all group">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 relative z-10">
          <Card className="bg-cyan-600 border-0 shadow-2xl overflow-hidden relative">
            <CardContent className="p-16 text-center relative">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Ready to Start Your Next Project?
              </h2>
              <p className="text-xl text-cyan-50 mb-8 max-w-2xl mx-auto">
                Join thousands of successful clients and developers building amazing products together
              </p>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 shadow-xl text-lg px-8 py-6 group">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white border-opacity-10 bg-slate-950 bg-opacity-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Code className="h-8 w-8 text-cyan-400" />
                <span className="font-bold text-xl text-cyan-400">DevHire</span>
              </div>
              <p className="text-sm text-slate-400">
                Connecting great developers with amazing projects.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Company</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Resources</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Guidelines</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Legal</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white border-opacity-10 text-center text-sm text-slate-400">
            <p>&copy; 2025 DevHire. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style>{`
        .floating {
          animation: float 3s ease-in-out infinite;
        }
        .floating-delayed {
          animation: float 3s ease-in-out infinite;
          animation-delay: 1s;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}