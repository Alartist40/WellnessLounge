import { useState, useEffect } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const { lang, setLang, t } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setIsMobileOpen(false)
    }
  }

  const navLinks = [
    { label: t('navHome'), id: 'hero' },
    { label: t('navServices'), id: 'services' },
    { label: t('navBridal'), id: 'bridal' },
    { label: t('navContact'), id: 'contact' },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center justify-between px-6 lg:px-12 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#faf6f0]/95 backdrop-blur-[16px] shadow-soft'
            : 'bg-[#faf6f0]/85 backdrop-blur-[8px]'
        }`}
      >
        <div
          className="font-playfair font-semibold text-xl text-warm-900 cursor-pointer"
          onClick={() => scrollTo('hero')}
        >
          E&amp;P Wellness Lounge
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="font-inter font-medium text-[13px] uppercase tracking-[1.5px] text-warm-800 hover:text-coral transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => setLang(lang === 'en' ? 'st' : 'en')}
            className="font-inter font-semibold text-[12px] uppercase tracking-[1.5px] text-teal border border-teal/50 px-3 py-1.5 rounded-full hover:bg-teal/10 transition-all duration-300"
          >
            {lang === 'en' ? 'Setswana' : 'English'}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-warm-900"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 bg-cream transition-transform duration-500 ease-out ${
          isMobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="font-playfair text-2xl text-warm-900 hover:text-coral transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              setLang(lang === 'en' ? 'st' : 'en')
              setIsMobileOpen(false)
            }}
            className="font-inter font-semibold text-sm uppercase tracking-[1.5px] text-teal border border-teal/50 px-4 py-2 rounded-full hover:bg-teal/10 transition-all duration-300 mt-4"
          >
            {lang === 'en' ? 'Setswana' : 'English'}
          </button>
        </div>
      </div>
    </>
  )
}
