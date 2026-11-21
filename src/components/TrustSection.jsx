import { ClipboardCheck, Gauge, Layers3 } from 'lucide-react'

const points = [
  {
    icon: Layers3,
    title: 'Organized Reporting',
    text: 'Submit clear complaints with categories, locations, and priorities so nothing gets lost in email threads.',
  },
  {
    icon: Gauge,
    title: 'Real-Time Progress Tracking',
    text: 'Follow every request from submission to resolution with transparent status updates at each step.',
  },
  {
    icon: ClipboardCheck,
    title: 'Efficient Maintenance Management',
    text: 'Give admins and managers a structured workflow to assign technicians and close issues faster.',
  },
]

function TrustSection() {
  return (
    <section id="about" className="section trust">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">Why FixIt</p>
          <h2 className="section-title">
            Complaint management made simpler for modern campuses
          </h2>
          <p className="section-subtitle">
            FixIt replaces scattered messages and delayed follow-ups with a
            professional workflow built for students, staff, technicians, and
            decision-makers.
          </p>
        </div>

        <div className="trust__grid">
          {points.map(({ icon: Icon, title, text }) => (
            <article key={title} className="trust__card">
              <div className="icon-wrap">
                <Icon size={22} />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustSection
