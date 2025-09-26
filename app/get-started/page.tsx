"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Stethoscope, Building2, ArrowLeft, Award } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function GetStartedPage() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12">
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center text-sm">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              {t("govt.initiative")} - {t("govt.ministry")}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8 pt-8">
          <Link
            href="/"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("back")}
          </Link>
        </div>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-government-orange/10 text-government-orange px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Award className="h-4 w-4" />
            {t("govt.digital")}
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-government-orange to-accent bg-clip-text text-transparent">
            {t("getStarted.title")}
          </h1>
          <p className="text-xl text-muted-foreground">{t("getStarted.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group bg-primary/5">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors shadow-sm">
                <User className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">{t("patient.title")}</CardTitle>
              <CardDescription className="text-base">{t("patient.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Symptom checker & triage</li>
                <li>• Video consultations</li>
                <li>• Prescription downloads</li>
                <li>• Appointment booking</li>
              </ul>
              <Link href="/auth/patient" className="block">
                <Button className="w-full" size="lg">
                  Continue as {t("patient.title")}
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-2 hover:border-accent/50 transition-all duration-300 hover:shadow-xl group bg-accent/5">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors shadow-sm">
                <Stethoscope className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-2xl">{t("doctor.title")}</CardTitle>
              <CardDescription className="text-base">{t("doctor.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Receive patient cases</li>
                <li>• Video consultations</li>
                <li>• E-prescription system</li>
                <li>• Patient history access</li>
              </ul>
              <Link href="/auth/doctor" className="block">
                <Button
                  className="w-full border-accent text-accent hover:bg-accent/5 bg-transparent"
                  size="lg"
                  variant="outline"
                >
                  Continue as {t("doctor.title")}
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-2 hover:border-government-orange/50 transition-all duration-300 hover:shadow-xl group bg-government-orange/5">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-government-orange/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-government-orange/20 transition-colors shadow-sm">
                <Building2 className="h-8 w-8 text-government-orange" />
              </div>
              <CardTitle className="text-2xl">{t("pharmacy.title")}</CardTitle>
              <CardDescription className="text-base">{t("pharmacy.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Prescription management</li>
                <li>• Inventory tracking</li>
                <li>• Order fulfillment</li>
                <li>• Patient communication</li>
              </ul>
              <Link href="/auth/pharmacy" className="block">
                <Button
                  className="w-full bg-government-orange hover:bg-government-orange/90 text-government-orange-foreground"
                  size="lg"
                >
                  Continue as {t("pharmacy.title")}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <div className="bg-card border-2 border-primary/20 rounded-lg p-6 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="h-4 w-4 text-primary" />
              <span className="font-medium text-primary">{t("govt.certified")}</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Need help choosing?{" "}
              <Link href="/contact" className="text-primary hover:underline">
                Contact our support team
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
