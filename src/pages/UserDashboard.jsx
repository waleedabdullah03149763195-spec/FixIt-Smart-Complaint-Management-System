import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Activity,
  ArrowRight,
  Bell,
  CheckCircle2,
  ChevronDown,
  Clock,
  Eye,
  FileText,
  Filter,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  MessageSquare,
  Phone,
  PlusCircle,
  Search,
  Settings,
  Sparkles,
  User,
  Wrench,
  X,
} from 'lucide-react'
import './UserDashboard.css'

// Initial mock complaints data
const INITIAL_COMPLAINTS = [
  {
    id: 'CMP-1048',
    title: 'Faulty AC in Computer Lab 3',
    department: 'Computer Science',
    location: 'Science Block C, Room 302',
    date: 'Nov 22, 2026',
    priority: 'High',
    status: 'In Progress',
    technician: 'Mike Vance (HVAC Tech)',
    description:
      'The split AC unit is making a loud buzzing noise and not cooling. Ambient temperature in the lab is exceeding 30°C during practical sessions.',
    timelineStep: 3,
  },
  {
    id: 'CMP-1045',
    title: 'Water Leakage in 2nd Floor Restroom',
    department: 'Civil Facilities',
    location: 'Hostel Block B, West Wing',
    date: 'Nov 21, 2026',
    priority: 'High',
    status: 'Pending',
    technician: 'Unassigned (Under Review)',
    description:
      'Continuous pipe leakage under sink 3 causing water accumulation on the floor, posing a slip hazard for students.',
    timelineStep: 1,
  },
  {
    id: 'CMP-1042',
    title: 'Broken Projector in Seminar Hall 102',
    department: 'Information Technology',
    location: 'Academic Complex, Ground Floor',
    date: 'Nov 19, 2026',
    priority: 'Medium',
    status: 'Resolved',
    technician: 'David Cole (AV Support)',
    description:
      'HDMI port on the podium was damaged and flickering red color. Replaced HDMI transmitter module and tested presentation display.',
    timelineStep: 4,
  },
  {
    id: 'CMP-1039',
    title: 'Flickering LED Lights in Library Hall',
    department: 'Electrical Engineering',
    location: 'Central Library, 1st Floor Study Area',
    date: 'Nov 18, 2026',
    priority: 'Low',
    status: 'Resolved',
    technician: 'Sarah Jenkins (Electrician)',
    description:
      'Two ceiling LED panels were flickering intermittently. Ballast and wiring connectors were replaced.',
    timelineStep: 4,
  },
  {
    id: 'CMP-1035',
    title: 'Damaged Chair & Desk Set',
    department: 'Campus Administration',
    location: 'Lecture Hall 4A',
    date: 'Nov 16, 2026',
    priority: 'Low',
    status: 'Pending',
    technician: 'Unassigned (Queued)',
    description:
      'Row 4 desk hinge is cracked and loose, needs carpentry tightening or seat replacement.',
    timelineStep: 1,
  },
  {
    id: 'CMP-1031',
    title: 'Elevator Emergency Call Button Unresponsive',
    department: 'Hostel & Residential',
    location: 'Hostel Tower A, Lift 2',
    date: 'Nov 14, 2026',
    priority: 'High',
    status: 'In Progress',
    technician: 'Elevator OEM Team',
    description:
      'Intercom call button inside Lift 2 does not ring the security guard cabin. Technicians dispatched for circuit testing.',
    timelineStep: 3,
  },
  {
    id: 'CMP-1028',
    title: 'Door Lock Jammed in Room 204',
    department: 'Hostel & Residential',
    location: 'Hostel Block A, 2nd Floor',
    date: 'Nov 12, 2026',
    priority: 'Medium',
    status: 'Resolved',
    technician: 'Arthur Pendelton (Locksmith)',
    description:
      'Cylinder lock replaced and two new keys handed over to student resident.',
    timelineStep: 4,
  },
]

