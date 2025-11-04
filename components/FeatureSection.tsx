import { Badge, CheckCircle2, Shield, Users } from 'lucide-react'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FeatureSection = () => {
  const features = [
    {
      icon: Users,
      title: "Top Talent",
      description: "Access a curated network of skilled developers for any project size.",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Protected transactions with milestone-based payouts and transparency.",
    },
    {
      icon: CheckCircle2,
      title: "Quality Assurance",
      description: "Vetted professionals and project monitoring ensure top results.",
    },
  ];

  return (
    <section className="py-24 bg-slate-950">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Heading Section */}
        <div className="text-center mb-20 space-y-5">
          <Badge className="bg-purple-500/20 text-purple-300 border border-purple-400/20 px-5 py-1.5 rounded-full tracking-wide">
            Why Choose Us
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Built for <span className="text-purple-400">Modern Teams</span>
          </h2>
          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Everything you need to build amazing products with the best developers.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-10 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-slate-900/60 border border-white/10 hover:border-white/20 
                         rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <CardHeader className="flex flex-col items-start space-y-5 p-8">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-slate-400 text-base leading-relaxed">
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
