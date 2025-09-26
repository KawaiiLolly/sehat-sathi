"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, LogOut, Activity, Calendar, MessageCircle, ChevronRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"

export default function PatientDashboard() {
  const [userEmail, setUserEmail] = useState("")
  const [currentStep, setCurrentStep] = useState(1)
  const router = useRouter()
  const { t } = useLanguage()

  useEffect(() => {
    const email = localStorage.getItem("userEmail")
    const userType = localStorage.getItem("userType")
    const step = localStorage.getItem("patientStep")

    if (!email || userType !== "patient") {
      router.push("/auth/patient")
      return
    }

    setUserEmail(email)
    if (step) {
      setCurrentStep(Number.parseInt(step))
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("userType")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("patientStep")
    router.push("/")
  }

  const steps = [
    {
      id: 1,
      title: t("patient.step1"),
      description: t("patient.step1.desc"),
      icon: Activity,
      href: "/dashboard/patient/symptoms",
      color: "bg-red-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
    {
      id: 2,
      title: t("patient.step2"),
      description: t("patient.step2.desc"),
      icon: Calendar,
      href: "/dashboard/patient/doctor-match",
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      id: 3,
      title: t("patient.step3"),
      description: t("patient.step3.desc"),
      icon: MessageCircle,
      href: "/dashboard/patient/consultation",
      color: "bg-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">{t("patient.welcome")}</h1>
                <p className="text-sm text-muted-foreground">{userEmail}</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              {t("logout")}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Message */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("patient.welcome")}</h2>
            <p className="text-lg text-muted-foreground">Follow these 3 simple steps to get medical help</p>
          </div>

          {/* Simple 3-Step Process */}
          <div className="space-y-6">
            {steps.map((step, index) => {
              const isCompleted = step.id < currentStep
              const isCurrent = step.id === currentStep
              const isLocked = step.id > currentStep

              return (
                <Card
                  key={step.id}
                  className={`relative overflow-hidden transition-all hover:shadow-lg ${
                    isCurrent
                      ? `${step.bgColor} ${step.borderColor} border-2`
                      : isCompleted
                        ? "bg-green-50 border-green-200 border-2"
                        : "border-gray-200"
                  }`}
                >
                  <CardContent className="p-8">
                    <div className="flex items-center gap-6">
                      {/* Step Number & Icon */}
                      <div className="flex-shrink-0">
                        <div
                          className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold ${
                            isCompleted ? "bg-green-500" : isCurrent ? step.color : "bg-gray-300"
                          }`}
                        >
                          {isCompleted ? <CheckCircle className="h-10 w-10" /> : <step.icon className="h-10 w-10" />}
                        </div>
                      </div>

                      {/* Step Content */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                        <p className="text-lg text-muted-foreground mb-4">{step.description}</p>

                        {/* Action Button */}
                        <div className="flex items-center gap-4">
                          {isCompleted ? (
                            <Badge variant="secondary" className="text-lg px-4 py-2">
                              {t("patient.completed")}
                            </Badge>
                          ) : isCurrent ? (
                            <Link href={step.href}>
                              <Button size="lg" className={`text-lg px-8 py-4 ${step.color} hover:opacity-90`}>
                                {step.id === 1 ? t("patient.start") : t("patient.continue")}
                                <ChevronRight className="ml-2 h-5 w-5" />
                              </Button>
                            </Link>
                          ) : (
                            <Button size="lg" disabled className="text-lg px-8 py-4">
                              {t("loading")}
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Step Number Badge */}
                      <div className="absolute top-4 right-4">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                            isCompleted ? "bg-green-500" : isCurrent ? step.color : "bg-gray-300"
                          }`}
                        >
                          {step.id}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Progress Indicator */}
          <div className="mt-12 text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`w-4 h-4 rounded-full ${step.id <= currentStep ? "bg-primary" : "bg-gray-300"}`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Step {currentStep} of {steps.length}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
