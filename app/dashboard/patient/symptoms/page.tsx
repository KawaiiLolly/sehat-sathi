"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Thermometer, Cog as Cough, Brain, AtomIcon as Stomach, Wind, User, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"

export default function SymptomsChecker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [userEmail, setUserEmail] = useState("")
  const router = useRouter()
  const { t } = useLanguage()

  useEffect(() => {
    const email = localStorage.getItem("userEmail")
    const userType = localStorage.getItem("userType")

    if (!email || userType !== "patient") {
      router.push("/auth/patient")
      return
    }

    setUserEmail(email)

    // Load previously selected symptoms if any
    const savedSymptoms = localStorage.getItem("selectedSymptoms")
    if (savedSymptoms) {
      setSelectedSymptoms(JSON.parse(savedSymptoms))
    }
  }, [router])

  const symptoms = [
    {
      id: "fever",
      name: t("symptoms.fever"),
      icon: Thermometer,
      color: "bg-red-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      description: "High body temperature, feeling hot",
    },
    {
      id: "cough",
      name: t("symptoms.cough"),
      icon: Cough,
      color: "bg-orange-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      description: "Dry or wet cough, throat irritation",
    },
    {
      id: "headache",
      name: t("symptoms.headache"),
      icon: Brain,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      description: "Pain in head, dizziness",
    },
    {
      id: "stomach",
      name: t("symptoms.stomach"),
      icon: Stomach,
      color: "bg-yellow-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      description: "Stomach pain, nausea, vomiting",
    },
    {
      id: "cold",
      name: t("symptoms.cold"),
      icon: Wind,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      description: "Runny nose, sneezing, congestion",
    },
    {
      id: "bodyache",
      name: t("symptoms.bodyache"),
      icon: User,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      description: "Body pain, muscle aches, weakness",
    },
  ]

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms((prev) => {
      const newSymptoms = prev.includes(symptomId) ? prev.filter((id) => id !== symptomId) : [...prev, symptomId]

      // Save to localStorage
      localStorage.setItem("selectedSymptoms", JSON.stringify(newSymptoms))
      return newSymptoms
    })
  }

  const handleNext = () => {
    if (selectedSymptoms.length === 0) {
      alert("Please select at least one symptom")
      return
    }

    // Generate AI analysis based on symptoms
    const analysisData = generateAIAnalysis(selectedSymptoms)
    localStorage.setItem("aiAnalysis", JSON.stringify(analysisData))
    localStorage.setItem("patientStep", "2")

    // Redirect to doctor matching
    router.push("/dashboard/patient/doctor-match")
  }

  const generateAIAnalysis = (symptoms: string[]) => {
    // Simple AI analysis logic based on symptoms
    let urgency = "low"
    let condition = "Common cold"
    let recommendations = ["Rest and hydration", "Monitor symptoms"]

    if (symptoms.includes("fever")) {
      urgency = "medium"
      if (symptoms.includes("cough")) {
        condition = "Possible viral infection"
        recommendations = ["Rest", "Drink fluids", "Monitor temperature", "Consult doctor if fever persists"]
      }
    }

    if (symptoms.includes("stomach") && symptoms.includes("fever")) {
      urgency = "high"
      condition = "Possible gastroenteritis"
      recommendations = ["Immediate medical attention", "Stay hydrated", "Avoid solid foods"]
    }

    if (symptoms.includes("headache") && symptoms.includes("fever")) {
      urgency = "high"
      condition = "Possible infection requiring medical attention"
      recommendations = ["Seek immediate medical care", "Monitor symptoms closely"]
    }

    return {
      symptoms,
      urgency,
      condition,
      recommendations,
      timestamp: new Date().toISOString(),
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard/patient">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t("back")}
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-semibold">{t("symptoms.title")}</h1>
                <p className="text-sm text-muted-foreground">{userEmail}</p>
              </div>
            </div>
            <Badge variant="secondary">Step 1 of 3</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{t("symptoms.title")}</h2>
            <p className="text-xl text-muted-foreground">{t("symptoms.subtitle")}</p>
          </div>

          {/* Symptoms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {symptoms.map((symptom) => {
              const isSelected = selectedSymptoms.includes(symptom.id)

              return (
                <Card
                  key={symptom.id}
                  className={`cursor-pointer transition-all hover:shadow-lg transform hover:scale-105 ${
                    isSelected
                      ? `${symptom.bgColor} ${symptom.borderColor} border-2`
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => toggleSymptom(symptom.id)}
                >
                  <CardContent className="p-8 text-center">
                    {/* Icon */}
                    <div className="mb-6">
                      <div
                        className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-white ${
                          isSelected ? symptom.color : "bg-gray-300"
                        }`}
                      >
                        <symptom.icon className="h-10 w-10" />
                      </div>
                    </div>

                    {/* Symptom Name */}
                    <h3 className="text-2xl font-bold mb-3">{symptom.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{symptom.description}</p>

                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">Selected</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Selected Symptoms Summary */}
          {selectedSymptoms.length > 0 && (
            <div className="mb-8">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Selected Symptoms:</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSymptoms.map((symptomId) => {
                      const symptom = symptoms.find((s) => s.id === symptomId)
                      return (
                        <Badge key={symptomId} variant="secondary" className="text-sm px-3 py-1">
                          {symptom?.name}
                        </Badge>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Next Button */}
          <div className="text-center">
            <Button
              size="lg"
              onClick={handleNext}
              disabled={selectedSymptoms.length === 0}
              className="text-xl px-12 py-6 bg-primary hover:bg-primary/90"
            >
              {t("symptoms.next")}
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
