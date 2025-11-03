
import { Badge, CheckCircle2, Shield, Users } from 'lucide-react'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
const FeatureSection = () => {
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
  
  return (
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

  )
}

export default FeatureSection