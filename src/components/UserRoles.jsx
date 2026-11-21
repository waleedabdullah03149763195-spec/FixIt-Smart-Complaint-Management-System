import {
  GraduationCap,
  HardHat,
  ShieldCheck,
  BriefcaseBusiness,
} from 'lucide-react'

const roles = [
  {
    icon: GraduationCap,
    title: 'Student / User',
    text: 'Report campus issues, track progress, and receive updates until the problem is fixed.',
  },
  {
    icon: ShieldCheck,
    title: 'Admin',
    text: 'Oversee incoming complaints, manage users, and keep the maintenance pipeline organized.',
  },
  {
    icon: HardHat,
    title: 'Technician',
    text: 'Receive assigned jobs, update work status, and close resolved maintenance tasks.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Manager',
    text: 'Monitor performance, review reports, and ensure service quality across departments.',
  },
]

function UserRoles() {
  return (
    <section className="section roles">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">User Roles</p>
          <h2 className="section-title">Built for every stakeholder in the process</h2>
          <p className="section-subtitle">
            FixIt supports a complete maintenance ecosystem with clear
            responsibilities for each role.
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

export default UserRoles
