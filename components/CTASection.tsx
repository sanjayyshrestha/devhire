

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
const CTASection = () => {
  return (
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
             <Link
    href="/auth"
    className="inline-flex items-center gap-1.5 rounded-md
               bg-linear-to-r from-cyan-500 to-blue-600
               hover:from-cyan-600 hover:to-blue-700
               text-white text-lg font-medium
               px-5 py-2 shadow-sm shadow-cyan-500/30
               transition-all duration-200 hover:-translate-y-0.5"
  >
    Get Started
    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
  </Link>
            </CardContent>
          </Card>
        </div>
      </section>

  )
}

export default CTASection