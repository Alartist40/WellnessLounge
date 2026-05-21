import { createContext, useContext, useState, type ReactNode } from 'react'

export type Language = 'en' | 'st'

interface Translations {
  [key: string]: {
    en: string
    st: string
  }
}

export const translations: Translations = {
  navHome: { en: 'Home', st: 'Gae' },
  navServices: { en: 'Services', st: 'Ditirelo' },
  navBridal: { en: 'Bridal', st: 'Bonyatsi' },
  navAbout: { en: 'About', st: 'Ka ga' },
  navContact: { en: 'Contact', st: 'Kopana' },
  heroLabel: { en: 'PHAKALANE, BOTSWANA', st: 'PHAKALANE, BOTSWANA' },
  heroTitle: { en: 'Where Beauty Meets Serenity', st: 'Fa Bontle Bo Kopaneng le Khutso' },
  heroSubtitle: { en: 'Your wellness, reimagined. Experience therapeutic massages, advanced facials, and bridal glam artistry.', st: 'Khutlolo ya gago, e tlhomiwa sešwa. Itumele dimasaage tsa phekolo, difacial tsa maemo a a kwa godimo, le bokwaledi bja bridal glam.' },
  heroCta: { en: 'Book Your Experience', st: 'Buka Tlholofofo ya Gago' },
  servicesLabel: { en: 'WHAT WE OFFER', st: 'SEO re FANA ka SONA' },
  servicesTitle: { en: 'Our Services', st: 'Ditirelo tša rena' },
  serviceMassage: { en: 'Therapeutic Massages', st: 'Dimasaage tša Phekolo' },
  serviceMassageDesc: { en: 'Swedish, deep tissue, and hot stone massages designed to release tension and restore balance.', st: 'Dimasaage tša Swedish, deep tissue, le hot stone tše di rulaganyeditšwego go lokolla bothata bjo bo tseneletšego le go bušetša tekano.' },
  serviceFacial: { en: 'Advanced Facials', st: 'Difacial tša Maemo a Kwa Godimo' },
  serviceFacialDesc: { en: 'PRP treatments, anti-aging facials, and skin rejuvenation therapies for radiant, healthy skin.', st: 'Dikemo tša PRP, difacial tša go lwantšha go tšea mengwaga, le diphekolo tša go thibolloša letlalo bakeng sa letlalo le le lebollago le le hlago.' },
  serviceWellness: { en: 'Wellness & Relaxation', st: 'Khutlolo le Boiketlo' },
  serviceWellnessDesc: { en: 'A holistic approach to beauty — body scrubs, aromatherapy, and restorative treatments.', st: 'Tsela ya bophala ya bontle — go hlakola mmele, aromatherapy, le diphekolo tša go bušetša maatla.' },
  bridalLabel1: { en: 'BRIDAL GLAM', st: 'BONYATSI' },
  bridalTitle1: { en: 'For Your Most Beautiful Day', st: 'La Tšatši la Gago le le Botse kudu' },
  bridalBody1: { en: 'From trial makeup to your walk down the aisle, we create bridal looks that feel authentic to you. Our bridal packages include traditional wedding makeup, white wedding glam, and full bridal party services.', st: 'Go tšwa go makeup ya teko go fihlela o sepela ka gare ga lefelo la bonyatsi, re bopa diitemogwa tša bonyatsi tše di ikago wa bohlokwa. Dipakeji tša rena tša bonyatsi di akaretša makeup ya lenyalo la setšo, glam ya lenyalo la sekhwama, le ditirelo tša lenyalo ka bophala.' },
  bridalPrice1: { en: 'Packages from P 1,200', st: 'Dipakeji go tšwa P 1,200' },
  bridalLabel2: { en: 'SPECIAL OCCASIONS', st: 'DIKETSO tše KGETHEGILEGO' },
  bridalTitle2: { en: 'Every Moment, Picture Perfect', st: 'Nako ye Nngwe, Seswantšho se se Botse' },
  bridalBody2: { en: 'Graduation, birthdays, proms, and celebrations — we craft makeup looks that enhance your natural beauty and photograph beautifully.', st: 'Go feleletša, matsatsi a matswalo, diprom, le diketso — re bopa diitemogwa tša makeup tše di godišago bontle bja gago bja tlhago gomme di tšoša seswantšho.' },
  bridalPrice2: { en: 'From P 300', st: 'Go tšwa P 300' },
  testimonialsTitle: { en: 'What Our Clients Say', st: 'Ba Thekišo ba rena ba Bolela Eng' },
  contactLabel: { en: 'VISIT US', st: 'ETELELA rena' },
  contactTitle: { en: 'Book Your Appointment', st: 'Buka Tiragalo ya Gago' },
  contactBody: { en: 'We operate by appointment only. A 40% non-refundable fee is required to secure your booking. Walk in and experience the E\u0026P difference.', st: 'Re šoma ka tiragalo feela. Tefo ya 40% yeo e sa bušetšwego ye a hlokegago go tiišeta buk ya gago. Tsena gomme o itumele phapang ya E\u0026P.' },
  contactPhone: { en: 'Phone', st: 'Mogala' },
  contactWhatsApp: { en: 'WhatsApp', st: 'WhatsApp' },
  contactLocation: { en: 'Location', st: 'Lefelo' },
  formName: { en: 'Your Name', st: 'Leina la Gago' },
  formPhone: { en: 'Phone Number', st: 'Nomoro ya Mogala' },
  formService: { en: 'Select Service', st: 'Kgetha Tirelo' },
  formDate: { en: 'Preferred Date', st: 'Letšatši leo le Rategago' },
  formMessage: { en: 'Additional Message', st: 'Molaetša wa Tlatsetšo' },
  formSubmit: { en: 'Send Booking Request', st: 'Romela Kgopelo ya Buka' },
  serviceMassageOpt: { en: 'Massage Therapy', st: 'Kalafo ya Masaage' },
  serviceFacialOpt: { en: 'Advanced Facial', st: 'Facial ya Maemo a Kwa Godimo' },
  serviceBridalOpt: { en: 'Bridal Makeup', st: 'Makeup ya Bonyatsi' },
  servicePartyOpt: { en: 'Party Glam', st: 'Glam ya Mopati' },
  footerTagline: { en: 'Your wellness, reimagined.', st: 'Khutlolo ya gago, e tlhomiwa sešwa.' },
  footerQuickLinks: { en: 'Quick Links', st: 'Dihlomaganyo tše Kgapešane' },
  footerConnect: { en: 'Connect', st: 'Kopanya' },
  footerCopyright: { en: '2026 E\u0026P Wellness Lounge. All rights reserved.', st: '2026 E\u0026P Wellness Lounge. Ditokelo ka moka di sireletšwe.' },
  offerLabel: { en: 'GRAND OPENING SPECIAL', st: 'PHETHETŠO YA GO BULA' },
  offerTitle: { en: '10% Off All Massages', st: '10% Tloffo go Dimasaage ka Moka' },
  offerValid: { en: 'Valid until 31 May 2026', st: 'E šoma go fihlela la 31 Moranang 2026' },
  scrollExplore: { en: 'Scroll to explore our gallery of transformations', st: 'Sekrola go nyaka gallery ya diphetogo tša rena' },
}

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key: string) => key,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en')

  const t = (key: string): string => {
    return translations[key]?.[lang] || key
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
