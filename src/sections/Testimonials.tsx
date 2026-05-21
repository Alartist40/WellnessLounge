import { useEffect, useRef } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Quote, Star } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Testimonials() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)

  const testimonials = [
    {
      quote:
        'The hot stone massage was absolutely transformative. I left feeling like a new person.',
      name: 'Kelebogile M.',
      service: 'Hot Stone Massage',
    },
    {
      quote:
        'My bridal makeup was stunning — natural, glowing, and exactly what I envisioned for my wedding day.',
      name: 'Tsholofelo R.',
      service: 'Bridal Glam',
    },
    {
      quote:
        "The PRP facial completely changed my skin. I've never felt more confident without makeup.",
      name: 'Lesedi K.',
      service: 'Advanced Facial',
    },
  ]

  // Triple for seamless infinite scroll
  const allTestimonials = [...testimonials, ...testimonials, ...testimonials]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    gsap.fromTo(
      section.querySelector('h2'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative w-full py-20 md:py-28 bg-cream-dark z-10 overflow-hidden"
    >
      <div className="px-6 lg:px-12 mb-12">
        <div className="text-center">
          <p className="font-inter font-medium text-xs uppercase tracking-[2.5px] text-coral mb-3">
            {t('navAbout')}
          </p>
          <h2 className="font-playfair font-bold text-[36px] md:text-[48px] text-warm-900 tracking-[-0.5px]">
            {t('testimonialsTitle')}
          </h2>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <div
          className="flex gap-6 px-6 testimonial-track"
          style={{ width: 'max-content' }}
        >
          {allTestimonials.map((testimonial, i) => (
            <div
              key={i}
              className="w-[320px] md:w-[380px] flex-shrink-0 bg-cream rounded-2xl p-8 md:p-10 shadow-soft border border-warm-200/50"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="text-gold fill-gold" size={14} />
                ))}
              </div>
              <Quote className="text-coral/30 mb-3" size={24} />
              <p className="font-playfair italic text-[17px] text-warm-800 leading-[1.6] mb-6">
                "{testimonial.quote}"
              </p>
              <div className="border-t border-warm-200 pt-4">
                <p className="font-inter font-semibold text-sm text-warm-900">
                  {testimonial.name}
                </p>
                <p className="font-inter text-[13px] text-warm-500">
                  {testimonial.service}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
