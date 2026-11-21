import { MessageSquareWarning } from 'lucide-react'

function AboutStory() {
  return (
    <section className="section about-story">
      <div className="container about-story__layout">
        <div className="about-story__intro">
          <p className="section-eyebrow">Our Story</p>
          <h2 className="section-title">Why FixIt was created</h2>
        </div>

        <div className="about-story__panel">
          <div className="icon-wrap">
            <MessageSquareWarning size={22} />
          </div>
          <p>
            Maintenance complaints are often difficult to report, manage,
            assign, and track. Messages get lost, updates are unclear, and
            teams struggle to stay aligned. FixIt was created to provide one
            organized platform that simplifies the entire process—from the
            first report to final resolution.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutStory
