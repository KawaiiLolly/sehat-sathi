"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  MessageCircle,
  Download,
  User,
  ArrowLeft,
  Send,
  FileText,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"

export default function PatientConsultationPage() {
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null)
  const [aiAnalysis, setAiAnalysis] = useState<any>(null)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isMicOn, setIsMicOn] = useState(true)
  const [isCallActive, setIsCallActive] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "doctor",
      message: "Hello! I've reviewed your symptoms. How are you feeling right now?",
      time: "2:30 PM",
    },
    {
      id: 2,
      sender: "patient",
      message: "Hello Doctor, I'm still feeling quite tired and the fever comes and goes",
      time: "2:31 PM",
    },
  ])
  const [prescription, setPrescription] = useState<any>(null)
  const [consultationComplete, setConsultationComplete] = useState(false)
  const [showPrescriptionInCall, setShowPrescriptionInCall] = useState(false)
  const router = useRouter()
  const { t } = useLanguage()

  useEffect(() => {
    const storedDoctor = localStorage.getItem("selectedDoctor")
    const storedAnalysis = localStorage.getItem("aiAnalysis")

    if (!storedDoctor) {
      router.push("/dashboard/patient/doctor-match")
      return
    }

    setSelectedDoctor(JSON.parse(storedDoctor))
    if (storedAnalysis) {
      setAiAnalysis(JSON.parse(storedAnalysis))
    }

    setTimeout(() => {
      generatePrescription()
    }, 8000) // Show prescription after 8 seconds
  }, [router])

  const generatePrescription = () => {
    if (!aiAnalysis) return

    const medications = []
    let notes = "Rest well, stay hydrated. Follow up if symptoms worsen."

    // Generate prescription based on symptoms
    if (aiAnalysis.symptoms.includes("fever")) {
      medications.push({
        name: "Paracetamol",
        dosage: "500mg",
        frequency: "3 times daily for fever",
        duration: "5 days",
        instructions: "Take with food. Do not exceed 4 doses in 24 hours",
      })
    }

    if (aiAnalysis.symptoms.includes("cough")) {
      medications.push({
        name: "Cough Syrup",
        dosage: "10ml",
        frequency: "3 times daily",
        duration: "7 days",
        instructions: "Take after meals",
      })
    }

    if (aiAnalysis.symptoms.includes("headache")) {
      medications.push({
        name: "Ibuprofen",
        dosage: "400mg",
        frequency: "2 times daily",
        duration: "3 days",
        instructions: "Take with food to avoid stomach upset",
      })
    }

    if (aiAnalysis.symptoms.includes("stomach")) {
      medications.push({
        name: "Antacid",
        dosage: "2 tablets",
        frequency: "After meals",
        duration: "5 days",
        instructions: "Chew tablets thoroughly",
      })
      notes = "Avoid spicy foods. Eat light meals. " + notes
    }

    if (aiAnalysis.symptoms.includes("cold")) {
      medications.push({
        name: "Decongestant",
        dosage: "1 tablet",
        frequency: "2 times daily",
        duration: "5 days",
        instructions: "Take with plenty of water",
      })
    }

    if (aiAnalysis.symptoms.includes("bodyache")) {
      medications.push({
        name: "Pain Relief Gel",
        dosage: "Apply thin layer",
        frequency: "2-3 times daily",
        duration: "7 days",
        instructions: "Apply to affected areas and massage gently",
      })
    }

    // Default medication if no specific symptoms
    if (medications.length === 0) {
      medications.push({
        name: "Multivitamin",
        dosage: "1 tablet",
        frequency: "Once daily",
        duration: "30 days",
        instructions: "Take with breakfast",
      })
    }

    const newPrescription = {
      id: Date.now(),
      medications,
      doctorName: selectedDoctor?.name || "Dr. Jasmine Kaur",
      date: new Date().toLocaleDateString(),
      notes,
      symptoms: aiAnalysis.symptoms,
      condition: aiAnalysis.condition,
    }

    setPrescription(newPrescription)
    localStorage.setItem("latestPrescription", JSON.stringify(newPrescription))
    setConsultationComplete(true)
  }

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        {
          id: chatMessages.length + 1,
          sender: "patient",
          message: chatMessage,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ])
      setChatMessage("")

      // Simulate doctor response
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            sender: "doctor",
            message: "Thank you for that information. I'll include that in my assessment.",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ])
      }, 2000)
    }
  }

  const handleDownloadPrescription = () => {
    const prescriptionText = `
PRESCRIPTION
Doctor: ${prescription.doctorName}
Date: ${prescription.date}
Patient Condition: ${prescription.condition}

MEDICATIONS:
${prescription.medications
  .map(
    (med: any, index: number) =>
      `${index + 1}. ${med.name} - ${med.dosage}
     Frequency: ${med.frequency}
     Duration: ${med.duration}
     Instructions: ${med.instructions}`,
  )
  .join("\n\n")}

DOCTOR'S NOTES:
${prescription.notes}

Symptoms Treated: ${prescription.symptoms.join(", ")}
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

  const handleConsultationEnd = () => {
    const consultationData = {
      id: Date.now(),
      patientName: "Current Patient", // In real app, this would come from user profile
      age: 30, // In real app, this would come from user profile
      symptoms: aiAnalysis?.symptoms || [],
      urgency: aiAnalysis?.urgency || "Medium",
      submittedAt: new Date().toLocaleString(),
      triageResult: aiAnalysis?.condition || "General consultation",
      consultationDate: new Date().toLocaleDateString(),
      doctorName: selectedDoctor?.name || "Dr. Jasmine Kaur",
      prescription: prescription,
      status: "completed",
    }

    // Store in doctor's case list
    const existingCases = JSON.parse(localStorage.getItem("doctorCases") || "[]")
    existingCases.push(consultationData)
    localStorage.setItem("doctorCases", JSON.stringify(existingCases))

    localStorage.setItem("patientStep", "1") // Reset for next consultation
    alert("Consultation completed successfully! You can view your prescription anytime.")
    router.push("/dashboard/patient")
  }

  const handleViewPrescription = () => {
    router.push("/dashboard/patient/prescriptions")
  }

  if (!selectedDoctor) {
    return <div>Loading...</div>
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <Link
            href="/dashboard/patient/doctor-match"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("back")}
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video Call Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <CardTitle>{t("patient.step3")}</CardTitle>
                      <CardDescription>with {selectedDoctor.name}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={consultationComplete ? "default" : "secondary"}>
                    <Clock className="mr-1 h-3 w-3" />
                    {consultationComplete ? "Completed" : "In Progress"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {/* Video Interface */}
                <div className="relative bg-gray-900 rounded-lg aspect-video mb-4 overflow-hidden">
                  {isCallActive ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <User className="h-12 w-12" />
                        </div>
                        <p className="text-lg font-semibold">{selectedDoctor.name}</p>
                        <p className="text-sm opacity-75">Connected</p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center text-white">
                        <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">Click to start video call</p>
                        <p className="text-sm opacity-75">Your doctor is ready</p>
                      </div>
                    </div>
                  )}

                  {/* Patient's video (small overlay) */}
                  {isCallActive && (
                    <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-800 rounded-lg border-2 border-white overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                            <User className="h-4 w-4" />
                          </div>
                          <p className="text-xs mt-1">You</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Call Controls */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Button
                    variant={isMicOn ? "default" : "destructive"}
                    size="lg"
                    className="rounded-full w-12 h-12 p-0"
                    onClick={() => setIsMicOn(!isMicOn)}
                  >
                    {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                  </Button>

                  <Button
                    variant={isVideoOn ? "default" : "destructive"}
                    size="lg"
                    className="rounded-full w-12 h-12 p-0"
                    onClick={() => setIsVideoOn(!isVideoOn)}
                  >
                    {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                  </Button>

                  <Button
                    variant={isCallActive ? "destructive" : "default"}
                    size="lg"
                    className="rounded-full w-16 h-12"
                    onClick={() => setIsCallActive(!isCallActive)}
                  >
                    <Phone className="h-5 w-5" />
                  </Button>
                </div>

                {prescription && (
                  <div className="border-t pt-6">
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-semibold text-green-700 mb-2">🎉 Consultation Complete!</h3>
                      <p className="text-muted-foreground">Your prescription is ready</p>
                    </div>

                    <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-green-800 flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          Your Prescription
                        </h3>
                        <Badge variant="outline" className="text-green-700 border-green-300 bg-green-50">
                          Ready to Download
                        </Badge>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 bg-white rounded-lg border border-green-200">
                          <p className="text-sm font-medium text-green-800 mb-1">Condition: {prescription.condition}</p>
                          <p className="text-xs text-green-600">Symptoms treated: {prescription.symptoms.join(", ")}</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Prescribed by {prescription.doctorName} on {prescription.date}
                          </p>
                        </div>

                        <div className="grid gap-3">
                          <h4 className="font-medium text-green-800">
                            Medications ({prescription.medications.length})
                          </h4>
                          {prescription.medications.slice(0, 3).map((med: any, index: number) => (
                            <div key={index} className="p-3 bg-white rounded-lg border border-green-200">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-green-800">{med.name}</span>
                                <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
                                  {med.dosage}
                                </span>
                              </div>
                              <p className="text-xs text-green-600">
                                {med.frequency} for {med.duration}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">{med.instructions}</p>
                            </div>
                          ))}
                          {prescription.medications.length > 3 && (
                            <p className="text-sm text-green-600 text-center py-2">
                              +{prescription.medications.length - 3} more medications in full prescription
                            </p>
                          )}
                        </div>

                        {prescription.notes && (
                          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-sm">
                              <span className="font-medium text-blue-800">Doctor's Notes:</span>
                              <span className="text-blue-700 ml-2">{prescription.notes}</span>
                            </p>
                          </div>
                        )}

                        <div className="flex gap-3 pt-4">
                          <Button
                            onClick={handleDownloadPrescription}
                            size="lg"
                            className="flex-1 bg-green-600 hover:bg-green-700"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download Prescription
                          </Button>
                          <Button
                            onClick={handleViewPrescription}
                            variant="outline"
                            size="lg"
                            className="flex-1 border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            View Full Details
                          </Button>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            Send to Pharmacy
                          </Button>
                          <Button variant="secondary" size="sm" className="flex-1" onClick={handleConsultationEnd}>
                            Complete Consultation
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Prescription */}
            {/* {prescription && !showPrescriptionInCall && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Your Prescription
                  </CardTitle>
                  <CardDescription>
                    Prescribed by {prescription.doctorName} on {prescription.date}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-blue-800">Condition: {prescription.condition}</p>
                    <p className="text-xs text-blue-600 mt-1">Based on symptoms: {prescription.symptoms.join(", ")}</p>
                  </div>

                  {prescription.medications.map((med: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg">
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

                  {prescription.notes && (
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm">
                        <span className="font-medium">Doctor's Notes:</span> {prescription.notes}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2 flex-wrap">
                    <Button onClick={handleViewPrescription} variant="default" size="lg">
                      <FileText className="mr-2 h-4 w-4" />
                      View Prescription
                    </Button>
                    <Button onClick={handleDownloadPrescription} variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button variant="outline">Send to Pharmacy</Button>
                    <Button variant="secondary" onClick={handleConsultationEnd}>
                      End Consultation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )} */}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Doctor Info */}
            <Card>
              <CardHeader>
                <CardTitle>Your Doctor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold">{selectedDoctor.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedDoctor.specialty}</p>
                  </div>
                </div>
                <div className="text-sm space-y-1">
                  <p>
                    <span className="font-medium">Experience:</span> {selectedDoctor.experience}
                  </p>
                  <p>
                    <span className="font-medium">Location:</span> {selectedDoctor.location}
                  </p>
                  {/* <p>
                    <span className="font-medium">Fee:</span> {selectedDoctor.consultationFee}
                  </p> */}
                </div>
              </CardContent>
            </Card>

            {/* Chat */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Chat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === "patient" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] p-2 rounded-lg text-sm ${
                          msg.sender === "patient" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p>{msg.message}</p>
                        <p className="text-xs opacity-75 mt-1">{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button size="sm" onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Consultation Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Consultation Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>15 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <Badge variant="secondary">In Progress</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Meeting ID:</span>
                  <span>tuv-r4bq-zsn</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
