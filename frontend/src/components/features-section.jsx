import { Video, Share, ShieldCheck, Mic, MessageSquare, Users, Calendar } from "lucide-react"

export function FeatureSection() {
  const features = [
    {
      icon: <Video className="h-10 w-10 text-primary" />,
      title: "HD Video Calls",
      description: "Crystal clear video with adaptive quality for any connection",
    },
    {
      icon: <Share className="h-10 w-10 text-primary" />,
      title: "Secure Screen Sharing",
      description: "Share your screen with confidence and control",
    },
    {
      icon: <Mic className="h-10 w-10 text-primary" />,
      title: "AI Noise Suppression",
      description: "Advanced AI filters out background noise automatically",
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-primary" />,
      title: "End-to-End Encryption",
      description: "Your conversations stay private and secure",
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: "Real-time Chat",
      description: "Send messages, links and files during your calls",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Breakout Rooms",
      description: "Split into smaller groups for focused discussions",
    },
    {
      icon: <Calendar className="h-10 w-10 text-primary" />,
      title: "Smart Scheduling",
      description: "Plan meetings across time zones with ease",
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Seamless Collaboration</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Everything you need to connect, collaborate, and communicate effectively
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-background/50 backdrop-blur-sm border border-primary/10 rounded-xl p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-glow"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

