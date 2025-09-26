"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, ArrowLeft, Calendar, User } from "lucide-react"
import Link from "next/link"

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState<any[]>([])
  const [latestPrescription, setLatestPrescription] = useState<any>(null)

  useEffect(() => {
    // Get the latest prescription from consultation
    const latest = localStorage.getItem("latestPrescription")
    if (latest) {
      setLatestPrescription(JSON.parse(latest))
    }

    // Get all prescriptions (in a real app, this would come from a database)
    const allPrescriptions = []

    // Add the latest prescription if it exists
    if (latest) {
      allPrescriptions.push({
        ...JSON.parse(latest),
        status: "active",
      })
    }

    // Add some sample historical prescriptions for demo
    const samplePrescriptions = [
      {
        id: Date.now() - 86400000, // Yesterday
        doctorName: "Dr. Michael Chen",
        date: new Date(Date.now() - 86400000).toLocaleDateString(),
        medications: [
          {
            name: "Ibuprofen",
            dosage: "400mg",
            frequency: "2 times daily",
            duration: "3 days",
            instructions: "Take with food to avoid stomach upset",
          },
        ],
        status: "completed",
        notes: "For pain relief. Avoid on empty stomach.",
        condition: "Muscle pain",
        symptoms: ["bodyache", "stiffness"],
      },
      {
        id: Date.now() - 604800000, // Last week
        doctorName: "Dr. Sarah Johnson",
        date: new Date(Date.now() - 604800000).toLocaleDateString(),
        medications: [
          {
            name: "Amoxicillin",
            dosage: "500mg",
            frequency: "3 times daily",
            duration: "7 days",
            instructions: "Take with food. Complete the full course.",
          },
          {
            name: "Paracetamol",
            dosage: "500mg",
            frequency: "As needed for fever",
            duration: "5 days",
            instructions: "Do not exceed 4 doses in 24 hours",
          },
        ],
        status: "completed",
        notes: "Take with food. Complete the full course of antibiotics.",
        condition: "Upper Respiratory Infection",
        symptoms: ["fever", "cough", "cold"],
      },
    ]

    // Only add sample prescriptions if no real prescription exists
    if (!latest) {
      allPrescriptions.push(...samplePrescriptions)
    } else {
      // Add sample prescriptions as historical data
      allPrescriptions.push(...samplePrescriptions)
    }

    setPrescriptions(allPrescriptions)
  }, [])

  const handleDownloadPrescription = (prescription: any) => {
    const prescriptionText = `
PRESCRIPTION
Doctor: ${prescription.doctorName}
Date: ${prescription.date}
Patient Condition: ${prescription.condition || "General consultation"}

MEDICATIONS:
${prescription.medications
  .map(
    (med: any, index: number) =>
      `${index + 1}. ${med.name} - ${med.dosage}
     Frequency: ${med.frequency}
     Duration: ${med.duration}
     Instructions: ${med.instructions || "Take as directed"}`,
  )
  .join("\n\n")}

DOCTOR'S NOTES:
${prescription.notes}

${prescription.symptoms ? `Symptoms Treated: ${prescription.symptoms.join(", ")}` : ""}
    `

    // Create and download the prescription
    const blob = new Blob([prescriptionText], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `prescription-${prescription.date.replace(/\//g, "-")}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)

    alert("Prescription downloaded successfully!")
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link
            href="/dashboard/patient"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <FileText className="h-6 w-6" />
                My Prescriptions
              </CardTitle>
              <CardDescription>View and download your medical prescriptions</CardDescription>
            </CardHeader>
          </Card>

          {latestPrescription && (
            <Card className="border-2 border-primary/20 bg-primary/5">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Badge className="bg-primary">Latest</Badge>
                      Prescription from Recent Consultation
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {latestPrescription.doctorName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {latestPrescription.date}
                      </span>
                    </CardDescription>
                  </div>
                  <Badge className="bg-green-500">Active</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm font-medium text-blue-800">Condition: {latestPrescription.condition}</p>
                  {latestPrescription.symptoms && (
                    <p className="text-xs text-blue-600 mt-1">
                      Based on symptoms: {latestPrescription.symptoms.join(", ")}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  {latestPrescription.medications.map((med: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg bg-white">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-lg">{med.name}</h4>
                        <Badge variant="outline">{med.dosage}</Badge>
                      </div>
                      <div className="grid md:grid-cols-2 gap-2 text-sm">
                        <p>
                          <span className="font-medium">Frequency:</span> {med.frequency}
                        </p>
                        <p>
                          <span className="font-medium">Duration:</span> {med.duration}
                        </p>
                      </div>
                      <p className="text-sm mt-2">
                        <span className="font-medium">Instructions:</span> {med.instructions}
                      </p>
                    </div>
                  ))}
                </div>

                {latestPrescription.notes && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm">
                      <span className="font-medium">Doctor's Notes:</span> {latestPrescription.notes}
                    </p>
                  </div>
                )}

                <div className="flex gap-2 flex-wrap">
                  <Button onClick={() => handleDownloadPrescription(latestPrescription)}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Prescription
                  </Button>
                  <Button variant="outline">Send to Pharmacy</Button>
                  <Button variant="outline">Set Medication Reminder</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-6">
            <h3 className="text-lg font-semibold">All Prescriptions</h3>
            {prescriptions.map((prescription) => (
              <Card key={prescription.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Prescription from {prescription.doctorName}</CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {prescription.date}
                        </span>
                        {prescription.condition && <span>Condition: {prescription.condition}</span>}
                      </CardDescription>
                    </div>
                    <Badge className={prescription.status === "active" ? "bg-green-500" : "bg-gray-500"}>
                      {prescription.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {prescription.medications.map((med: any, index: number) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold">{med.name}</h4>
                          <Badge variant="outline">{med.dosage}</Badge>
                        </div>
                        <div className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <p>Frequency: {med.frequency}</p>
                          <p>Duration: {med.duration}</p>
                        </div>
                        {med.instructions && (
                          <p className="text-sm mt-2">
                            <span className="font-medium">Instructions:</span> {med.instructions}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {prescription.notes && (
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm">
                        <span className="font-medium">Doctor's Notes:</span> {prescription.notes}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleDownloadPrescription(prescription)}>
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                    <Button size="sm" variant="outline">
                      Send to Pharmacy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {prescriptions.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Prescriptions Yet</h3>
                <p className="text-muted-foreground mb-4">Complete a consultation to receive your first prescription</p>
                <Link href="/dashboard/patient">
                  <Button>Start Consultation</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
  )
}
