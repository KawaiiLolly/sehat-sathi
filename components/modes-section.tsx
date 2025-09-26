"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Stethoscope, Settings, CheckCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function ModesSection() {
  const { t } = useLanguage()

  const modes = [
    {
      icon: User,
      title: t("patient.title"),
      description: t("patient.description"),
      features: [
        "Login with mobile + OTP",
        "Symptom entry & AI triage analysis",
        "Doctor recommendation & appointment booking",
        "Chat & video consultation",
        "Digital prescription download",
      ],
      color: "text-primary",
      bgColor: "bg-primary/5",
      borderColor: "border-primary/20",
    },
    {
      icon: Stethoscope,
      title: t("doctor.title"),
      description: t("doctor.description"),
      features: [
        "Receive patient cases instantly",
        "Video consultation platform",
        "E-prescription generation",
        "Patient history access",
        "Treatment tracking",
      ],
      color: "text-accent",
      bgColor: "bg-accent/5",
      borderColor: "border-accent/20",
    },
    {
      icon: Settings,
      title: "Admin Mode",
      description: "Complete system management and oversight",
      features: [
        "Doctor & patient management",
        "System security monitoring",
        "Analytics & reporting",
        "Platform configuration",
        "Quality assurance",
      ],
      color: "text-government-orange",
      bgColor: "bg-government-orange/5",
      borderColor: "border-government-orange/20",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <CheckCircle className="h-4 w-4" />
            Government Approved Platform
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-balance">Three Modes, One Platform</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Designed for patients, doctors, and administrators with specialized interfaces for each user type.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {modes.map((mode, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden group hover:shadow-xl transition-all duration-300 ${mode.bgColor} border-2 ${mode.borderColor}`}
            >
              <CardHeader className="pb-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-background flex items-center justify-center mb-4 ${mode.color} shadow-sm`}
                >
                  <mode.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{mode.title}</CardTitle>
                <CardDescription className="text-base">{mode.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {mode.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3 text-sm">
                      <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${mode.color}`} />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Settings className="h-8 w-8 text-primary" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
