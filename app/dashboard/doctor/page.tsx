"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Stethoscope, LogOut, Users, Calendar, FileText, Video, Clock, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function DoctorDashboard() {
  const [userEmail, setUserEmail] = useState("")
  const [doctorCases, setDoctorCases] = useState([])
  const router = useRouter()

  useEffect(() => {
    const email = localStorage.getItem("userEmail")
    const userType = localStorage.getItem("userType")

    if (!email || userType !== "doctor") {
      router.push("/auth/doctor")
      return
    }

    setUserEmail(email)

    const storedCases = JSON.parse(localStorage.getItem("doctorCases") || "[]")
    setDoctorCases(storedCases)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("userType")
    localStorage.removeItem("userEmail")
    router.push("/")
  }

  const pendingCases =
    doctorCases.filter((case_: any) => case_.status !== "completed").length > 0
      ? doctorCases.filter((case_: any) => case_.status !== "completed")
      : [
          {
            id: 1,
            patientName: "Kabir Singh",
            age: 34,
            symptoms: ["Fever", "Cough", "Fatigue"],
            urgency: "Medium",
            submittedAt: "2 hours ago",
            triageResult: "Upper Respiratory Infection",
          },
          {
            id: 2,
            patientName: "Navya Kaur",
            age: 28,
            symptoms: ["Headache", "Nausea", "Dizziness"],
            urgency: "High",
            submittedAt: "30 minutes ago",
            triageResult: "Possible Migraine",
          },
          {
            id: 3,
            patientName: "Ishaan Singh",
            age: 45,
            symptoms: ["Back pain", "Stiffness"],
            urgency: "Low",
            submittedAt: "4 hours ago",
            triageResult: "Muscle Strain",
          },
        ]

  const completedCases = doctorCases.filter((case_: any) => case_.status === "completed")

  const recentPrescriptions =
    completedCases.length > 0
      ? completedCases.slice(-5).map((case_: any) => ({
          id: case_.id,
          patientName: case_.patientName,
          medication: case_.prescription?.medications?.[0]?.name || "No medication",
          date: case_.consultationDate || "Today",
          status: "Sent to pharmacy",
          prescription: case_.prescription,
        }))
      : [
          {
            id: 1,
            patientName: "Tejas Paji",
            medication: "Amoxicillin 500mg",
            date: "Today",
            status: "Sent to pharmacy",
          },
          {
            id: 2,
            patientName: "Daya Devi",
            medication: "Ibuprofen 400mg",
            date: "Yesterday",
            status: "Dispensed",
          },
        ]

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "High":
        return "text-red-600 bg-red-50 border-red-200"
      case "Medium":
        return "text-orange-600 bg-orange-50 border-orange-200"
      case "Low":
        return "text-green-600 bg-green-50 border-green-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const upcomingConsultations = [
    {
      id: 1,
      patientName: "Jane Smith",
      condition: "Follow-up on cold",
      type: "Video Consultation",
      time: "10:00 AM",
    },
    {
      id: 2,
      patientName: "Robert Jones",
      condition: "Check-up after surgery",
      type: "Video Consultation",
      time: "11:30 AM",
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                <Stethoscope className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h1 className="font-semibold">Doctor Dashboard</h1>
                <p className="text-sm text-muted-foreground">{userEmail}</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pendingCases.length}</p>
                  <p className="text-sm text-muted-foreground">Pending Cases</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-sm text-muted-foreground">Today's Appointments</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{completedCases.length}</p>
                  <p className="text-sm text-muted-foreground">Completed Today</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{doctorCases.length}</p>
                  <p className="text-sm text-muted-foreground">Total Patients</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="cases" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="cases">Pending Cases</TabsTrigger>
            <TabsTrigger value="consultations">Consultations</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="patients">Patient History</TabsTrigger>
          </TabsList>

          <TabsContent value="cases" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Cases</CardTitle>
                <CardDescription>New patient cases requiring your attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingCases.map((case_) => (
                    <div key={case_.id} className={`p-4 rounded-lg border-2 ${getUrgencyColor(case_.urgency)}`}>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold">{case_.patientName}</h3>
                            <Badge variant="outline">Age: {case_.age}</Badge>
                            <Badge
                              className={
                                case_.urgency === "High"
                                  ? "bg-red-500"
                                  : case_.urgency === "Medium"
                                    ? "bg-orange-500"
                                    : "bg-green-500"
                              }
                            >
                              {case_.urgency} Priority
                            </Badge>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Symptoms:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {case_.symptoms.map((symptom) => (
                                <Badge key={symptom} variant="secondary" className="text-xs">
                                  {symptom}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm">
                            <span className="font-medium">AI Diagnosis:</span> {case_.triageResult}
                          </p>
                          <p className="text-xs text-muted-foreground">Submitted {case_.submittedAt}</p>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/dashboard/doctor/case/${case_.id}`}>
                            <Button size="sm">Review Case</Button>
                          </Link>
                          <Link href={`/dashboard/doctor/consultation/${case_.id}`}>
                            <Button size="sm" variant="outline">
                              <Video className="mr-2 h-4 w-4" />
                              Start Consultation
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="consultations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Today's Consultations</CardTitle>
                <CardDescription>Scheduled video consultations for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingConsultations.map((consultation) => (
                    <div key={consultation.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Clock className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{consultation.patientName}</h3>
                          <p className="text-sm text-muted-foreground">{consultation.condition}</p>
                          <Badge variant="outline">{consultation.type}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{consultation.time}</p>
                        <Button size="sm" className="mt-2">
                          <Video className="mr-2 h-4 w-4" />
                          Join Call
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prescriptions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Prescriptions</CardTitle>
                <CardDescription>E-prescriptions you've issued recently</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPrescriptions.map((prescription) => (
                    <div key={prescription.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                          <FileText className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{prescription.patientName}</h3>
                          <p className="text-sm text-muted-foreground">{prescription.medication}</p>
                          <p className="text-xs text-muted-foreground">{prescription.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={prescription.status === "Dispensed" ? "default" : "secondary"}>
                          {prescription.status}
                        </Badge>
                        <div className="mt-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient History</CardTitle>
                <CardDescription>Access patient records and medical history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Patient Records</h3>
                  <p className="text-muted-foreground mb-4">
                    Search and access comprehensive patient medical histories
                  </p>
                  <Button>Search Patients</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
