"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Video, Shield, Brain, Clock, Award, Users, MapPin } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "./language-switcher"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                {t("govt.initiative")}
              </span>
              <span className="hidden md:block">|</span>
              <span className="hidden md:block">{t("govt.ministry")}</span>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <div className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {/* Government badge */}
              <div className="inline-flex items-center gap-2 bg-government-orange/10 text-government-orange px-4 py-2 rounded-full text-sm font-medium border border-government-orange/20">
                <Award className="h-4 w-4" />
                {t("govt.digital")}
              </div>

              <div className="space-y-6">
                <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight bg-gradient-to-r from-primary via-government-orange to-accent bg-clip-text text-transparent">
                  {t("hero.title")}
                </h1>
                <p className="text-xl text-muted-foreground text-pretty leading-relaxed">{t("hero.subtitle")}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/get-started">
                  <Button size="lg" className="text-lg px-8 py-6 w-full sm:w-auto bg-primary hover:bg-primary/90">
                    {t("hero.cta")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 border-primary text-primary  bg-transparent"
                >
                  {t("hero.demo")}
                  <Video className="ml-2 h-5 w-5" />
                </Button>
              </div>

              {/* Government trust indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-card p-3 rounded-lg border">
                  <Shield className="h-4 w-4 text-success" />
                  {t("hero.secure")}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-card p-3 rounded-lg border">
                  <Brain className="h-4 w-4 text-government-orange" />
                  {t("hero.ai")}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-card p-3 rounded-lg border">
                  <Clock className="h-4 w-4 text-accent" />
                  {t("hero.live")}
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-card rounded-2xl p-8 shadow-2xl border-2 border-primary/10">
                <div className="aspect-video bg-gradient-to-br from-primary/10 via-government-orange/5 to-accent/10 rounded-xl flex items-center justify-center relative overflow-hidden">
                  <img
                    src="/telemedicine-doctor-patient-video-call-consultatio.jpg"
                    alt="Government telemedicine consultation platform"
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-xl" />
                </div>

                {/* Government certification badge */}
                <div className="absolute -top-4 -right-4 bg-success text-success-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg border-2 border-background">
                  <div className="flex items-center gap-1">
                    <Award className="h-3 w-3" />
                    {t("govt.certified")}
                  </div>
                </div>

                {/* Live stats overlay */}
                <div className="absolute -bottom-4 -left-4 bg-card border-2 border-primary/20 rounded-lg p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-sm">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-primary">2.5M+</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-4 w-4 text-accent" />
                      <span className="font-semibold text-accent">15K+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold mb-2">2.5M+</div>
              <div className="text-primary-foreground/80">{t("stats.patients")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold mb-2">1K+</div>
              <div className="text-primary-foreground/80">{t("stats.doctors")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold mb-2">850K+</div>
              <div className="text-primary-foreground/80">{t("stats.consultations")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold mb-2">15K+</div>
              <div className="text-primary-foreground/80">{t("stats.villages")}</div>
            </div>
          </div>
        </div>
      </div> */}
    </section>
  )
}
