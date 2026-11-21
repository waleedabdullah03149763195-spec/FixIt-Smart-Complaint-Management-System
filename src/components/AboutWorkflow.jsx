import {
  ClipboardPenLine,
  HardHat,
  MessageSquareHeart,
  UserCog,
} from 'lucide-react'

const steps = [
  {
    step: '01',
    icon: ClipboardPenLine,
    title: 'User submits a complaint',
    text: 'Users report maintenance issues with clear details so teams know exactly what needs attention.',
  },
  {
    step: '02',
    icon: UserCog,
    title: 'Admin reviews and assigns it',
    text: 'Admins review the request and assign the right technician based on priority and availability.',
  },
  {
    step: '03',
    icon: HardHat,
    title: 'Technician works on the issue',
    text: 'Technicians receive assigned tasks, update progress, and complete the required maintenance work.',
  },
  {
    step: '04',
    icon: MessageSquareHeart,
    title: 'User tracks progress and provides feedback',
    text: 'Users follow the status in real time and share feedback once the issue is resolved.',
  },
]

function AboutWorkflow() {
  return (
    <section className="section how about-workflow">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">How FixIt Works</p>
          <h2 className="section-title">A clear workflow from report to resolution</h2>
          <p className="section-subtitle">
            FixIt connects every role in one transparent process so maintenance
            requests never get lost.
          </p>
        </div>

        <div className="about-workflow__grid">
          {steps.map(({ step, icon: Icon, title, text }) => (
            <article key={step} className="how__card">
              <div className="how__top">
                <span className="how__step">{step}</span>
                <div className="icon-wrap">
                  <Icon size={22} />
                </div>
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

export default AboutWorkflow
