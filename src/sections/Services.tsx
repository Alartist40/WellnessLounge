import { useEffect, useRef } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Hand, Sparkles, Heart } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const serviceIcons = [
  { icon: Hand, image: '/images/img-service-massage.jpg' },
  { icon: Sparkles, image: '/images/img-service-facial.jpg' },
  { icon: Heart, image: '/images/img-service-wellness.jpg' },
]

export default function Services() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  const services = [
    {
      title: t('serviceMassage'),
      description: t('serviceMassageDesc'),
    },
    {
      title: t('serviceFacial'),
      description: t('serviceFacialDesc'),
    },
    {
      title: t('serviceWellness'),
      description: t('serviceWellnessDesc'),
    },
  ]

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[]

    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: i * 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
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
      id="services"
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 px-6 lg:px-12 bg-cream-dark z-10"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <p className="font-inter font-medium text-xs uppercase tracking-[2.5px] text-coral mb-3">
            {t('servicesLabel')}
          </p>
          <h2 className="font-playfair font-bold text-[36px] md:text-[48px] text-warm-900 tracking-[-0.5px]">
            {t('servicesTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => {
            const IconComp = serviceIcons[i].icon
            return (
              <div
                key={service.title}
                ref={(el) => { cardsRef.current[i] = el }}
                className="group card-lift bg-cream rounded-2xl overflow-hidden shadow-soft border border-warm-200/60"
              >
                <div className="overflow-hidden">
                  <img
                    src={serviceIcons[i].image}
                    alt={service.title}
                    className="w-full h-52 object-cover img-zoom"
                  />
                </div>
                <div className="p-8">
                  <div className="w-12 h-12 flex items-center justify-center bg-coral/10 rounded-xl mb-5">
                    <IconComp className="text-coral" size={22} />
                  </div>
                  <h3 className="font-playfair text-[22px] text-warm-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="font-inter text-[15px] text-warm-600 leading-[1.7]">
                    {service.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
