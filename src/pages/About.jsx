import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AboutHero from '../components/AboutHero'
import AboutStory from '../components/AboutStory'
import AboutMissionVision from '../components/AboutMissionVision'
import AboutWorkflow from '../components/AboutWorkflow'
import AboutRoles from '../components/AboutRoles'
import WhyChooseFixIt from '../components/WhyChooseFixIt'
import CallToAction from '../components/CallToAction'
import './Home.css'
import './About.css'

function About() {
  return (
    <div className="about-page">
      <Navbar />
      <main>
        <AboutHero />
        <AboutStory />
        <AboutMissionVision />
        <AboutWorkflow />
        <AboutRoles />
        <WhyChooseFixIt />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}

export default About
