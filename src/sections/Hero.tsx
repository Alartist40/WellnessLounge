import { useLanguage } from '../hooks/useLanguage'
import { ChevronDown } from 'lucide-react'

const base = import.meta.env.BASE_URL
const slides = [
  `${base}images/img-hero-1.jpg`,
  `${base}images/img-hero-2.jpg`,
  `${base}images/img-hero-3.jpg`,
  `${base}images/img-hero-4.jpg`,
  `${base}images/img-hero-5.jpg`,
]

export default function Hero() {
  const { t } = useLanguage()

  const scrollToServices = () => {
    const el = document.getElementById('services')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative w-full min-h-[100dvh] flex items-center bg-cream overflow-hidden"
    >
      {/* Slideshow */}
      <div className="absolute inset-0">
        {slides.map((src) => (
          <div
            key={src}
            className="hero-slide"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cream/85 via-cream/50 to-transparent" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-6 lg:px-[60px] pt-[72px]">
        <p className="font-inter font-medium text-xs uppercase tracking-[2.5px] text-warm-500 mb-4">
          {t('heroLabel')}
        </p>
        <h1 className="font-playfair font-bold text-[40px] md:text-[64px] leading-[1.1] tracking-[-1px] text-warm-900 mb-5">
          {t('heroTitle')}
        </h1>
        <p className="font-playfair text-lg md:text-[22px] text-warm-600 mb-10 max-w-xl leading-[1.5]">
          {t('heroSubtitle')}
        </p>
        <button
          onClick={scrollToServices}
          className="font-inter font-semibold text-[13px] uppercase tracking-[1.5px] text-cream bg-coral px-10 py-[16px] rounded-full hover:bg-coral-dark transition-all duration-400 shadow-soft hover:shadow-medium"
        >
          {t('heroCta')}
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-scroll-down">
        <ChevronDown className="text-warm-400" size={28} />
      </div>
    </section>
  )
}
