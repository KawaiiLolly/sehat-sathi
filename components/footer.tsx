import { Heart, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Sehat Sathi</span>
            </div>
            <p className="text-muted-foreground text-pretty">
              AI-powered telemedicine platform connecting rural communities with quality healthcare.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Contact Information</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>contact@sehatsathi.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Healthcare Innovation Hub, India</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href="/auth/patient" className="block hover:underline">
                Patient Portal
              </a>
              <a href="/auth/doctor" className="block hover:underline">
                Doctor Dashboard
              </a>
              <a href="/auth/pharmacy" className="block hover:underline">
                Pharmacy Dashboard
              </a>
              
            </div>
          </div>

        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>Copyright © 2025 Sehat Sathi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
