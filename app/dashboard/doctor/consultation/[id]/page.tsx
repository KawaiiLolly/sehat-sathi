"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  MessageCircle,
  FileText,
  User,
  ArrowLeft,
  Send,
  Plus,
  X,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function ConsultationPage() {
  const params = useParams()
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isMicOn, setIsMicOn] = useState(true)
  const [isCallActive, setIsCallActive] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "patient", message: "Hello Doctor, thank you for taking my case", time: "2:30 PM" },
    {
      id: 2,
      sender: "doctor",
      message: "Hello John, I've reviewed your symptoms. How are you feeling right now?",
      time: "2:31 PM",
    },
  ])
  const [prescriptionItems, setPrescriptionItems] = useState([
    { id: 1, medication: "", dosage: "", frequency: "", duration: "", instructions: "" },
  ])

  const patientData = {
    name: "John Doe",
    age: 34,
    symptoms: ["Fever", "Cough", "Fatigue"],
    urgency: "Medium",
  }

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        {
          id: chatMessages.length + 1,
          sender: "doctor",
          message: chatMessage,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ])
      setChatMessage("")
    }
  }

  const addPrescriptionItem = () => {
    setPrescriptionItems([
      ...prescriptionItems,
      {
        id: prescriptionItems.length + 1,
        medication: "",
        dosage: "",
        frequency: "",
        duration: "",
        instructions: "",
      },
    ])
  }

  const removePrescriptionItem = (id: number) => {
    setPrescriptionItems(prescriptionItems.filter((item) => item.id !== id))
  }

  const updatePrescriptionItem = (id: number, field: string, value: string) => {
    setPrescriptionItems(prescriptionItems.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const handleSendPrescription = () => {
    // In real app, this would send to pharmacy and patient
    alert("Prescription sent to patient and pharmacy!")
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <Link
            href={`/dashboard/doctor/case/${params.id}`}
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Case Details
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video Call Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Video Consultation</CardTitle>
                      <CardDescription>
                        {patientData.name} • {patientData.age} years old
                      </CardDescription>
                    </div>
                  </div>
                  <Badge
                    className={
                      patientData.urgency === "High"
                        ? "bg-red-500"
                        : patientData.urgency === "Medium"
                          ? "bg-orange-500"
                          : "bg-green-500"
                    }
                  >
                    {patientData.urgency} Priority
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {/* Video Interface */}
                <div className="relative bg-gray-900 rounded-lg aspect-video mb-4 overflow-hidden">
                  {isCallActive ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <User className="h-12 w-12" />
                        </div>
                        <p className="text-lg font-semibold">{patientData.name}</p>
                        <p className="text-sm opacity-75">Connected</p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center text-white">
                        <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">Call not started</p>
                        <p className="text-sm opacity-75">Click "Start Call" to begin consultation</p>
                      </div>
                    </div>
                  )}

                  {/* Doctor's video (small overlay) */}
                  {isCallActive && (
                    <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-800 rounded-lg border-2 border-white overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                            <User className="h-4 w-4" />
                          </div>
                          <p className="text-xs mt-1">You</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Call Controls */}
                <div className="flex items-center justify-center gap-4">
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
              </CardContent>
            </Card>

            {/* E-Prescription */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  E-Prescription
                </CardTitle>
                <CardDescription>Create and send prescription to patient</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {prescriptionItems.map((item, index) => (
                  <div key={item.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Medication {index + 1}</h4>
                      {prescriptionItems.length > 1 && (
                        <Button variant="ghost" size="sm" onClick={() => removePrescriptionItem(item.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <Label>Medication Name</Label>
                        <Input
                          placeholder="e.g., Amoxicillin"
                          value={item.medication}
                          onChange={(e) => updatePrescriptionItem(item.id, "medication", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Dosage</Label>
                        <Input
                          placeholder="e.g., 500mg"
                          value={item.dosage}
                          onChange={(e) => updatePrescriptionItem(item.id, "dosage", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Frequency</Label>
                        <Input
                          placeholder="e.g., 3 times daily"
                          value={item.frequency}
                          onChange={(e) => updatePrescriptionItem(item.id, "frequency", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Duration</Label>
                        <Input
                          placeholder="e.g., 7 days"
                          value={item.duration}
                          onChange={(e) => updatePrescriptionItem(item.id, "duration", e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Special Instructions</Label>
                      <Textarea
                        placeholder="e.g., Take with food, avoid alcohol"
                        value={item.instructions}
                        onChange={(e) => updatePrescriptionItem(item.id, "instructions", e.target.value)}
                        rows={2}
                      />
                    </div>
                  </div>
                ))}

                <div className="flex gap-2">
                  <Button variant="outline" onClick={addPrescriptionItem}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Medication
                  </Button>
                  <Button onClick={handleSendPrescription}>Send Prescription</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Patient Info */}
            <Card>
              <CardHeader>
                <CardTitle>Patient Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium">Current Symptoms:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {patientData.symptoms.map((symptom) => (
                      <Badge key={symptom} variant="secondary" className="text-xs">
                        {symptom}
                      </Badge>
                    ))}
                  </div>
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
                    <div key={msg.id} className={`flex ${msg.sender === "doctor" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] p-2 rounded-lg text-sm ${
                          msg.sender === "doctor" ? "bg-primary text-primary-foreground" : "bg-muted"
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

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full bg-transparent">
                  Schedule Follow-up
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Send to Specialist
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  End Consultation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
