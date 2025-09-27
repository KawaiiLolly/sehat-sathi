"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "hi" | "pa"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Homepage - Government Style
    "hero.title": "SEHAT SATHI Healthcare Initiative",
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
  pa: {
    // Homepage - Government Style
    "hero.title": "ਡਿਜ਼ਿਟਲ ਇੰਡੀਆ ਸਿਹਤ ਪਹਿਲ",
    "hero.subtitle": "AI-ਚਲਿਤ ਟੈਲੀਮੇਡਿਸਿਨ ਹੱਲਾਂ ਨਾਲ ਪਿੰਡਾਂ ਦੀਆਂ ਕਮਿਊਨਿਟੀਆਂ ਨੂੰ ਸਸ਼ਕਤ ਕਰਨਾ",
    "hero.cta": "ਹੁਣ ਹੀ ਸਿਹਤ ਸੇਵਾਵਾਂ ਪ੍ਰਾਪਤ ਕਰੋ",
    "hero.demo": "ਡੈਮੋ ਵੇਖੋ",
    "hero.secure": "ਸਰਕਾਰੀ ਪ੍ਰਮਾਣਿਤ",
    "hero.ai": "AI-ਚਲਿਤ ਨਿਧਾਨ",
    "hero.live": "24/7 ਉਪਲਬਧ",

    // Government Stats
    "stats.patients": "ਸੇਵਾ ਪ੍ਰਾਪਤ ਮਰੀਜ਼",
    "stats.doctors": "ਰਜਿਸਟਰਡ ਡਾਕਟਰ",
    "stats.consultations": "ਸੰਪਰਕ ਪੂਰੇ ਹੋਏ",
    "stats.villages": "ਜੁੜੇ ਪਿੰਡ",

    // Government Features
    "govt.initiative": "ਇੱਕ ਸਮਾਰਟ ਇੰਡੀਆ ਹੈਕਾਥਾਨ ਪਹਿਲ",
    "govt.ministry": "ਸਿਹਤ ਅਤੇ ਪਰਿਵਾਰ ਕਲਿਆਣ ਮੰਤਰਾਲਾ",
    "govt.digital": "ਡਿਜ਼ਿਟਲ ਇੰਡੀਆ ਮਿਸ਼ਨ",
    "govt.certified": "ਸਰਕਾਰੀ ਪ੍ਰਮਾਣਿਤ ਪਲੇਟਫਾਰਮ",

    // Navigation
    "nav.home": "ਹੋਮ",
    "nav.about": "ਪਹਿਲ ਬਾਰੇ",
    "nav.contact": "ਸਹਾਇਤਾ ਸੰਪਰਕ",
    "nav.portal": "ਸਿਹਤ ਪੋਰਟਲ",

    // Get Started Page
    "getStarted.title": "ਆਪਣੀ ਭੂਮਿਕਾ ਚੁਣੋ",
    "getStarted.subtitle": "ਚੁਣੋ ਕਿ ਤੁਸੀਂ ਸਿਹਤ ਸਾਥੀ ਨੂੰ ਕਿਵੇਂ ਵਰਤਣਾ ਚਾਹੁੰਦੇ ਹੋ",
    "patient.title": "ਮਰੀਜ਼",
    "patient.description": "ਯੋਗ ਡਾਕਟਰਾਂ ਤੋਂ ਸਲਾਹ ਲਵੋ",
    "doctor.title": "ਡਾਕਟਰ",
    "doctor.description": "ਮਰੀਜ਼ਾਂ ਨੂੰ ਸਲਾਹ ਪ੍ਰਦਾਨ ਕਰੋ",
    "pharmacy.title": "ਫਾਰਮੇਸੀ",
    "pharmacy.description": "ਨੁਸਖ਼ਿਆਂ ਅਤੇ ਦਵਾਈਆਂ ਦੀ ਸੂਚੀ ਸੰਭਾਲੋ",

    // Patient Dashboard - Simple
    "patient.welcome": "ਤੁਹਾਡੇ ਸਿਹਤ ਸੇਵਾ ਵਿੱਚ ਸੁਆਗਤ ਹੈ",
    "patient.step1": "ਸਾਨੂੰ ਆਪਣੀ ਸਮੱਸਿਆ ਦੱਸੋ",
    "patient.step1.desc": "ਅੱਜ ਤੁਹਾਨੂੰ ਕੀ ਤੰਗ ਕਰ ਰਿਹਾ ਹੈ?",
    "patient.step2": "ਡਾਕਟਰ ਲੱਭੋ",
    "patient.step2.desc": "ਅਸੀਂ ਤੁਹਾਡੇ ਲਈ ਸਹੀ ਡਾਕਟਰ ਲੱਭਾਂਗੇ",
    "patient.step3": "ਡਾਕਟਰ ਨਾਲ ਗੱਲ ਕਰੋ",
    "patient.step3.desc": "ਡਾਕਟਰ ਨਾਲ ਵੀਡੀਓ ਕਾਲ ਕਰੋ ਅਤੇ ਦਵਾਈ ਲਵੋ",
    "patient.start": "ਇੱਥੋਂ ਸ਼ੁਰੂ ਕਰੋ",
    "patient.continue": "ਜਾਰੀ ਰੱਖੋ",
    "patient.completed": "ਮੁਕੰਮਲ",

    // Symptoms
    "symptoms.title": "ਤੁਹਾਡੀ ਸਮੱਸਿਆ ਕੀ ਹੈ?",
    "symptoms.subtitle": "ਜੋ ਤੁਸੀਂ ਮਹਿਸੂਸ ਕਰ ਰਹੇ ਹੋ, ਉਸ 'ਤੇ ਕਲਿੱਕ ਕਰੋ",
    "symptoms.fever": "ਬੁਖਾਰ",
    "symptoms.cough": "ਖੰਘ",
    "symptoms.headache": "ਸਿਰ ਦਰਦ",
    "symptoms.stomach": "ਪੇਟ ਦਰਦ",
    "symptoms.cold": "ਜ਼ੁਕਾਮ",
    "symptoms.bodyache": "ਸ਼ਰੀਰ ਦਰਦ",
    "symptoms.next": "ਅਗਲਾ ਕਦਮ",

    // Common
    logout: "ਲਾਗਆਉਟ",
    back: "ਵਾਪਸ",
    next: "ਅੱਗੇ",
    loading: "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["en", "hi", "pa"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    } else {
      setLanguage("pa") // fallback
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    const dict = translations[language] || translations.pa
    return dict[key as keyof typeof dict] || key
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
