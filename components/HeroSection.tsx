
import React from 'react'
import { Code, ArrowRight,  Sparkles, Zap, Target, Badge } from "lucide-react"
import { Button } from './ui/button'
const HeroSection = () => {
  const stats = [
    { value: "10K+", label: "Active Clients" },
    { value: "50K+", label: "Projects Completed" },
    { value: "98%", label: "Success Rate" },
    { value: "4.9/5", label: "Average Rating" },
  ];
  return (
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
  )
}

export default HeroSection