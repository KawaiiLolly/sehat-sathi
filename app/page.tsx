import { HeroSection } from "@/components/hero-section"
import { ModesSection } from "@/components/modes-section"
import { PatientJourneySection } from "@/components/patient-journey-section"
import { FeaturesSection } from "@/components/features-section"
import { ImpactSection } from "@/components/impact-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <ModesSection />
      <PatientJourneySection />
      <FeaturesSection />
      <ImpactSection />
      <Footer />
    </main>
  )
}
