import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { MessageSquare, Users, Brain, Target, Sparkles, Trophy } from "lucide-react"

const features = [
  {
    title: "AI Chatbot",
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
  {
    title: "Goal Tracking",
    description: "Set and track your learning goals with detailed analytics",
    icon: Target,
  },
  {
    title: "Interactive Exercises",
    description: "Practice with engaging, hands-on learning materials",
    icon: Sparkles,
  },
  {
    title: "Achievements",
    description: "Earn badges and rewards as you progress in your journey",
    icon: Trophy,
  },
]

export default function FeatureCards() {
  return (
    <section className="py-20 px-4 md:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">
          Platform Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="bg-card hover:bg-accent/5 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
} 