import { Eye, Target } from 'lucide-react'

function AboutMissionVision() {
  return (
    <section className="section about-mission">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">Purpose</p>
          <h2 className="section-title">Our mission and vision</h2>
          <p className="section-subtitle">
            Everything in FixIt is designed around speed, clarity, and reliable
            campus maintenance workflows.
          </p>
        </div>

        <div className="about-mission__grid">
          <article className="about-mission__card">
            <div className="icon-wrap icon-wrap--lg">
              <Target size={24} />
            </div>
            <h3>Our Mission</h3>
            <p>
              To make maintenance management faster, easier, and more
              transparent for students, staff, technicians, and decision-makers.
            </p>
          </article>

          <article className="about-mission__card">
            <div className="icon-wrap icon-wrap--lg">
              <Eye size={24} />
            </div>
            <h3>Our Vision</h3>
            <p>
              To build an efficient and reliable complaint management experience
              where every issue is visible, assigned, and resolved with
              confidence.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}

export default AboutMissionVision
