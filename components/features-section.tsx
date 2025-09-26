"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Shield, FileText, MapPin, Award, Users } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function FeaturesSection() {
  const { t } = useLanguage()

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Triage System",
      description:
        "Advanced AI analyzes symptoms to determine urgency levels and recommend appropriate specialists, ensuring patients get the right care at the right time.",
      color: "text-primary",
      bgColor: "bg-primary/5",
    },
    {
      icon: Shield,
      title: "Secure Patient Data Storage",
      description:
        "End-to-end encryption and HIPAA-compliant data storage ensure patient information remains private and secure throughout the healthcare journey.",
      color: "text-success",
      bgColor: "bg-success/5",
    },
    {
      icon: FileText,
      title: "Digital Prescriptions",
      description:
        "Doctors can generate and send digital prescriptions instantly, eliminating paper-based processes and enabling faster treatment access.",
      color: "text-government-orange",
      bgColor: "bg-government-orange/5",
    },
    {
      icon: MapPin,
      title: "Remote Access for Rural Communities",
      description:
        "Bridging the healthcare gap by bringing specialist consultations directly to remote villages through mobile-optimized telemedicine.",
      color: "text-accent",
      bgColor: "bg-accent/5",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium">
            <Award className="h-4 w-4" />
            {t("govt.certified")}
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-balance">Key Features</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Cutting-edge technology meets compassionate care to deliver healthcare solutions that work for everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`group hover:shadow-xl transition-all duration-300 ${feature.bgColor} border-2 border-transparent hover:border-primary/20`}
            >
              <CardHeader>
                <div
                  className={`w-12 h-12 bg-background rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm`}
                >
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
              </CardContent>

              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Shield className="h-6 w-6 text-success" />
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-primary text-primary-foreground rounded-2xl p-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Users className="h-6 w-6" />
              <span className="text-lg font-semibold">Trusted by Government of India</span>
            </div>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              This platform is developed under the Smart India Hackathon initiative and is aligned with Digital India
              mission objectives for accessible healthcare.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
