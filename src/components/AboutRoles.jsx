import {
  BriefcaseBusiness,
  GraduationCap,
  HardHat,
  ShieldCheck,
} from 'lucide-react'

const roles = [
  {
    icon: GraduationCap,
    title: 'User / Student',
    text: 'Reports and tracks complaints from submission to resolution.',
  },
  {
    icon: ShieldCheck,
    title: 'Admin',
    text: 'Manages complaints, users, and technicians across the system.',
  },
  {
    icon: HardHat,
    title: 'Technician',
    text: 'Handles assigned maintenance tasks and updates work status.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Manager',
    text: 'Monitors performance and reviews reports for better decisions.',
  },
]

function AboutRoles() {
  return (
    <section className="section roles">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">System Roles</p>
          <h2 className="section-title">Built for every stakeholder</h2>
          <p className="section-subtitle">
            Each role has a clear responsibility so campus maintenance stays
            organized and accountable.
          </p>
        </div>

        <div className="roles__grid">
          {roles.map(({ icon: Icon, title, text }) => (
            <article key={title} className="role-card">
              <div className="role-card__icon">
                <Icon size={24} />
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

export default AboutRoles
