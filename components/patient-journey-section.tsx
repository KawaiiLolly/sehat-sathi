"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Smartphone, FileText, Brain, UserCheck, Calendar, Video, Pill, MapPin, Award } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function PatientJourneySection() {
  const { t } = useLanguage()

  const steps = [
    {
      icon: Smartphone,
      title: "Login",
      description: "Secure mobile + OTP authentication",
    },
    {
      icon: FileText,
      title: "Enter Symptoms",
      description: "Describe your health concerns",
    },
    {
      icon: Brain,
      title: "AI Triage",
      description: "AI detects urgency level",
    },
    {
      icon: UserCheck,
      title: "Specialist Match",
      description: "Get matched with right doctor",
    },
    {
      icon: Calendar,
      title: "Book Appointment",
      description: "Schedule at your convenience",
    },
    {
      icon: Video,
      title: "Consultation",
      description: "Video call with doctor",
    },
    {
      icon: Pill,
      title: "Digital Prescription",
      description: "Receive e-prescription instantly",
    },
    {
      icon: MapPin,
      title: "Pharmacy Access",
      description: "Find nearby pharmacy partners",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 bg-government-orange/10 text-government-orange px-4 py-2 rounded-full text-sm font-medium">
            <Award className="h-4 w-4" />
            Sehat Sathi
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-balance">AI powered rural healthcare access.</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            From symptom entry to treatment - a seamless 8-step process designed for rural communities.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-government-orange to-accent rounded-full -translate-y-1/2 opacity-20" />

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="group hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm border-2 border-transparent hover:border-primary/30">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-12 h-12 mx-auto bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors shadow-sm">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-sm">{step.title}</h3>
                      <p className="text-xs text-muted-foreground text-pretty">{step.description}</p>
                    </div>
                  </CardContent>
                </Card>

                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 bg-gradient-to-r from-primary to-government-orange text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg border-2 border-background">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-success/10 text-success px-6 py-3 rounded-full text-sm font-medium">
            <Award className="h-4 w-4" />
            Certified by Ministry of Health & Family Welfare
          </div>
        </div>
      </div>
    </section>
  )
}
