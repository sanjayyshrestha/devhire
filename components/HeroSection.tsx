import React from "react";
import { Code, ArrowRight, Sparkles, Zap, Target, Badge } from "lucide-react";
import { Button } from "./ui/button";

const HeroSection = () => {
  const stats = [
    { value: "10K+", label: "Active Clients" },
    { value: "50K+", label: "Projects Completed" },
    { value: "98%", label: "Success Rate" },
    { value: "4.9/5", label: "Average Rating" },
  ];

  return (
    <section className="relative pt-28 md:pt-32 pb-16 md:pb-20 bg-transparent">
      <div className="container mx-auto lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Section */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <Badge className="mx-auto lg:mx-0 w-fit bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 px-3 md:px-4 py-1 md:py-1.5 text-sm md:text-base">
              <Sparkles className="w-3 h-3 mr-2 inline" />
              Trusted by 10,000+ clients
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-white">
              Hire the{" "}
              <span className="text-cyan-400">Right Developer</span>{" "}
              for Your Next Project
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Post your projects, receive proposals, and hire top developers.
              Build your dream team today with the most trusted platform in the
              industry.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Button
                size="lg"
                className="bg-cyan-500 hover:bg-cyan-600 text-white text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 group transition-all duration-200"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 hover:border-cyan-400 hover:border-opacity-60 text-white text-opacity-90 hover:text-white text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 transition-all duration-200 bg-white/10 hover:bg-cyan-400/10"
              >
                Browse Projects
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 sm:pt-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center group cursor-pointer">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-400 transition-transform group-hover:scale-110">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-400 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Hero Visual */}
          <div className="relative group mt-12 lg:mt-0">
            <div className="absolute inset-0 bg-cyan-500 opacity-30 rounded-3xl blur-2xl transition-all group-hover:blur-3xl" />
            <div className="relative bg-slate-800 rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
              <div className="aspect-video bg-slate-700 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <Code className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 text-cyan-400 opacity-30" />
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 bg-cyan-500 rounded-2xl p-3 sm:p-4 shadow-xl animate-bounce-slow">
              <Zap className="w-5 sm:w-6 md:w-8 h-5 sm:h-6 md:h-8 text-white" />
            </div>
            <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-purple-500 rounded-2xl p-3 sm:p-4 shadow-xl animate-bounce-slower">
              <Target className="w-5 sm:w-6 md:w-8 h-5 sm:h-6 md:h-8 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
