import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

function CallToAction() {
  return (
    <section className="section cta">
      <div className="container">
        <div className="cta__panel">
          <div className="cta__content">
            <p className="section-eyebrow">Get Started</p>
            <h2>Ready to streamline campus maintenance with FixIt?</h2>
            <p>
              Create an account, report your first issue, and experience a
              cleaner, faster way to manage complaints and repairs.
            </p>
          </div>
          <div className="cta__actions">
            <Link to="/register" className="btn btn-primary btn-lg">
              Create Free Account
              <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="btn btn-secondary btn-lg">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction
