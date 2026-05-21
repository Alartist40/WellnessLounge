import { useLanguage } from '../hooks/useLanguage'
import { Instagram, Facebook, MessageCircle, Heart } from 'lucide-react'

export default function Footer() {
  const { t } = useLanguage()

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative w-full bg-warm-900 z-10">
      {/* Main footer */}
      <div className="py-16 md:py-20 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="font-playfair font-semibold text-xl text-cream">
                E&amp;P Wellness Lounge
              </h3>
              <p className="font-inter text-sm text-warm-400 leading-[1.7]">
                {t('footerTagline')}
              </p>
              <div className="flex gap-3 pt-2">
                <a
                  href="https://www.instagram.com/wellnessloungebw?igsh=Z2Vub2xyZHBoaDY4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center bg-warm-800 rounded-full hover:bg-coral transition-colors duration-300"
                >
                  <Instagram className="text-cream" size={15} />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61589867061120"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center bg-warm-800 rounded-full hover:bg-coral transition-colors duration-300"
                >
                  <Facebook className="text-cream" size={15} />
                </a>
                <a
                  href="https://wa.me/26776703975"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center bg-warm-800 rounded-full hover:bg-teal transition-colors duration-300"
                >
                  <MessageCircle className="text-cream" size={15} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-inter font-medium text-xs uppercase tracking-[2px] text-warm-400">
                {t('footerQuickLinks')}
              </h4>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: t('navHome'), id: 'hero' },
                  { label: t('navServices'), id: 'services' },
                  { label: t('navBridal'), id: 'bridal' },
                  { label: t('navContact'), id: 'contact' },
                ].map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="font-inter text-sm text-warm-300 hover:text-coral transition-colors duration-300 text-left w-fit"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="font-inter font-medium text-xs uppercase tracking-[2px] text-warm-400">
                {t('footerConnect')}
              </h4>
              <div className="space-y-3">
                <p className="font-inter text-sm text-warm-300">
                  <span className="text-warm-500">Phone:</span> +267 76 703 975
                </p>
                <p className="font-inter text-sm text-warm-300">
                  <span className="text-warm-500">WhatsApp:</span> +267 76 703 975
                </p>
                <p className="font-inter text-sm text-warm-300">
                  <span className="text-warm-500">Location:</span> Phakalane, Gaborone
                </p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-warm-800 pt-8">
            <p className="font-inter text-[13px] text-warm-500 text-center flex items-center justify-center gap-1.5">
              &copy; {t('footerCopyright')} Made with <Heart className="text-coral fill-coral" size={12} /> in Botswana
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
