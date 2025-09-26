"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Building2, LogOut, Package, FileText, Clock, CheckCircle, Search, AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PharmacyDashboard() {
  const [userEmail, setUserEmail] = useState("")
  const router = useRouter()

  useEffect(() => {
    const email = localStorage.getItem("userEmail")
    const userType = localStorage.getItem("userType")

    if (!email || userType !== "pharmacy") {
      router.push("/auth/pharmacy")
      return
    }

    setUserEmail(email)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("userType")
    localStorage.removeItem("userEmail")
    router.push("/")
  }

  // Mock data for demo
  const pendingPrescriptions = [
    {
      id: 1,
      patientName: "John Doe",
      doctorName: "Dr. Sarah Johnson",
      medications: ["Amoxicillin 500mg", "Paracetamol 500mg"],
      status: "pending",
      submittedAt: "2 hours ago",
      priority: "Medium",
    },
    {
      id: 2,
      patientName: "Alice Cooper",
      doctorName: "Dr. Michael Chen",
      medications: ["Ibuprofen 400mg"],
      status: "ready",
      submittedAt: "4 hours ago",
      priority: "Low",
    },
  ]

  const inventoryItems = [
    { id: 1, name: "Amoxicillin 500mg", stock: 150, minStock: 50, status: "in-stock" },
    { id: 2, name: "Paracetamol 500mg", stock: 25, minStock: 100, status: "low-stock" },
    { id: 3, name: "Ibuprofen 400mg", stock: 0, minStock: 50, status: "out-of-stock" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-orange-500"
      case "ready":
        return "bg-green-500"
      case "dispensed":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStockStatus = (item: any) => {
    if (item.stock === 0) return { status: "out-of-stock", color: "text-red-600 bg-red-50" }
    if (item.stock <= item.minStock) return { status: "low-stock", color: "text-orange-600 bg-orange-50" }
    return { status: "in-stock", color: "text-green-600 bg-green-50" }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                <Building2 className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div>
                <h1 className="font-semibold">Pharmacy Dashboard</h1>
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
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-sm text-muted-foreground">Pending Prescriptions</p>
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
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-sm text-muted-foreground">Ready for Pickup</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">Low Stock Items</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-sm text-muted-foreground">Total Items</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="prescriptions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="prescriptions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Prescription Management</CardTitle>
                <CardDescription>Process and fulfill patient prescriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingPrescriptions.map((prescription) => (
                    <div key={prescription.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold">{prescription.patientName}</h3>
                            <Badge className={getStatusColor(prescription.status)}>{prescription.status}</Badge>
                            <Badge variant="outline">{prescription.priority} Priority</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Prescribed by {prescription.doctorName}</p>
                          <div>
                            <p className="text-sm font-medium">Medications:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {prescription.medications.map((med, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {med}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">Submitted {prescription.submittedAt}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm">Process</Button>
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

          <TabsContent value="inventory" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Inventory Management</CardTitle>
                    <CardDescription>Track and manage medication stock levels</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search medications..." className="pl-10 w-64" />
                    </div>
                    <Button>Add Item</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inventoryItems.map((item) => {
                    const stockInfo = getStockStatus(item)
                    return (
                      <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                            <Package className="h-6 w-6 text-secondary-foreground" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">Min stock: {item.minStock} units</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">{item.stock}</p>
                          <Badge className={stockInfo.color}>{stockInfo.status}</Badge>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
                <CardDescription>Manage supplier orders and deliveries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Order Management</h3>
                  <p className="text-muted-foreground mb-4">Track orders from suppliers and manage deliveries</p>
                  <Button>Create New Order</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