const INITIAL_ACTIVITIES = [
  {
    id: 1,
    type: 'assigned',
    title: 'Technician Assigned',
    desc: 'Mike Vance was assigned to your ticket CMP-1048 (Faulty AC in Computer Lab 3).',
    time: '25 mins ago',
  },
  {
    id: 2,
    type: 'resolved',
    title: 'Complaint Resolved',
    desc: 'Ticket CMP-1042 (Broken Projector) was inspected & marked resolved by David Cole.',
    time: '3 hours ago',
  },
  {
    id: 3,
    type: 'updated',
    title: 'Status Updated to In Progress',
    desc: 'Ticket CMP-1031 (Elevator Emergency Button) is now actively undergoing repair.',
    time: 'Yesterday at 4:15 PM',
  },
  {
    id: 4,
    type: 'feedback',
    title: 'Resolution Feedback Requested',
    desc: 'Please rate your recent maintenance experience for ticket CMP-1039.',
    time: '2 days ago',
  },
]

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Ticket #CMP-1048 Updated',
    message: 'Technician Mike Vance estimated resolution today by 4:00 PM.',
    time: '15m ago',
  },
  {
    id: 2,
    title: 'Scheduled Maintenance Notice',
    message: 'Water pipeline maintenance in Hostel Block B from 2:00 PM to 4:00 PM.',
    time: '2h ago',
  },
  {
    id: 3,
    title: 'Ticket #CMP-1042 Closed',
    message: 'Your ticket has been marked resolved. Tap to submit satisfaction feedback.',
    time: '1d ago',
  },
]

