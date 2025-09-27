"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Clock, Heart, Users, TrendingUp, Award, Shield } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function ImpactSection() {
  const { t } = useLanguage()

  const impacts = [
    {
      icon: Clock,
      metric: "75%",
      title: "Travel Time Saved",
      description: "Patients save hours of travel to reach healthcare facilities",
      color: "text-primary",
      bgColor: "bg-primary/5",
    },
    {
      icon: Heart,
      metric: "90%",
      title: "Faster Diagnosis",
      description: "AI-powered triage enables quicker medical assessments",
      color: "text-government-orange",
      bgColor: "bg-government-orange/5",
    },
    {
      icon: Users,
      metric: "10,000+",
      title: "Rural Lives Impacted",
      description: "Bringing healthcare access to underserved communities",
      color: "text-accent",
      bgColor: "bg-accent/5",
    },
    {
      icon: TrendingUp,
      metric: "95%",
      title: "Patient Satisfaction",
      description: "High satisfaction rates from telemedicine consultations",
      color: "text-success",
      bgColor: "bg-success/5",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium">
            <Shield className="h-4 w-4" />
            Government Impact Report
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-balance">Transforming Rural Healthcare</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
            Sehat Sathi saves travel time, provides timely healthcare, and empowers villages with medical access. See
            how we're making a difference in rural communities across the region.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impacts.map((impact, index) => (
            <Card
              key={index}
              className={`text-center group hover:shadow-xl transition-all duration-300 ${impact.bgColor} border-2 border-transparent hover:border-primary/20`}
            >
              <CardContent className="p-8 space-y-4">
                <div
                  className={`w-16 h-16 mx-auto bg-background rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}
                >
                  <impact.icon className={`h-8 w-8 ${impact.color}`} />
                </div>
                <div className="space-y-2">
                  <div className={`text-3xl font-bold ${impact.color}`}>{impact.metric}</div>
                  <h3 className="text-lg font-semibold">{impact.title}</h3>
                  <p className="text-sm text-muted-foreground text-pretty">{impact.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-primary via-government-orange to-accent rounded-2xl p-8 lg:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20 rounded-2xl" />
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Award className="h-6 w-6" />
              <span className="text-lg font-semibold">Smart India Hackathon 2025</span>
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-balance">
              Ready to Transform Healthcare in Your Community?
            </h3>
            <p className="text-lg opacity-90 mb-8 text-pretty max-w-2xl mx-auto">
              Join thousands of patients, doctors, and healthcare administrators who trust Sehat Sathi for accessible,
              AI-powered telemedicine solutions.
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto border border-white/20">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Shield className="h-4 w-4" />
                <span className="font-medium">Demo Credentials</span>
              </div>
              <div className="space-y-2 text-sm">
                <p>
                  Username: <span className="font-mono bg-white/20 px-2 py-1 rounded">Admin</span>
                </p>
                <p>
                  Password: <span className="font-mono bg-white/20 px-2 py-1 rounded">123456</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
