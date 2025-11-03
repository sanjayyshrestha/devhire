
import React from 'react'
import { Button } from './ui/button'
import { ArrowRight, Clock, DollarSign } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const FeaturedProject = () => {
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


  return (
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

  )
}

export default FeaturedProject