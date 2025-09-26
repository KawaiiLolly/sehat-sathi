"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "hi" | "bn"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Homepage - Government Style
    "hero.title": "Digital India Healthcare Initiative",
    "hero.subtitle": "Empowering Rural Communities with AI-Powered Telemedicine Solutions",
    "hero.cta": "Access Healthcare Now",
    "hero.demo": "Watch Demo",
    "hero.secure": "Government Certified",
    "hero.ai": "AI-Powered Diagnosis",
    "hero.live": "24/7 Available",

    // Government Stats
    "stats.patients": "Patients Served",
    "stats.doctors": "Registered Doctors",
    "stats.consultations": "Consultations Completed",
    "stats.villages": "Villages Connected",

    // Government Features
    "govt.initiative": "A Smart India Hackathon Initiative",
    "govt.ministry": "Ministry of Health & Family Welfare",
    "govt.digital": "Digital India Mission",
    "govt.certified": "Government Certified Platform",

    // Navigation
    "nav.home": "Home",
    "nav.about": "About Initiative",
    "nav.contact": "Contact Support",
    "nav.portal": "Healthcare Portal",

    // Homepage
    // "hero.title": "AI-Powered Healthcare for Rural Communities",
    // "hero.subtitle": "Connecting patients with doctors through intelligent telemedicine solutions",
    // "hero.cta": "Get Started",
    // "nav.home": "Home",
    // "nav.about": "About",
    // "nav.contact": "Contact",

    // Get Started Page
    "getStarted.title": "Choose Your Role",
    "getStarted.subtitle": "Select how you want to use Sehat Sathi",
    "patient.title": "Patient",
    "patient.description": "Get medical consultation from qualified doctors",
    "doctor.title": "Doctor",
    "doctor.description": "Provide medical consultation to patients",
    "pharmacy.title": "Pharmacy",
    "pharmacy.description": "Manage prescriptions and medicine inventory",

    // Patient Dashboard - Simple
    "patient.welcome": "Welcome to Your Health Care",
    "patient.step1": "Tell Us Your Problem",
    "patient.step1.desc": "What is bothering you today?",
    "patient.step2": "Find a Doctor",
    "patient.step2.desc": "We will find the right doctor for you",
    "patient.step3": "Talk to Doctor",
    "patient.step3.desc": "Video call with doctor and get medicine",
    "patient.start": "Start Here",
    "patient.continue": "Continue",
    "patient.completed": "Done",

    // Symptoms
    "symptoms.title": "What is Your Problem?",
    "symptoms.subtitle": "Click on what you feel",
    "symptoms.fever": "Fever",
    "symptoms.cough": "Cough",
    "symptoms.headache": "Head Pain",
    "symptoms.stomach": "Stomach Pain",
    "symptoms.cold": "Cold",
    "symptoms.bodyache": "Body Pain",
    "symptoms.next": "Next Step",

    // Common
    logout: "Logout",
    back: "Back",
    next: "Next",
    loading: "Loading...",
  },
  hi: {
    // Homepage - Government Style
    "hero.title": "डिजिटल इंडिया स्वास्थ्य पहल",
    "hero.subtitle": "AI-संचालित टेलीमेडिसिन समाधानों के साथ ग्रामीण समुदायों को सशक्त बनाना",
    "hero.cta": "अभी स्वास्थ्य सेवा प्राप्त करें",
    "hero.demo": "डेमो देखें",
    "hero.secure": "सरकारी प्रमाणित",
    "hero.ai": "AI-संचालित निदान",
    "hero.live": "24/7 उपलब्ध",

    // Government Stats
    "stats.patients": "सेवा प्राप्त मरीज",
    "stats.doctors": "पंजीकृत डॉक्टर",
    "stats.consultations": "पूर्ण परामर्श",
    "stats.villages": "जुड़े गांव",

    // Government Features
    "govt.initiative": "एक स्मार्ट इंडिया हैकाथॉन पहल",
    "govt.ministry": "स्वास्थ्य और परिवार कल्याण मंत्रालय",
    "govt.digital": "डिजिटल इंडिया मिशन",
    "govt.certified": "सरकारी प्रमाणित प्लेटफॉर्म",

    // Navigation
    "nav.home": "होम",
    "nav.about": "पहल के बारे में",
    "nav.contact": "सहायता संपर्क",
    "nav.portal": "स्वास्थ्य पोर्टल",

    // Homepage
    // "hero.title": "ग्रामीण समुदायों के लिए AI-संचालित स्वास्थ्य सेवा",
    // "hero.subtitle": "बुद्धिमान टेलीमेडिसिन समाधानों के माध्यम से मरीजों को डॉक्टरों से जोड़ना",
    // "hero.cta": "शुरू करें",
    // "nav.home": "होम",
    // "nav.about": "हमारे बारे में",
    // "nav.contact": "संपर्क",

    // Get Started Page
    "getStarted.title": "अपनी भूमिका चुनें",
    "getStarted.subtitle": "चुनें कि आप सेहत साथी का उपयोग कैसे करना चाहते हैं",
    "patient.title": "मरीज",
    "patient.description": "योग्य डॉक्टरों से चिकित्सा सलाह लें",
    "doctor.title": "डॉक्टर",
    "doctor.description": "मरीजों को चिकित्सा सलाह प्रदान करें",
    "pharmacy.title": "दवाखाना",
    "pharmacy.description": "नुस्खे और दवा की सूची का प्रबंधन करें",

    // Patient Dashboard - Simple
    "patient.welcome": "आपकी स्वास्थ्य सेवा में आपका स्वागत है",
    "patient.step1": "अपनी समस्या बताएं",
    "patient.step1.desc": "आज आपको क्या परेशानी है?",
    "patient.step2": "डॉक्टर खोजें",
    "patient.step2.desc": "हम आपके लिए सही डॉक्टर ढूंढेंगे",
    "patient.step3": "डॉक्टर से बात करें",
    "patient.step3.desc": "डॉक्टर से वीडियो कॉल करें और दवा लें",
    "patient.start": "यहाँ शुरू करें",
    "patient.continue": "आगे बढ़ें",
    "patient.completed": "पूरा हुआ",

    // Symptoms
    "symptoms.title": "आपकी समस्या क्या है?",
    "symptoms.subtitle": "जो आप महसूस कर रहे हैं उस पर क्लिक करें",
    "symptoms.fever": "बुखार",
    "symptoms.cough": "खांसी",
    "symptoms.headache": "सिर दर्द",
    "symptoms.stomach": "पेट दर्द",
    "symptoms.cold": "सर्दी",
    "symptoms.bodyache": "शरीर दर्द",
    "symptoms.next": "अगला कदम",

    // Common
    logout: "लॉगआउट",
    back: "वापस",
    next: "आगे",
    loading: "लोड हो रहा है...",
  },
  bn: {
    // Homepage - Government Style
    "hero.title": "ডিজিটাল ইন্ডিয়া স্বাস্থ্য উদ্যোগ",
    "hero.subtitle": "AI-চালিত টেলিমেডিসিন সমাধান দিয়ে গ্রামীণ সম্প্রদায়কে ক্ষমতায়ন",
    "hero.cta": "এখনই স্বাস্থ্যসেবা নিন",
    "hero.demo": "ডেমো দেখুন",
    "hero.secure": "সরকারি প্রত্যয়িত",
    "hero.ai": "AI-চালিত নির্ণয়",
    "hero.live": "২৪/৭ উপলব্ধ",

    // Government Stats
    "stats.patients": "সেবাপ্রাপ্ত রোগী",
    "stats.doctors": "নিবন্ধিত ডাক্তার",
    "stats.consultations": "সম্পন্ন পরামর্শ",
    "stats.villages": "সংযুক্ত গ্রাম",

    // Government Features
    "govt.initiative": "একটি স্মার্ট ইন্ডিয়া হ্যাকাথন উদ্যোগ",
    "govt.ministry": "স্বাস্থ্য ও পরিবার কল্যাণ মন্ত্রণালয়",
    "govt.digital": "ডিজিটাল ইন্ডিয়া মিশন",
    "govt.certified": "সরকারি প্রত্যয়িত প্ল্যাটফর্ম",

    // Navigation
    "nav.home": "হোম",
    "nav.about": "উদ্যোগ সম্পর্কে",
    "nav.contact": "সহায়তা যোগাযোগ",
    "nav.portal": "স্বাস্থ্য পোর্টাল",

    // Homepage
    // "hero.title": "গ্রামীণ সম্প্রদায়ের জন্য AI-চালিত স্বাস্থ্যসেবা",
    // "hero.subtitle": "বুদ্ধিমান টেলিমেডিসিন সমাধানের মাধ্যমে রোগীদের ডাক্তারদের সাথে সংযুক্ত করা",
    // "hero.cta": "শুরু করুন",
    // "nav.home": "হোম",
    // "nav.about": "আমাদের সম্পর্কে",
    // "nav.contact": "যোগাযোগ",

    // Get Started Page
    "getStarted.title": "আপনার ভূমিকা বেছে নিন",
    "getStarted.subtitle": "আপনি কীভাবে সেহত সাথী ব্যবহার করতে চান তা নির্বাচন করুন",
    "patient.title": "রোগী",
    "patient.description": "যোগ্য ডাক্তারদের কাছ থেকে চিকিৎসা পরামর্শ নিন",
    "doctor.title": "ডাক্তার",
    "doctor.description": "রোগীদের চিকিৎসা পরামর্শ প্রদান করুন",
    "pharmacy.title": "ফার্মেসি",
    "pharmacy.description": "প্রেসক্রিপশন এবং ওষুধের তালিকা পরিচালনা করুন",

    // Patient Dashboard - Simple
    "patient.welcome": "আপনার স্বাস্থ্য সেবায় স্বাগতম",
    "patient.step1": "আপনার সমস্যা বলুন",
    "patient.step1.desc": "আজ আপনার কী সমস্যা?",
    "patient.step2": "ডাক্তার খুঁজুন",
    "patient.step2.desc": "আমরা আপনার জন্য সঠিক ডাক্তার খুঁজে দেব",
    "patient.step3": "ডাক্তারের সাথে কথা বলুন",
    "patient.step3.desc": "ডাক্তারের সাথে ভিডিও কল করুন এবং ওষুধ নিন",
    "patient.start": "এখানে শুরু করুন",
    "patient.continue": "এগিয়ে যান",
    "patient.completed": "সম্পন্ন",

    // Symptoms
    "symptoms.title": "আপনার সমস্যা কী?",
    "symptoms.subtitle": "আপনি যা অনুভব করছেন তাতে ক্লিক করুন",
    "symptoms.fever": "জ্বর",
    "symptoms.cough": "কাশি",
    "symptoms.headache": "মাথা ব্যথা",
    "symptoms.stomach": "পেট ব্যথা",
    "symptoms.cold": "ঠান্ডা",
    "symptoms.bodyache": "শরীর ব্যথা",
    "symptoms.next": "পরবর্তী ধাপ",

    // Common
    logout: "লগআউট",
    back: "ফিরে",
    next: "পরবর্তী",
    loading: "লোড হচ্ছে...",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["en", "hi", "bn"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
