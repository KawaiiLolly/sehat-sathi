"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Star, MapPin, Clock, Stethoscope, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"

export default function DoctorMatchPage() {
  const [aiAnalysis, setAiAnalysis] = useState<any>(null)
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null)
  const router = useRouter()
  const { t } = useLanguage()

  useEffect(() => {
    const storedAnalysis = localStorage.getItem("aiAnalysis")
    if (!storedAnalysis) {
      router.push("/dashboard/patient/symptoms")
      return
    }

    setAiAnalysis(JSON.parse(storedAnalysis))
  }, [router])

  const recommendedDoctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "General Medicine",
      rating: 4.9,
      experience: "12 years",
      location: "City Hospital",
      availability: "Available now",
      consultationFee: "$50",
      languages: ["English", "Hindi"],
      image: "/doctor-female.jpg",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Internal Medicine",
      rating: 4.8,
      experience: "8 years",
      location: "Metro Clinic",
      availability: "Available in 30 mins",
      consultationFee: "$45",
      languages: ["English", "Mandarin"],
      image: "/doctor-male.jpg",
    },
    {
      id: 3,
      name: "Dr. Priya Sharma",
      specialty: "Family Medicine",
      rating: 4.7,
      experience: "15 years",
      location: "Community Health Center",
      availability: "Available in 1 hour",
      consultationFee: "$40",
      languages: ["English", "Hindi", "Gujarati"],
      image: "/doctor-female-indian.jpg",
    },
  ]

  const handleBookConsultation = () => {
    if (selectedDoctor) {
      const doctor = recommendedDoctors.find((d) => d.id === selectedDoctor)
      localStorage.setItem("selectedDoctor", JSON.stringify(doctor))
      localStorage.setItem("patientStep", "3")
      router.push("/dashboard/patient/consultation")
    }
  }

  if (!aiAnalysis) {
    return <div>Loading...</div>
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link
            href="/dashboard/patient/symptoms"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("back")}
          </Link>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{t("patient.step2")}</CardTitle>
              <CardDescription>Based on your symptoms, here are the best doctors for you</CardDescription>
            </CardHeader>
          </Card>

          {/* AI Analysis Summary */}
          <Card
            className={`border-2 ${
              aiAnalysis.urgency === "high"
                ? "border-red-200 bg-red-50"
                : aiAnalysis.urgency === "medium"
                  ? "border-orange-200 bg-orange-50"
                  : "border-green-200 bg-green-50"
            }`}
          >
            <CardHeader>
              <CardTitle className="text-lg">Your Health Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-2">Priority Level:</p>
                  <Badge
                    className={
                      aiAnalysis.urgency === "high"
                        ? "bg-red-500"
                        : aiAnalysis.urgency === "medium"
                          ? "bg-orange-500"
                          : "bg-green-500"
                    }
                  >
                    {aiAnalysis.urgency.charAt(0).toUpperCase() + aiAnalysis.urgency.slice(1)}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Possible Condition:</p>
                  <p className="text-sm">{aiAnalysis.condition}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Selected Symptoms:</p>
                <div className="flex flex-wrap gap-2">
                  {aiAnalysis.symptoms.map((symptom: string) => (
                    <Badge key={symptom} variant="outline" className="text-xs">
                      {symptom}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Doctor Cards */}
          <div className="space-y-6">
            {recommendedDoctors.map((doctor) => (
              <Card
                key={doctor.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedDoctor === doctor.id
                    ? "border-2 border-primary bg-primary/5"
                    : "border hover:border-primary/50"
                }`}
                onClick={() => setSelectedDoctor(doctor.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-10 w-10 text-accent" />
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold">{doctor.name}</h3>
                          <p className="text-muted-foreground flex items-center gap-1">
                            <Stethoscope className="h-4 w-4" />
                            {doctor.specialty}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{doctor.rating}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{doctor.experience} experience</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{doctor.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-green-600 font-medium">{doctor.availability}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-primary">{doctor.consultationFee}</span>
                          <span className="text-muted-foreground"> consultation</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Languages:</p>
                        <div className="flex gap-1">
                          {doctor.languages.map((lang) => (
                            <Badge key={lang} variant="outline" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {selectedDoctor === doctor.id && (
                        <div className="pt-3 border-t">
                          <p className="text-sm text-primary font-medium">✓ Selected for consultation</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Book Consultation Button */}
          <div className="text-center">
            <Button
              onClick={handleBookConsultation}
              size="lg"
              disabled={!selectedDoctor}
              className="text-xl px-12 py-6 bg-primary hover:bg-primary/90"
            >
              {t("patient.step3")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
