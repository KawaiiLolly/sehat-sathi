"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, User, Calendar, AlertTriangle, FileText, Video } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

export default function CaseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [notes, setNotes] = useState("")
  const [diagnosis, setDiagnosis] = useState("")

  // Mock case data - in real app, this would be fetched based on ID
  const caseData = {
    id: params.id,
    patientName: "Kabir Singh",
    age: 34,
    gender: "Male",
    symptoms: ["Fever", "Cough", "Fatigue"],
    urgency: "Medium",
    submittedAt: "2 hours ago",
    triageResult: "Upper Respiratory Infection",
    additionalInfo:
      "Patient reports symptoms started 3 days ago. Fever reaches 101°F in the evenings. Dry cough, no blood. Feeling very tired.",
    duration: "1-3 days",
    vitalSigns: {
      temperature: "101°F",
      bloodPressure: "120/80",
      heartRate: "88 bpm",
      oxygenSaturation: "98%",
    },
    medicalHistory: ["No known allergies", "Previous pneumonia in 2019", "Regular exercise, non-smoker"],
  }

  const handleStartConsultation = () => {
    router.push(`/dashboard/doctor/consultation/${params.id}`)
  }

  const handleSaveNotes = () => {
    // In real app, save to database
    console.log("Saving notes:", notes)
    console.log("Diagnosis:", diagnosis)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <Link
            href="/dashboard/doctor"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Patient Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{caseData.patientName}</CardTitle>
                      <CardDescription>
                        {caseData.age} years old • {caseData.gender} • Case #{caseData.id}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge
                    className={
                      caseData.urgency === "High"
                        ? "bg-red-500"
                        : caseData.urgency === "Medium"
                          ? "bg-orange-500"
                          : "bg-green-500"
                    }
                  >
                    {caseData.urgency} Priority
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Symptoms & AI Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Symptoms & AI Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Reported Symptoms:</h4>
                  <div className="flex flex-wrap gap-2">
                    {caseData.symptoms.map((symptom) => (
                      <Badge key={symptom} variant="secondary">
                        {symptom}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Duration:</h4>
                  <p className="text-sm">{caseData.duration}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Additional Information:</h4>
                  <p className="text-sm bg-muted p-3 rounded-lg">{caseData.additionalInfo}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    AI Preliminary Diagnosis:
                  </h4>
                  <p className="text-sm bg-orange-50 p-3 rounded-lg border border-orange-200">
                    {caseData.triageResult}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Doctor Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Clinical Notes & Diagnosis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Clinical Notes:</label>
                  <Textarea
                    placeholder="Enter your clinical observations and notes..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Final Diagnosis:</label>
                  <Textarea
                    placeholder="Enter your diagnosis and treatment plan..."
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleSaveNotes}>Save Notes</Button>
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Prescription
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={handleStartConsultation} className="w-full">
                  <Video className="mr-2 h-4 w-4" />
                  Start Video Consultation
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Follow-up
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <FileText className="mr-2 h-4 w-4" />
                  View Full History
                </Button>
              </CardContent>
            </Card>

            {/* Vital Signs */}
            <Card>
              <CardHeader>
                <CardTitle>Vital Signs</CardTitle>
                <CardDescription>Latest readings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Temperature:</span>
                  <span className="text-sm font-medium">{caseData.vitalSigns.temperature}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Blood Pressure:</span>
                  <span className="text-sm font-medium">{caseData.vitalSigns.bloodPressure}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Heart Rate:</span>
                  <span className="text-sm font-medium">{caseData.vitalSigns.heartRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">O2 Saturation:</span>
                  <span className="text-sm font-medium">{caseData.vitalSigns.oxygenSaturation}</span>
                </div>
              </CardContent>
            </Card>

            {/* Medical History */}
            <Card>
              <CardHeader>
                <CardTitle>Medical History</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {caseData.medicalHistory.map((item, index) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
