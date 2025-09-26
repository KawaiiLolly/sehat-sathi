"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, ArrowLeft, Video } from "lucide-react"
import Link from "next/link"

export default function AppointmentsPage() {
  const appointments = [
    {
      id: 1,
      doctorName: "Dr. Sarah Johnson",
      specialty: "General Medicine",
      date: "Today",
      time: "2:00 PM",
      type: "Video Consultation",
      status: "confirmed",
    },
    {
      id: 2,
      doctorName: "Dr. Michael Chen",
      specialty: "Internal Medicine",
      date: "Tomorrow",
      time: "10:30 AM",
      type: "Follow-up",
      status: "pending",
    },
  ]

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
                <Calendar className="h-6 w-6" />
                My Appointments
              </CardTitle>
              <CardDescription>View and manage your upcoming medical appointments</CardDescription>
            </CardHeader>
          </Card>

          <div className="space-y-4">
            {appointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{appointment.doctorName}</h3>
                        <p className="text-muted-foreground">{appointment.specialty}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-4 w-4" />
                            {appointment.date}
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Clock className="h-4 w-4" />
                            {appointment.time}
                          </div>
                          <Badge variant="outline">{appointment.type}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge className={appointment.status === "confirmed" ? "bg-green-500" : "bg-orange-500"}>
                        {appointment.status}
                      </Badge>
                      <div>
                        <Button size="sm">
                          <Video className="mr-2 h-4 w-4" />
                          Join Call
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardContent className="p-6 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Book New Appointment</h3>
              <p className="text-muted-foreground mb-4">Schedule a consultation with one of our healthcare providers</p>
              <Link href="/dashboard/patient/symptoms">
                <Button>Start Symptom Check</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
