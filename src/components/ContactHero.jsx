import { MessageCircle } from 'lucide-react'

function ContactHero() {
  return (
    <section className="contact-hero">
      <div className="contact-hero__bg" aria-hidden="true">
        <span className="hero__blob hero__blob--one" />
        <span className="hero__blob hero__blob--two" />
        <span className="hero__grid" />
      </div>

      <div className="container contact-hero__content">
        <p className="hero__badge">
          <MessageCircle size={14} />
          Contact FixIt
        </p>
        <h1 className="contact-hero__title">Get in Touch</h1>
        <p className="contact-hero__subtitle">
          Have a question or need assistance? We&apos;d love to hear from you.
        </p>
      </div>
    </section>
  )
}

export default ContactHero
