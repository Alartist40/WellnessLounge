import { useEffect, useRef } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Percent } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function OfferBanner() {
  const { t } = useLanguage()
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const banner = bannerRef.current
    if (!banner) return

    gsap.fromTo(
      banner,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: banner,
          start: 'top 92%',
          toggleActions: 'play none none none',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <div className="relative w-full py-10 px-6 lg:px-12 bg-cream z-10">
      <div
        ref={bannerRef}
        className="max-w-[1200px] mx-auto bg-gradient-to-r from-coral/10 via-coral/5 to-teal/5 border border-coral/15 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 animate-pulse-glow"
      >
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 flex items-center justify-center bg-coral/15 rounded-full flex-shrink-0">
            <Percent className="text-coral" size={24} />
          </div>
          <div>
            <p className="font-inter font-medium text-xs uppercase tracking-[2px] text-coral mb-1">
              {t('offerLabel')}
            </p>
            <h3 className="font-playfair font-bold text-xl md:text-2xl text-warm-900">
              {t('offerTitle')}
            </h3>
            <p className="font-inter text-sm text-warm-500 mt-0.5">
              {t('offerValid')}
            </p>
          </div>
        </div>
        <a
          href="https://wa.me/26776703975?text=Hello! I'm interested in the Grand Opening Special 10% off massage offer."
          target="_blank"
          rel="noopener noreferrer"
          className="font-inter font-semibold text-[13px] uppercase tracking-[1px] text-cream bg-coral px-8 py-3.5 rounded-full hover:bg-coral-dark transition-colors duration-300 whitespace-nowrap shadow-soft"
        >
          Claim Offer
        </a>
      </div>
    </div>
  )
}
