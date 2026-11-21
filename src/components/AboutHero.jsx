import { Building2, ClipboardCheck, ShieldCheck, Wrench } from 'lucide-react'

function AboutHero() {
  return (
    <section className="about-hero">
      <div className="about-hero__bg" aria-hidden="true">
        <span className="hero__blob hero__blob--one" />
        <span className="hero__blob hero__blob--two" />
        <span className="hero__grid" />
      </div>

      <div className="container about-hero__grid">
        <div className="about-hero__content">
          <p className="hero__badge">
            <Wrench size={14} />
            About Our Platform
          </p>
          <h1 className="about-hero__title">About FixIt</h1>
          <p className="about-hero__subtitle">
            FixIt is a smart complaint and maintenance management system built
            to help campuses report issues, assign technicians, and track
            resolutions with clarity and speed.
          </p>
        </div>

        <div className="about-hero__visual" aria-hidden="true">
          <div className="about-visual-card">
            <div className="about-visual-card__header">
              <div className="about-visual-card__icon">
                <Building2 size={22} />
              </div>
              <div>
                <p>Campus Operations</p>
                <h3>Maintenance Control Center</h3>
              </div>
            </div>

            <div className="about-visual-card__rows">
              <div className="about-visual-row">
                <ClipboardCheck size={18} />
                <div>
                  <strong>Structured Reporting</strong>
                  <span>Every issue captured in one place</span>
                </div>
              </div>
              <div className="about-visual-row">
                <ShieldCheck size={18} />
                <div>
                  <strong>Guided Assignment</strong>
                  <span>Admins route work to technicians</span>
                </div>
              </div>
              <div className="about-visual-row">
                <Wrench size={18} />
                <div>
                  <strong>Transparent Resolution</strong>
                  <span>Users track progress to completion</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutHero
