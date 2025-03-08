'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { MessageSquare, Users, Brain, Target, Sparkles, Trophy } from "lucide-react"
import Chatbot from "./Chatbot"

const features = [
  {
    title: "Stress Level Detection Chatbot",
    description: "Get instant help and guidance with our intelligent AI assistant",
    icon: MessageSquare,
  },
  {
    title: "Community Forums",
    description: "Connect with peers, share knowledge, and learn together",
    icon: Users,
  },
  {
    title: "Smart Learning",
    description: "Personalized learning paths adapted to your progress",
    icon: Brain,
  },
 
]

export default function FeatureCards() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const router = useRouter()

  return (
    <section className="py-20 px-4 md:px-6 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-50" />
      <div className="max-w-7xl mx-auto relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-primary/20 rounded-full blur-3xl opacity-20" />
        <h2 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-500 relative">
          Platform Features
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Discover powerful tools and features designed to support your journey
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card 
                key={feature.title} 
                className="group bg-gradient-to-br from-white via-white to-primary/5 dark:from-gray-950 dark:via-gray-950 dark:to-primary/10 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 cursor-pointer border border-primary/10 hover:border-primary/30 hover:scale-[1.02] relative overflow-hidden backdrop-blur-sm"
                onClick={() => {
                  if (feature.title === "Stress Level Detection Chatbot") {
                    setIsChatbotOpen(true)
                  } else if (feature.title === "Community Forums") {
                    router.push('/community-forum')
                  } else if (feature.title === "Smart Learning") {
                    router.push('/smart-learning')
                  }
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${
                  index === 0 ? 'from-blue-500/10 via-purple-500/10 to-transparent' :
                  index === 1 ? 'from-purple-500/10 via-pink-500/10 to-transparent' :
                  'from-pink-500/10 via-orange-500/10 to-transparent'
                } opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <CardHeader>
                  <div className="flex items-center gap-6">
                    <div className={`p-4 rounded-2xl ${
                      index === 0 ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10' :
                      index === 1 ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10' :
                      'bg-gradient-to-br from-pink-500/10 to-orange-500/10'
                    } group-hover:scale-105 transition-all duration-300 ring-1 ring-primary/20 shadow-lg shadow-primary/5`}>
                      <Icon className={`w-8 h-8 ${
                        index === 0 ? 'text-blue-500' :
                        index === 1 ? 'text-purple-500' :
                        'text-pink-500'
                      } group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                    <div className="space-y-2">
                      <CardTitle className={`text-2xl font-semibold bg-clip-text text-transparent ${
                        index === 0 ? 'bg-gradient-to-r from-blue-500 to-purple-500' :
                        index === 1 ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                        'bg-gradient-to-r from-pink-500 to-orange-500'
                      }`}>
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>
      <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </section>
  )
} 