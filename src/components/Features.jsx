import {
  BellRing,
  ChartColumnIncreasing,
  ClipboardPenLine,
  MessageSquareHeart,
  Radar,
  UsersRound,
} from 'lucide-react'

const features = [
  {
    icon: ClipboardPenLine,
    title: 'Easy Complaint Submission',
    text: 'File maintenance requests quickly with guided forms that capture the details teams need.',
  },
  {
    icon: Radar,
    title: 'Complaint Tracking',
    text: 'Stay informed with a clear timeline that shows exactly where each request stands.',
  },
  {
    icon: UsersRound,
    title: 'Technician Assignment',
    text: 'Route jobs to the right technicians so issues are handled by qualified staff.',
  },
  {
    icon: BellRing,
    title: 'Status Notifications',
    text: 'Get timely alerts when a complaint is assigned, updated, or marked as resolved.',
  },
  {
    icon: MessageSquareHeart,
    title: 'Feedback System',
    text: 'Share feedback after completion to help improve service quality across campus.',
  },
  {
    icon: ChartColumnIncreasing,
    title: 'Performance Reports',
    text: 'Give managers insight into resolution times, workloads, and recurring problem areas.',
  },
]

function Features() {
  return (
    <section className="section features">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">Features</p>
          <h2 className="section-title">Everything you need to run maintenance smoothly</h2>
          <p className="section-subtitle">
            From first report to final feedback, FixIt keeps campus maintenance
            organized, measurable, and easy to manage.
          </p>
        </div>

        <div className="features__grid">
          {features.map(({ icon: Icon, title, text }) => (
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

export default Features
