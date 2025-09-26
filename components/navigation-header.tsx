"use client"

import { Button } from "@/components/ui/button"
import { User, Stethoscope, Building2, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function NavigationHeader() {
  const [userType, setUserType] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setUserType(localStorage.getItem("userType"))
    setUserEmail(localStorage.getItem("userEmail"))
  }, [pathname])

  const handleLogout = () => {
    localStorage.removeItem("userType")
    localStorage.removeItem("userEmail")
    router.push("/")
  }

  if (!userType || !userEmail) return null

  const getUserIcon = () => {
    switch (userType) {
      case "patient":
        return <User className="h-5 w-5 text-primary" />
      case "doctor":
        return <Stethoscope className="h-5 w-5 text-accent" />
      case "pharmacy":
        return <Building2 className="h-5 w-5 text-secondary-foreground" />
      default:
        return <User className="h-5 w-5" />
    }
  }

  const getUserColor = () => {
    switch (userType) {
      case "patient":
        return "bg-primary/10"
      case "doctor":
        return "bg-accent/10"
      case "pharmacy":
        return "bg-secondary/10"
      default:
        return "bg-muted"
    }
  }

  const getDashboardLink = () => {
    return `/dashboard/${userType}`
  }

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={getDashboardLink()}>
              <div
                className={`w-10 h-10 ${getUserColor()} rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity`}
              >
                {getUserIcon()}
              </div>
            </Link>
            <div>
              <Link href={getDashboardLink()}>
                <h1 className="font-semibold capitalize hover:text-primary transition-colors cursor-pointer">
                  {userType} Dashboard
                </h1>
              </Link>
              <p className="text-sm text-muted-foreground">{userEmail}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                Home
              </Button>
            </Link>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