function UserDashboard() {
  const [activeNav, setActiveNav] = useState('Dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [showAllComplaints, setShowAllComplaints] = useState(false)

  // Data state
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS)
  const [selectedComplaint, setSelectedComplaint] = useState(null)
  const [submitModalOpen, setSubmitModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)

  // Submit Modal Form State
  const [newComplaint, setNewComplaint] = useState({
    title: '',
    department: 'Computer Science',
    location: '',
    priority: 'Medium',
    description: '',
  })

  // Dynamic Statistics
  const stats = {
    total: 24, // prompt specification: 24
    pending: 8, // prompt specification: 8
    inProgress: 6, // prompt specification: 6
    resolved: 10, // prompt specification: 10
  }

  // Filter complaints list
  const filteredComplaints = complaints.filter((item) => {
    const matchesStatus =
      statusFilter === 'All' ? true : item.status.toLowerCase() === statusFilter.toLowerCase()

    const q = searchQuery.toLowerCase().trim()
    const matchesQuery =
      !q ||
      item.id.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.department.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q)

    return matchesStatus && matchesQuery
  })

  const displayedComplaints = showAllComplaints
    ? filteredComplaints
    : filteredComplaints.slice(0, 5)

  const handleOpenSubmitModal = () => {
    setSubmitModalOpen(true)
    setSidebarOpen(false)
  }

  const handleCreateComplaint = (e) => {
    e.preventDefault()
    if (!newComplaint.title.trim()) return

    const randomId = `CMP-${Math.floor(1050 + Math.random() * 900)}`
    const created = {
      id: randomId,
      title: newComplaint.title.trim(),
      department: newComplaint.department,
      location: newComplaint.location.trim() || 'Main Campus Facility',
      date: 'Today',
      priority: newComplaint.priority,
      status: 'Pending',
      technician: 'Queued for Review',
      description:
        newComplaint.description.trim() ||
        'Standard student maintenance report submitted via User Dashboard.',
      timelineStep: 1,
    }

    setComplaints([created, ...complaints])
    setSubmitModalOpen(false)
    setNewComplaint({
      title: '',
      department: 'Computer Science',
      location: '',
      priority: 'Medium',
      description: '',
    })

    setToastMessage(`Complaint ${randomId} submitted successfully! A technician will be assigned shortly.`)
    setTimeout(() => setToastMessage(null), 6000)
  }

  const handleClearNotifications = () => {
    setNotifications([])
  }

  return (
    <div className="dashboard-layout">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ====================================================================
          Left Sidebar Navigation
          ==================================================================== */}
      <aside
        className={`dashboard-sidebar ${sidebarOpen ? 'dashboard-sidebar--open' : ''}`}
        aria-label="User navigation sidebar"
      >
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo">
            <span className="sidebar-logo__icon" aria-hidden="true">
              <Wrench size={18} strokeWidth={2.4} />
            </span>
            <span>FixIt</span>
          </Link>
          <button
            type="button"
            className="sidebar-close-btn"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <button
            type="button"
            className={`sidebar-nav__item ${
              activeNav === 'Dashboard' ? 'sidebar-nav__item--active' : ''
            }`}
            onClick={() => {
              setActiveNav('Dashboard')
              setSidebarOpen(false)
            }}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>

          <Link
            to="/user/submit-complaint"
            className="sidebar-nav__item"
            onClick={() => setSidebarOpen(false)}
          >
            <PlusCircle size={18} />
            <span>Submit Complaint</span>
          </Link>

          <Link
            to="/user/complaints"
            className="sidebar-nav__item"
            onClick={() => setSidebarOpen(false)}
          >
            <FileText size={18} />
            <span>My Complaints</span>
          </Link>

          <Link
            to="/user/notifications"
            className="sidebar-nav__item"
            onClick={() => setSidebarOpen(false)}
          >
            <Bell size={18} />
            <span>Notifications</span>
            {notifications.length > 0 && (
              <span className="sidebar-badge">{notifications.length}</span>
            )}
          </Link>

          <Link
            to="/user/feedback"
            className={`sidebar-nav__item ${
              activeNav === 'Feedback' ? 'sidebar-nav__item--active' : ''
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            <MessageSquare size={18} />
            <span>Feedback</span>
          </Link>

          <div className="sidebar-divider" />

          <Link
            to="/user/profile"
            className="sidebar-nav__item"
            onClick={() => setSidebarOpen(false)}
          >
            <User size={18} />
            <span>My Profile</span>
          </Link>

          <Link
            to="/user/settings"
            className={`sidebar-nav__item ${
              activeNav === 'Settings' ? 'sidebar-nav__item--active' : ''
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            <Settings size={18} />
            <span>Settings</span>
          </Link>

          <Link to="/login" className="sidebar-nav__item" onClick={() => setSidebarOpen(false)}>
            <LogOut size={18} />
            <span>Logout</span>
          </Link>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar" aria-hidden="true">
              AM
            </div>
            <div className="sidebar-user__info">
              <span className="sidebar-user__name">Alex Morgan</span>
              <span className="sidebar-user__role">Student • CS Dept</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ====================================================================
          Main Content Column
          ==================================================================== */}
      <div className="dashboard-main">
        {/* Top Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar menu"
            >
              <Menu size={20} />
            </button>
            <div className="header-greeting">
              <h1>Welcome back, Alex 👋</h1>
              <p>Here&apos;s what&apos;s happening with your campus complaints today.</p>
            </div>
          </div>

          <div className="header-right">
            {/* Search Input */}
            <div className="header-search">
              <Search size={16} className="header-search__icon" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search complaints, ID, department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search complaints"
              />
            </div>

            {/* Notification Icon */}
            <div className="header-actions">
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  className="header-icon-btn"
                  onClick={() => setNotificationsOpen((prev) => !prev)}
                  aria-label="Toggle notifications"
                  aria-expanded={notificationsOpen}
                >
                  <Bell size={18} />
                  {notifications.length > 0 && (
                    <span className="header-notification-dot" aria-hidden="true" />
                  )}
                </button>

                {/* Notifications Popover */}
                {notificationsOpen && (
                  <div className="notifications-popover" role="dialog" aria-label="Notifications">
                    <div className="notifications-header">
                      <h4>Notifications ({notifications.length})</h4>
                      {notifications.length > 0 && (
                        <button
                          type="button"
                          className="notifications-clear"
                          onClick={handleClearNotifications}
                        >
                          Clear all
                        </button>
                      )}
                    </div>
                    {notifications.length === 0 ? (
                      <p style={{ fontSize: '0.82rem', color: '#64748b', padding: '0.5rem 0' }}>
                        No new notifications.
                      </p>
                    ) : (
                      notifications.map((item) => (
                        <div key={item.id} className="notification-item">
                          <div className="notification-item__icon">
                            <Sparkles size={14} />
                          </div>
                          <div className="notification-item__content">
                            <p>{item.message}</p>
                            <span>{item.time}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="profile-menu-container">
                <button
                  type="button"
                  className="profile-menu-trigger"
                  onClick={() => setProfileDropdownOpen((prev) => !prev)}
                  aria-label="Toggle profile menu"
                  aria-expanded={profileDropdownOpen}
                >
                  <div className="profile-avatar">AM</div>
                  <span className="profile-name">Alex Morgan</span>
                  <ChevronDown
                    size={15}
                    className={`profile-dropdown-arrow ${
                      profileDropdownOpen ? 'profile-dropdown-arrow--open' : ''
                    }`}
                  />
                </button>

                {profileDropdownOpen && (
                  <div className="profile-dropdown" role="menu">
                    <div className="profile-dropdown__header">
                      <p className="profile-dropdown__name">Alex Morgan</p>
                      <p className="profile-dropdown__email">alex.morgan@campus.edu</p>
                    </div>
                    <Link
                      to="/user/profile"
                      className="profile-dropdown__item"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <User size={15} />
                      <span>My Profile</span>
                    </Link>
                    <button
                      type="button"
                      className="profile-dropdown__item"
                      onClick={() => {
                        setToastMessage('Account settings opened.')
                        setProfileDropdownOpen(false)
                      }}
                    >
                      <Settings size={15} />
                      <span>Settings</span>
                    </button>
                    <button
                      type="button"
                      className="profile-dropdown__item"
                      onClick={() => {
                        setToastMessage('Helpdesk support hotline: +1 (800) 555-FIXIT')
                        setProfileDropdownOpen(false)
                      }}
                    >
                      <HelpCircle size={15} />
                      <span>Help & Support</span>
                    </button>
                    <Link
                      to="/login"
                      className="profile-dropdown__item profile-dropdown__item--danger"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <LogOut size={15} />
                      <span>Sign Out</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="dashboard-content">
          {/* Toast Alert */}
          {toastMessage && (
            <div className="dashboard-toast" role="status" aria-live="polite">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <CheckCircle2 size={18} />
                <span>{toastMessage}</span>
              </div>
              <button
                type="button"
                className="dashboard-toast-close"
                onClick={() => setToastMessage(null)}
                aria-label="Dismiss message"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* ================================================================
              Four Statistics Cards (Total: 24, Pending: 8, In Progress: 6, Resolved: 10)
              ================================================================ */}
          <section className="stats-grid" aria-label="Complaint Statistics">
            <div className="stat-card stat-card--total">
              <div className="stat-info">
                <span className="stat-label">Total Complaints</span>
                <span className="stat-value">{stats.total}</span>
                <span className="stat-context">
                  <Activity size={13} />
                  <span>All-time campus reports</span>
                </span>
              </div>
              <div className="stat-icon-wrap" aria-hidden="true">
                <FileText size={22} />
              </div>
            </div>

            <div className="stat-card stat-card--pending">
              <div className="stat-info">
                <span className="stat-label">Pending</span>
                <span className="stat-value">{stats.pending}</span>
                <span className="stat-context">
                  <Clock size={13} />
                  <span>Awaiting administrative review</span>
                </span>
              </div>
              <div className="stat-icon-wrap" aria-hidden="true">
                <Clock size={22} />
              </div>
            </div>

            <div className="stat-card stat-card--progress">
              <div className="stat-info">
                <span className="stat-label">In Progress</span>
                <span className="stat-value">{stats.inProgress}</span>
                <span className="stat-context">
                  <Wrench size={13} />
                  <span>Active with technicians</span>
                </span>
              </div>
              <div className="stat-icon-wrap" aria-hidden="true">
                <Wrench size={22} />
              </div>
            </div>

            <div className="stat-card stat-card--resolved">
              <div className="stat-info">
                <span className="stat-label">Resolved</span>
                <span className="stat-value">{stats.resolved}</span>
                <span className="stat-context">
                  <CheckCircle2 size={13} />
                  <span>Verified & completed</span>
                </span>
              </div>
              <div className="stat-icon-wrap" aria-hidden="true">
                <CheckCircle2 size={22} />
              </div>
            </div>
          </section>

          {/* ================================================================
              Quick Action Cards
              ================================================================ */}
          <section className="quick-actions-section" aria-label="Quick Actions">
            <div className="quick-card quick-card--primary">
              <div className="quick-card__top">
                <div className="quick-card__icon" aria-hidden="true">
                  <PlusCircle size={22} />
                </div>
                <div className="quick-card__text">
                  <h3>Submit New Complaint</h3>
                  <p>
                    Experience an electrical, plumbing, or facility fault? Lodge a request in under
                    60 seconds with location tagging.
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                <Link
                  to="/user/submit-complaint"
                  className="quick-card__btn"
                >
                  <span>Report an Issue</span>
                  <ArrowRight size={15} />
                </Link>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  style={{
                    background: 'rgba(255, 255, 255, 0.18)',
                    color: '#ffffff',
                    borderColor: 'rgba(255, 255, 255, 0.28)',
                    fontSize: '0.82rem',
                    padding: '0.5rem 0.85rem',
                  }}
                  onClick={handleOpenSubmitModal}
                >
                  Quick Log
                </button>
              </div>
            </div>

            <div className="quick-card">
              <div className="quick-card__top">
                <div className="quick-card__icon" aria-hidden="true">
                  <Search size={20} />
                </div>
                <div className="quick-card__text">
                  <h3>Track Active Ticket</h3>
                  <p>
                    Follow up on technician dispatch, estimated inspection times, and completion
                    status.
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="action-view-btn"
                style={{ width: 'fit-content' }}
                onClick={() => {
                  setSelectedComplaint(complaints[0])
                }}
              >
                <span>Inspect Active #CMP-1048</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="quick-card">
              <div className="quick-card__top">
                <div className="quick-card__icon" aria-hidden="true">
                  <Phone size={20} />
                </div>
                <div className="quick-card__text">
                  <h3>Facility Emergency Desk</h3>
                  <p>
                    Severe water pipe burst or power outage? Call campus maintenance hotline directly
                    for rapid response.
                  </p>
                </div>
              </div>
              <a
                href="tel:+18005553494"
                className="action-view-btn"
                style={{ width: 'fit-content' }}
              >
                <span>Call Hotline (Ext 404)</span>
              </a>
            </div>
          </section>

          {/* ================================================================
              Main Split Grid: Recent Complaints Table & Activity Timeline
              ================================================================ */}
          <div className="dashboard-split-grid">
            {/* Recent Complaints Card */}
            <div className="section-card">
              <div className="section-card__header">
                <div className="section-card__title-wrap">
                  <h2>Recent Complaints</h2>
                  <span className="section-card__badge">{filteredComplaints.length} Total</span>
                </div>

                <div className="section-card__actions">
                  {/* Status Filter Pills */}
                  <div className="filter-pills" role="tablist" aria-label="Filter complaints">
                    {['All', 'Pending', 'In Progress', 'Resolved'].map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        className={`filter-pill ${
                          statusFilter === tab ? 'filter-pill--active' : ''
                        }`}
                        onClick={() => setStatusFilter(tab)}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* View All Button */}
                  <button
                    type="button"
                    className="view-all-btn"
                    onClick={() => setShowAllComplaints((prev) => !prev)}
                  >
                    <span>{showAllComplaints ? 'Show Less' : 'View All'}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="table-responsive">
                <table className="complaints-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Title & Location</th>
                      <th>Department</th>
                      <th>Date</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedComplaints.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="table-empty-state">
                          <Filter size={28} />
                          <p>No complaints match the filter or search criteria.</p>
                        </td>
                      </tr>
                    ) : (
                      displayedComplaints.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <span className="ticket-id">{item.id}</span>
                          </td>
                          <td className="ticket-title-cell">
                            <strong className="ticket-title" title={item.title}>
                              {item.title}
                            </strong>
                            <span className="ticket-location">
                              <MapPin size={12} />
                              <span>{item.location}</span>
                            </span>
                          </td>
                          <td>
                            <span className="ticket-dept">{item.department}</span>
                          </td>
                          <td>
                            <span className="ticket-date">{item.date}</span>
                          </td>
                          <td>
                            <span
                              className={`priority-badge priority-badge--${item.priority.toLowerCase()}`}
                            >
                              <span className="priority-dot" aria-hidden="true" />
                              <span>{item.priority}</span>
                            </span>
                          </td>
                          <td>
                            <span
                              className={`status-badge status-badge--${
                                item.status === 'In Progress'
                                  ? 'progress'
                                  : item.status.toLowerCase()
                              }`}
                            >
                              {item.status === 'Resolved' && <CheckCircle2 size={13} />}
                              {item.status === 'In Progress' && <Wrench size={13} />}
                              {item.status === 'Pending' && <Clock size={13} />}
                              <span>{item.status}</span>
                            </span>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="action-view-btn"
                              onClick={() => setSelectedComplaint(item)}
                              aria-label={`View details for ${item.id}`}
                            >
                              <Eye size={14} />
                              <span>View</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Activity Timeline Card */}
            <div className="section-card">
              <div className="section-card__header">
                <div className="section-card__title-wrap">
                  <h2>Recent Activity</h2>
                </div>
                <span className="sidebar-badge" style={{ background: '#3b82f6' }}>
                  Live
                </span>
              </div>

              <div className="activity-timeline">
                {INITIAL_ACTIVITIES.map((act) => (
                  <div key={act.id} className="activity-item">
                    <div
                      className={`activity-icon-wrap activity-icon-wrap--${act.type}`}
                      aria-hidden="true"
                    >
                      {act.type === 'assigned' && <Wrench size={16} />}
                      {act.type === 'resolved' && <CheckCircle2 size={16} />}
                      {act.type === 'updated' && <Activity size={16} />}
                      {act.type === 'feedback' && <MessageSquare size={16} />}
                    </div>
                    <div className="activity-content">
                      <p className="activity-title">{act.title}</p>
                      <p className="activity-desc">{act.desc}</p>
                      <time className="activity-time">{act.time}</time>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ====================================================================
          "View Complaint" Detail Modal
          ==================================================================== */}
      {selectedComplaint && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedComplaint(null)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="ticket-id" style={{ fontSize: '0.92rem' }}>
                  {selectedComplaint.id}
                </span>
                <h3 style={{ marginTop: '0.2rem' }}>Ticket Inspection</h3>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedComplaint(null)}
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-detail-badges">
                <span
                  className={`status-badge status-badge--${
                    selectedComplaint.status === 'In Progress'
                      ? 'progress'
                      : selectedComplaint.status.toLowerCase()
                  }`}
                >
                  <span>{selectedComplaint.status}</span>
                </span>
                <span
                  className={`priority-badge priority-badge--${selectedComplaint.priority.toLowerCase()}`}
                >
                  <span className="priority-dot" />
                  <span>{selectedComplaint.priority} Priority</span>
                </span>
              </div>

              <h4 className="modal-complaint-title">{selectedComplaint.title}</h4>

              {/* Progress Steps */}
              <div className="modal-timeline-steps">
                {['Submitted', 'Review', 'In Progress', 'Resolved'].map((step, idx) => {
                  const isCurrent = idx + 1 <= selectedComplaint.timelineStep
                  return (
                    <div
                      key={step}
                      className={`modal-step ${isCurrent ? 'modal-step--active' : ''}`}
                    >
                      <div className="modal-step__circle">{idx + 1}</div>
                      <span className="modal-step__label">{step}</span>
                    </div>
                  )
                })}
              </div>

              <div className="modal-detail-grid">
                <div className="modal-detail-item">
                  <span>Department</span>
                  <strong>{selectedComplaint.department}</strong>
                </div>
                <div className="modal-detail-item">
                  <span>Location</span>
                  <strong>{selectedComplaint.location}</strong>
                </div>
                <div className="modal-detail-item">
                  <span>Submitted Date</span>
                  <strong>{selectedComplaint.date}</strong>
                </div>
                <div className="modal-detail-item">
                  <span>Assigned Technician</span>
                  <strong>{selectedComplaint.technician}</strong>
                </div>
              </div>

              <div>
                <p className="modal-section-title">Issue Description</p>
                <div className="modal-desc-box">{selectedComplaint.description}</div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setSelectedComplaint(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          "Submit Complaint" Quick Action Modal
          ==================================================================== */}
      {submitModalOpen && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={() => setSubmitModalOpen(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Submit a Campus Complaint</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSubmitModalOpen(false)}
                aria-label="Close form"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateComplaint}>
              <div className="modal-body">
                <div className="modal-form-group">
                  <label htmlFor="complaint-title">Issue Title *</label>
                  <input
                    id="complaint-title"
                    type="text"
                    required
                    placeholder="e.g. Broken Water Tap in Restroom"
                    value={newComplaint.title}
                    onChange={(e) =>
                      setNewComplaint({ ...newComplaint, title: e.target.value })
                    }
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                  <div className="modal-form-group">
                    <label htmlFor="complaint-dept">Department</label>
                    <select
                      id="complaint-dept"
                      value={newComplaint.department}
                      onChange={(e) =>
                        setNewComplaint({ ...newComplaint, department: e.target.value })
                      }
                    >
                      <option value="Computer Science">Computer Science</option>
                      <option value="Electrical Engineering">Electrical Engineering</option>
                      <option value="Mechanical Engineering">Mechanical Engineering</option>
                      <option value="Civil Facilities">Civil Facilities</option>
                      <option value="Hostel & Residential">Hostel & Residential</option>
                      <option value="Campus Administration">Campus Administration</option>
                    </select>
                  </div>

                  <div className="modal-form-group">
                    <label htmlFor="complaint-priority">Priority</label>
                    <select
                      id="complaint-priority"
                      value={newComplaint.priority}
                      onChange={(e) =>
                        setNewComplaint({ ...newComplaint, priority: e.target.value })
                      }
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>

                <div className="modal-form-group">
                  <label htmlFor="complaint-loc">Location / Room Number *</label>
                  <input
                    id="complaint-loc"
                    type="text"
                    required
                    placeholder="e.g. Science Block C, Room 204"
                    value={newComplaint.location}
                    onChange={(e) =>
                      setNewComplaint({ ...newComplaint, location: e.target.value })
                    }
                  />
                </div>

                <div className="modal-form-group">
                  <label htmlFor="complaint-desc">Description & Fault Details</label>
                  <textarea
                    id="complaint-desc"
                    placeholder="Provide details about the issue to help technicians prepare tools..."
                    value={newComplaint.description}
                    onChange={(e) =>
                      setNewComplaint({ ...newComplaint, description: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSubmitModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Complaint
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserDashboard
