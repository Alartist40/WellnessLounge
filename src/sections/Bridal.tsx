import { useEffect, useRef } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Bridal() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const blocksRef = useRef<(HTMLDivElement | null)[]>([])

  const base = import.meta.env.BASE_URL
  const blocks = [
    {
      label: t('bridalLabel1'),
      title: t('bridalTitle1'),
      body: t('bridalBody1'),
      price: t('bridalPrice1'),
      image: `${base}images/img-bridal-1.jpg`,
      imageRight: true,
    },
    {
      label: t('bridalLabel2'),
      title: t('bridalTitle2'),
      body: t('bridalBody2'),
      price: t('bridalPrice2'),
      image: `${base}images/img-bridal-2.jpg`,
      imageRight: false,
    },
  ]

  useEffect(() => {
    const blocks = blocksRef.current.filter(Boolean) as HTMLDivElement[]

    blocks.forEach((block) => {
      const image = block.querySelector('.bridal-image')
      const text = block.querySelectorAll('.bridal-text')

      if (image) {
        gsap.fromTo(
          image,
          { opacity: 0, x: block.classList.contains('image-right') ? 50 : -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      text.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: 0.12 * i,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <section
      id="bridal"
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 px-6 lg:px-12 bg-cream z-10"
    >
      <div className="max-w-[1200px] mx-auto space-y-20 md:space-y-28">
        {blocks.map((block, i) => (
          <div
            key={block.label}
            ref={(el) => { blocksRef.current[i] = el }}
            className={`flex flex-col ${
              block.imageRight ? 'md:flex-row' : 'md:flex-row-reverse'
            } gap-10 md:gap-16 items-center ${block.imageRight ? 'image-right' : 'image-left'}`}
          >
            {/* Image */}
            <div className="bridal-image w-full md:w-1/2 overflow-hidden rounded-2xl shadow-soft">
              <img
                src={block.image}
                alt={block.title}
                className="w-full h-[350px] md:h-[450px] object-cover"
              />
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2 space-y-5">
              <p className="bridal-text font-inter font-medium text-xs uppercase tracking-[2.5px] text-coral">
                {block.label}
              </p>
              <h3 className="bridal-text font-playfair font-bold text-[28px] md:text-[38px] text-warm-900 leading-[1.15] tracking-[-0.5px]">
                {block.title}
              </h3>
              <p className="bridal-text font-inter text-[15px] text-warm-600 leading-[1.7]">
                {block.body}
              </p>
              <p className="bridal-text font-playfair text-lg text-coral italic">
                {block.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
