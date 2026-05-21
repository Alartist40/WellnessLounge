import { useEffect, useRef } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, MessageCircle, MapPin, Instagram, Facebook, Clock, Calendar } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const elements = section.querySelectorAll('.contact-animate')
    elements.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: i * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 px-6 lg:px-12 bg-cream z-10"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <p className="contact-animate font-inter font-medium text-xs uppercase tracking-[2.5px] text-coral mb-3">
            {t('contactLabel')}
          </p>
          <h2 className="contact-animate font-playfair font-bold text-[36px] md:text-[48px] text-warm-900 tracking-[-0.5px]">
            {t('contactTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Contact Info */}
          <div className="space-y-8">
            <p className="contact-animate font-inter text-[15px] text-warm-600 leading-[1.7]">
              {t('contactBody')}
            </p>

            <div className="contact-animate space-y-5 pt-4">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 flex items-center justify-center bg-coral/10 rounded-xl flex-shrink-0">
                  <Phone className="text-coral" size={18} />
                </div>
                <div>
                  <p className="font-inter text-xs uppercase tracking-[1.5px] text-warm-500 mb-0.5">
                    {t('contactPhone')}
                  </p>
                  <p className="font-inter text-base text-warm-900">+267 76 703 975</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 flex items-center justify-center bg-teal/10 rounded-xl flex-shrink-0">
                  <MessageCircle className="text-teal" size={18} />
                </div>
                <div>
                  <p className="font-inter text-xs uppercase tracking-[1.5px] text-warm-500 mb-0.5">
                    {t('contactWhatsApp')}
                  </p>
                  <p className="font-inter text-base text-warm-900">+267 76 703 975</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 flex items-center justify-center bg-gold/10 rounded-xl flex-shrink-0">
                  <MapPin className="text-gold" size={18} />
                </div>
                <div>
                  <p className="font-inter text-xs uppercase tracking-[1.5px] text-warm-500 mb-0.5">
                    {t('contactLocation')}
                  </p>
                  <p className="font-inter text-base text-warm-900">Phakalane, Gaborone</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 flex items-center justify-center bg-warm-300/30 rounded-xl flex-shrink-0">
                  <Clock className="text-warm-600" size={18} />
                </div>
                <div>
                  <p className="font-inter text-xs uppercase tracking-[1.5px] text-warm-500 mb-0.5">
                    Hours
                  </p>
                  <p className="font-inter text-base text-warm-900">By Appointment Only</p>
                </div>
              </div>
            </div>

            <div className="contact-animate flex gap-4 pt-6">
              <a
                href="https://www.instagram.com/wellnessloungebw?igsh=Z2Vub2xyZHBoaDY4"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-inter font-medium text-[13px] uppercase tracking-[1.5px] text-warm-600 hover:text-coral transition-colors duration-300"
              >
                <Instagram size={16} />
                Instagram
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61589867061120"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-inter font-medium text-[13px] uppercase tracking-[1.5px] text-warm-600 hover:text-coral transition-colors duration-300"
              >
                <Facebook size={16} />
                Facebook
              </a>
            </div>
          </div>

          {/* Right: WhatsApp CTA Card */}
          <div className="contact-animate">
            <div className="bg-cream-dark rounded-2xl p-8 md:p-10 shadow-soft border border-warm-200/50">
              <div className="w-14 h-14 flex items-center justify-center bg-teal/10 rounded-2xl mb-6">
                <Calendar className="text-teal" size={26} />
              </div>
              <h3 className="font-playfair text-2xl text-warm-900 mb-3">
                Ready to Book?
              </h3>
              <p className="font-inter text-[15px] text-warm-600 leading-[1.7] mb-8">
                We&apos;d love to welcome you to E&amp;P Wellness Lounge. Send us a message on WhatsApp with your preferred service and date, and we&apos;ll get back to you to confirm your appointment.
              </p>

              <div className="space-y-3">
                <a
                  href="https://wa.me/26776703975?text=Hello! I'd like to book an appointment at E&P Wellness Lounge."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full bg-teal text-cream font-inter font-semibold text-sm uppercase tracking-[1px] py-4 rounded-xl hover:bg-teal-dark transition-colors duration-300 shadow-soft"
                >
                  <MessageCircle size={18} />
                  Book via WhatsApp
                </a>
                <a
                  href="tel:+26776703975"
                  className="flex items-center justify-center gap-3 w-full bg-coral/10 text-coral font-inter font-semibold text-sm uppercase tracking-[1px] py-4 rounded-xl hover:bg-coral/20 transition-colors duration-300"
                >
                  <Phone size={18} />
                  Call Us Now
                </a>
              </div>

              <p className="font-inter text-xs text-warm-500 mt-6 text-center leading-[1.6]">
                A 40% non-refundable deposit is required to secure your appointment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
