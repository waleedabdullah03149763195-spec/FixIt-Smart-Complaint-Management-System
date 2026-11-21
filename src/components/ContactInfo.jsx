import { Mail, MapPin, Phone } from 'lucide-react'

const infoCards = [
  {
    icon: Mail,
    title: 'Email Support',
    detail: 'support@fixit.demo',
    note: 'Placeholder email for demo use',
  },
  {
    icon: Phone,
    title: 'Phone Support',
    detail: '+1 (555) 010-0000',
    note: 'Placeholder phone for demo use',
  },
  {
    icon: MapPin,
    title: 'Office Location',
    detail: 'University Campus, Maintenance Office',
    note: 'Placeholder location for demo use',
  },
]

function ContactInfo() {
  return (
    <section className="section contact-info">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">Contact Information</p>
          <h2 className="section-title">Reach the FixIt support team</h2>
          <p className="section-subtitle">
            These details are placeholders for this portfolio project and are
            not real business contact information.
          </p>
        </div>

        <div className="contact-info__grid">
          {infoCards.map(({ icon: Icon, title, detail, note }) => (
            <article key={title} className="contact-info__card">
              <div className="icon-wrap">
                <Icon size={22} />
              </div>
              <h3>{title}</h3>
              <p className="contact-info__detail">{detail}</p>
              <span className="contact-info__note">{note}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ContactInfo
