import { FilePlus2, UserCog, Route } from 'lucide-react'

const steps = [
  {
    step: '01',
    icon: FilePlus2,
    title: 'Submit a Complaint',
    text: 'Describe the issue, choose a category, and submit your request in just a few clicks.',
  },
  {
    step: '02',
    icon: UserCog,
    title: 'Get Assigned to a Technician',
    text: 'Admins review the complaint and assign the right technician based on priority and availability.',
  },
  {
    step: '03',
    icon: Route,
    title: 'Track Your Resolution',
    text: 'Monitor progress in real time and receive updates until the issue is fully resolved.',
  },
]

function HowItWorks() {
  return (
    <section id="how-it-works" className="section how">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">How It Works</p>
          <h2 className="section-title">Three clear steps from report to resolution</h2>
          <p className="section-subtitle">
            A simple process designed to keep every maintenance request visible,
            accountable, and easy to follow.
          </p>
        </div>

        <div className="how__grid">
          {steps.map(({ step, icon: Icon, title, text }) => (
            <article key={step} className="how__card">
              <div className="how__top">
                <span className="how__step">{step}</span>
                <div className="icon-wrap icon-wrap--lg">
                  <Icon size={24} />
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

export default HowItWorks
