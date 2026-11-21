import {
  ChartColumnIncreasing,
  MessagesSquare,
  Radar,
  Shuffle,
  Layers3,
} from 'lucide-react'

const reasons = [
  {
    icon: Layers3,
    title: 'Organized Complaint Handling',
    text: 'Keep every maintenance request structured, searchable, and easy to manage.',
  },
  {
    icon: Radar,
    title: 'Transparent Progress Tracking',
    text: 'Give users and teams clear visibility into status updates at every step.',
  },
  {
    icon: Shuffle,
    title: 'Efficient Technician Assignment',
    text: 'Route jobs to the right technicians quickly with a guided workflow.',
  },
  {
    icon: MessagesSquare,
    title: 'Better Communication',
    text: 'Reduce confusion with shared updates instead of scattered messages.',
  },
  {
    icon: ChartColumnIncreasing,
    title: 'Performance Monitoring',
    text: 'Help managers review workloads, resolution times, and service quality.',
  },
]

function WhyChooseFixIt() {
  return (
    <section className="section features">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">Why Choose FixIt</p>
          <h2 className="section-title">A smarter way to manage campus maintenance</h2>
          <p className="section-subtitle">
            FixIt brings structure, visibility, and accountability to complaint
            management for modern institutions.
          </p>
        </div>

        <div className="why__grid">
          {reasons.map(({ icon: Icon, title, text }) => (
            <article key={title} className="feature-card">
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

export default WhyChooseFixIt
