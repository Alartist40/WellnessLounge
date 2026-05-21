import { LanguageProvider } from './hooks/useLanguage'
import Navigation from './sections/Navigation'
import Hero from './sections/Hero'
import Services from './sections/Services'
import OfferBanner from './sections/OfferBanner'
import Bridal from './sections/Bridal'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

function App() {
  return (
    <LanguageProvider>
      <Navigation />
      <main>
        <Hero />
        <Services />
        <OfferBanner />
        <Bridal />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  )
}

export default App
