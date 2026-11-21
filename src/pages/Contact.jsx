import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ContactHero from '../components/ContactHero'
import ContactInfo from '../components/ContactInfo'
import ContactForm from '../components/ContactForm'
import ContactFAQ from '../components/ContactFAQ'
import './Home.css'
import './Contact.css'

function Contact() {
  return (
    <div className="contact-page">
      <Navbar />
      <main>
        <ContactHero />
        <ContactInfo />
        <ContactForm />
        <ContactFAQ />
      </main>
      <Footer />
    </div>
  )
}

export default Contact
