
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, DollarSign, Clock, ArrowRight, CheckCircle2, Users, Shield, Sparkles, Zap, Target } from "lucide-react";
import Link from 'next/link';
import { getUser } from '@/action/user.action';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import FeatureSection from './FeatureSection';
import CTASection from './CTASection';
import Footer from './Footer';
import FeaturedProject from './FeaturedProject';

export  type User=Awaited<ReturnType<typeof getUser>>

export default async function HomeComponent() {
  const user=await getUser();
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 opacity-10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Navigation */}
     <Navbar user={user} />
      {/* Hero Section */}
      <HeroSection/>
      {/* Features Section */}
      <FeatureSection/>
      {/* Featured Projects */}
      {/* CTA Section */}
      <CTASection/>
      {/* Footer */}
      <Footer/>

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