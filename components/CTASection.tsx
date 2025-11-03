

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
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
              <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 shadow-xl text-lg px-8 py-6 group">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

  )
}

export default CTASection