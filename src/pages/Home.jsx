import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import TrustSection from '../components/TrustSection'
import HowItWorks from '../components/HowItWorks'
import Features from '../components/Features'
import UserRoles from '../components/UserRoles'
import CallToAction from '../components/CallToAction'
import Footer from '../components/Footer'
import './Home.css'

function Home() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const id = location.hash.replace('#', '')
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [location])

  return (
    <div className="home-page">
      <Navbar />
      <main>
        <Hero />
        <TrustSection />
        <HowItWorks />
        <Features />
        <UserRoles />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}

export default Home
