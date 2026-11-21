import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Wrench,
} from 'lucide-react'

function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__blob hero__blob--one" />
        <span className="hero__blob hero__blob--two" />
        <span className="hero__grid" />
      </div>

      <div className="container hero__grid-layout">
        <div className="hero__content">
          <p className="hero__badge">
            <Wrench size={14} />
            Smart Campus Maintenance
          </p>
          <h1 className="hero__title">
            Maintenance Problems? We&apos;ve Got You Covered.
          </h1>
          <p className="hero__description">
            FixIt is a smart complaint and maintenance management system that
            helps students, staff, and technicians report issues, assign work,
            and track resolutions in one organized platform.
          </p>
          <div className="hero__actions">
            <Link to="/login" className="btn btn-primary btn-lg">
              Report an Issue
              <ArrowRight size={18} />
            </Link>
            <Link to="/#how-it-works" className="btn btn-secondary btn-lg">
              Explore How It Works
            </Link>
          </div>
          <div className="hero__stats">
            <div>
              <strong>Faster</strong>
              <span>Issue reporting</span>
            </div>
            <div>
              <strong>Real-time</strong>
              <span>Progress tracking</span>
            </div>
            <div>
              <strong>Clear</strong>
              <span>Role-based workflows</span>
            </div>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="dashboard-card">
            <div className="dashboard-card__header">
              <div>
                <p className="dashboard-card__label">Live Dashboard</p>
                <h3>Campus Maintenance Overview</h3>
              </div>
              <span className="dashboard-card__status">
                <span className="pulse" />
                Online
              </span>
            </div>

            <div className="dashboard-card__metrics">
              <div className="metric">
                <ClipboardList size={18} />
                <div>
                  <strong>128</strong>
                  <span>Open tickets</span>
                </div>
              </div>
              <div className="metric">
                <Clock3 size={18} />
                <div>
                  <strong>36</strong>
                  <span>In progress</span>
                </div>
              </div>
              <div className="metric metric--success">
                <CheckCircle2 size={18} />
                <div>
                  <strong>94%</strong>
                  <span>Resolved</span>
                </div>
              </div>
            </div>

            <div className="ticket-list">
              <div className="ticket">
                <div>
                  <p>AC unit not cooling — Block B</p>
                  <span>Assigned to Ahmed</span>
                </div>
                <em className="tag tag--progress">In Progress</em>
              </div>
              <div className="ticket">
                <div>
                  <p>Broken door lock — Lab 204</p>
                  <span>Awaiting assignment</span>
                </div>
                <em className="tag tag--open">Open</em>
              </div>
              <div className="ticket">
                <div>
                  <p>Leaking pipe — Hostel C</p>
                  <span>Resolved today</span>
                </div>
                <em className="tag tag--done">Resolved</em>
              </div>
            </div>
          </div>

          <div className="hero__float hero__float--one">
            <CheckCircle2 size={16} />
            Ticket updated
          </div>
          <div className="hero__float hero__float--two">
            <Wrench size={16} />
            Technician assigned
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
