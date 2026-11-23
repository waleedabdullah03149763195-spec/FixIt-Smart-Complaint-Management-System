import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  AlertCircle,
  ArrowLeft,
  Bell,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  FileText,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Phone,
  PlusCircle,
  Printer,
  RotateCcw,
  Settings,
  Sparkles,
  Star,
  User,
  Wrench,
  X,
  XCircle,
} from 'lucide-react'
import { getComplaintById } from '../services/complaintsData'
import './ComplaintDetails.css'

const PROGRESS_STEPS = [
  'Submitted',
  'Under Review',
  'Assigned',
  'In Progress',
  'Resolved',
]

function ComplaintDetails() {
  const { id } = useParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  // Retrieve initial complaint data
  const initialData = getComplaintById(id)
  const [complaint, setComplaint] = useState(initialData)

  // Interactive Modals State
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false)
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [feedbackComment, setFeedbackComment] = useState('')
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)

  const [reopenModalOpen, setReopenModalOpen] = useState(false)
  const [reopenReason, setReopenReason] = useState('')

  const [toastMessage, setToastMessage] = useState(null)

  // If complaint is not found in mock store
  if (!complaint) {
    return (
      <div className="details-layout">
        <main className="details-main" style={{ padding: '3rem 1.5rem' }}>
          <div className="details-not-found" role="alert">
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#fef2f2',
                color: '#ef4444',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <AlertCircle size={32} />
            </div>
            <h2>Complaint Record Not Found</h2>
            <p>
              We could not find any active complaint ticket matching ID <strong>{id}</strong>.
              It may have been archived or entered incorrectly.
            </p>
            <Link to="/user/complaints" className="btn btn-primary">
              <ArrowLeft size={16} />
              <span>Back to My Complaints</span>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  // Print Details Handler
  const handlePrint = () => {
    window.print()
  }

  // Feedback Submission Handler
  const handleFeedbackSubmit = (e) => {
    e.preventDefault()
    setFeedbackSubmitted(true)
    setFeedbackModalOpen(false)
    setToastMessage(`Thank you for rating your service experience (${rating} / 5 stars)!`)
    setTimeout(() => setToastMessage(null), 5000)
  }

  // Reopen Complaint Demo Handler
  const handleReopenSubmit = (e) => {
    e.preventDefault()
    setComplaint((prev) => ({
      ...prev,
      status: 'Under Review',
      currentStep: 2,
      timeline: [
        {
          id: prev.timeline.length + 1,
          title: 'Ticket Reopened by Student',
          description:
            reopenReason.trim() || 'Student requested re-inspection of maintenance issue.',
          timestamp: 'Just now',
          author: 'Alex Morgan (Student)',
          status: 'current',
        },
        ...prev.timeline,
      ],
    }))

    setReopenModalOpen(false)
    setReopenReason('')
    setToastMessage(`Ticket ${complaint.id} has been reopened and queued for supervisor re-inspection.`)
    setTimeout(() => setToastMessage(null), 6000)
  }

  return (
    <div className="details-layout">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ====================================================================
          Left Sidebar (Matching User Dashboard Navigation)
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
          <Link
            to="/user/dashboard"
            className="sidebar-nav__item"
            onClick={() => setSidebarOpen(false)}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>

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
            className="sidebar-nav__item sidebar-nav__item--active"
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
          </Link>

          <Link
            to="/user/feedback"
            className="sidebar-nav__item"
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
            className="sidebar-nav__item"
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
          Main Details Container
          ==================================================================== */}
      <div className="details-main">
        {/* Top Header Bar */}
        <header className="details-header-bar">
          <div className="details-header-left">
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar menu"
            >
              <Menu size={20} />
            </button>
            <nav className="details-breadcrumb" aria-label="Breadcrumb">
              <Link to="/user/dashboard">Dashboard</Link>
              <span>/</span>
              <Link to="/user/complaints">My Complaints</Link>
              <span>/</span>
              <span>{complaint.id}</span>
            </nav>
          </div>

          <div className="header-actions">
            {/* Notifications Popover Trigger */}
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                className="header-icon-btn"
                onClick={() => setNotificationsOpen((prev) => !prev)}
                aria-label="Toggle notifications"
              >
                <Bell size={18} />
              </button>

              {notificationsOpen && (
                <div className="notifications-popover" role="dialog" aria-label="Notifications">
                  <div className="notifications-header">
                    <h4>Notifications</h4>
                    <button
                      type="button"
                      className="notifications-clear"
                      onClick={() => setNotificationsOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#64748b' }}>
                    Status update on {complaint.id} was recorded.
                  </p>
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
              >
                <div className="profile-avatar">AM</div>
                <span className="profile-name">Alex Morgan</span>
                <ChevronDown size={15} />
              </button>

              {profileDropdownOpen && (
                <div className="profile-dropdown" role="menu">
                  <div className="profile-dropdown__header">
                    <p className="profile-dropdown__name">Alex Morgan</p>
                    <p className="profile-dropdown__email">alex.morgan@campus.edu</p>
                  </div>
                  <Link
                    to="/user/dashboard"
                    className="profile-dropdown__item"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <LayoutDashboard size={15} />
                    <span>Dashboard Overview</span>
                  </Link>
                  <Link
                    to="/user/complaints"
                    className="profile-dropdown__item"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <FileText size={15} />
                    <span>My Complaints</span>
                  </Link>
                  <Link
                    to="/user/profile"
                    className="profile-dropdown__item"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <User size={15} />
                    <span>My Profile</span>
                  </Link>
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
        </header>

        {/* Content Body */}
        <main className="details-content">
          {/* Toast Notification */}
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

          {/* Top Actions Row: Back link & Page action buttons */}
          <div className="details-actions-row">
            <Link to="/user/complaints" className="details-back-link">
              <ArrowLeft size={16} />
              <span>Back to My Complaints</span>
            </Link>

            <div className="details-action-buttons">
              {/* Feedback action when complaint is resolved */}
              {complaint.status === 'Resolved' && (
                <button
                  type="button"
                  className="btn btn-feedback"
                  onClick={() => setFeedbackModalOpen(true)}
                >
                  <Star size={16} />
                  <span>{feedbackSubmitted ? 'Update Feedback' : 'Rate Service'}</span>
                </button>
              )}

              {/* Reopen Request Button when Resolved or Rejected */}
              {(complaint.status === 'Resolved' || complaint.status === 'Rejected') && (
                <button
                  type="button"
                  className="btn btn-reopen"
                  onClick={() => setReopenModalOpen(true)}
                >
                  <RotateCcw size={15} />
                  <span>Reopen Request</span>
                </button>
              )}

              {/* Print Details */}
              <button
                type="button"
                className="btn btn-secondary btn-print"
                onClick={handlePrint}
                title="Print official maintenance job order"
              >
                <Printer size={16} />
                <span>Print Complaint Details</span>
              </button>
            </div>
          </div>

          {/* ================================================================
              Progress Tracker & Master Summary Card
              ================================================================ */}
          <section className="tracker-card" aria-label="Progress Tracker">
            <div className="tracker-header">
              <div className="tracker-title-wrap">
                <div className="tracker-badges">
                  <span className="ticket-id-large">{complaint.id}</span>
                  <span
                    className={`status-badge status-badge--${
                      complaint.status === 'In Progress'
                        ? 'progress'
                        : complaint.status.toLowerCase()
                    }`}
                  >
                    {complaint.status === 'Resolved' && <CheckCircle2 size={13} />}
                    {complaint.status === 'In Progress' && <Wrench size={13} />}
                    {complaint.status === 'Pending' && <Clock size={13} />}
                    {complaint.status === 'Rejected' && <XCircle size={13} />}
                    <span>{complaint.status}</span>
                  </span>
                  <span
                    className={`priority-badge priority-badge--${complaint.priority.toLowerCase()}`}
                  >
                    <span className="priority-dot" />
                    <span>{complaint.priority} Priority</span>
                  </span>
                  <span className="section-card__badge">{complaint.category}</span>
                </div>

                <h1 className="tracker-title">{complaint.title}</h1>
              </div>

              {/* Expected Completion Date */}
              {complaint.expectedCompletion && (
                <div className="tracker-meta-pill">
                  <Clock size={15} style={{ color: 'var(--primary)' }} />
                  <span>
                    Target Resolution: <strong>{complaint.expectedCompletion}</strong>
                  </span>
                </div>
              )}
            </div>

            {/* Rejection Notice Banner if Rejected */}
            {complaint.status === 'Rejected' && complaint.rejectionReason && (
              <div className="remarks-box remarks-box--rejected" role="alert">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <XCircle size={18} style={{ color: '#be123c' }} />
                  <strong style={{ color: '#be123c', fontSize: '0.94rem' }}>
                    Administrative Rejection Notice
                  </strong>
                </div>
                <p>{complaint.rejectionReason}</p>
              </div>
            )}

            {/* Stepper Progress Tracker (Submitted → Under Review → Assigned → In Progress → Resolved) */}
            {complaint.status !== 'Rejected' ? (
              <div className="progress-stepper" aria-label="Complaint progress steps">
                {PROGRESS_STEPS.map((stepName, idx) => {
                  const stepIndex = idx + 1
                  const isCompleted = stepIndex < complaint.currentStep
                  const isActive = stepIndex === complaint.currentStep

                  return (
                    <div
                      key={stepName}
                      className={`stepper-step ${
                        isCompleted ? 'stepper-step--completed' : ''
                      } ${isActive ? 'stepper-step--active' : ''}`}
                    >
                      <div className="stepper-circle">
                        {isCompleted ? <Check size={18} strokeWidth={3} /> : stepIndex}
                      </div>
                      <span className="stepper-label">{stepName}</span>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="progress-stepper" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <div className="stepper-step stepper-step--completed">
                  <div className="stepper-circle">
                    <Check size={18} strokeWidth={3} />
                  </div>
                  <span className="stepper-label">Submitted</span>
                </div>
                <div className="stepper-step stepper-step--completed">
                  <div className="stepper-circle">
                    <Check size={18} strokeWidth={3} />
                  </div>
                  <span className="stepper-label">Under Review</span>
                </div>
                <div className="stepper-step stepper-step--rejected">
                  <div className="stepper-circle">
                    <X size={20} strokeWidth={3} />
                  </div>
                  <span className="stepper-label">Rejected</span>
                </div>
              </div>
            )}
          </section>

          {/* ================================================================
              Main 2-Column Split Details Grid
              ================================================================ */}
          <div className="details-split-grid">
            {/* Left Column: Descriptions, Remarks, Attachments, Timeline */}
            <div className="details-column">
              {/* Detailed Description */}
              <div className="detail-card">
                <div className="detail-card__header">
                  <h2 className="detail-card__title">
                    <FileText size={18} style={{ color: 'var(--primary)' }} />
                    <span>Full Complaint Description</span>
                  </h2>
                  <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
                    Logged on {complaint.displayDate}
                  </span>
                </div>
                <p className="detail-description-text">{complaint.description}</p>
              </div>

              {/* Administrative Remarks */}
              {complaint.adminRemarks && (
                <div className="detail-card">
                  <div className="detail-card__header">
                    <h2 className="detail-card__title">
                      <Sparkles size={18} style={{ color: 'var(--primary)' }} />
                      <span>Campus Administration Remarks</span>
                    </h2>
                  </div>
                  <div className="remarks-box remarks-box--admin">
                    {complaint.adminRemarks}
                  </div>
                </div>
              )}

              {/* Technician Remarks */}
              {complaint.technicianRemarks && (
                <div className="detail-card">
                  <div className="detail-card__header">
                    <h2 className="detail-card__title">
                      <Wrench size={18} style={{ color: '#10b981' }} />
                      <span>Technician Field Notes & Diagnostics</span>
                    </h2>
                  </div>
                  <div className="remarks-box remarks-box--tech">
                    {complaint.technicianRemarks}
                  </div>
                </div>
              )}

              {/* Attached Images & Files */}
              <div className="detail-card">
                <div className="detail-card__header">
                  <h2 className="detail-card__title">
                    <span>Attached Photos & Supporting Documents</span>
                  </h2>
                  <span className="section-card__badge">
                    {complaint.attachments?.length || 0} File(s)
                  </span>
                </div>

                {complaint.attachments && complaint.attachments.length > 0 ? (
                  <div className="attachments-preview-grid">
                    {complaint.attachments.map((att) => (
                      <div key={att.id} className="attachment-preview-card">
                        <img
                          src={att.url}
                          alt={att.name}
                          className="attachment-img"
                          loading="lazy"
                        />
                        <div className="attachment-info">
                          <span className="attachment-name" title={att.name}>
                            {att.name}
                          </span>
                          <span className="attachment-size">{att.size}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: '0.86rem', color: 'var(--muted)' }}>
                    No photos or supporting files were uploaded with this complaint.
                  </p>
                )}
              </div>

              {/* Chronological Activity Timeline */}
              <div className="detail-card">
                <div className="detail-card__header">
                  <h2 className="detail-card__title">
                    <Clock size={18} style={{ color: 'var(--primary)' }} />
                    <span>Chronological Activity Timeline</span>
                  </h2>
                  <span className="sidebar-badge" style={{ background: 'var(--primary)' }}>
                    Status History
                  </span>
                </div>

                <div className="timeline-vertical">
                  {complaint.timeline && complaint.timeline.length > 0 ? (
                    complaint.timeline.map((event) => (
                      <div
                        key={event.id}
                        className={`timeline-item ${
                          event.status === 'completed'
                            ? 'timeline-item--completed'
                            : event.status === 'current'
                            ? 'timeline-item--current'
                            : ''
                        }`}
                      >
                        <div className="timeline-dot" aria-hidden="true">
                          {event.status === 'completed' && <Check size={16} />}
                          {event.status === 'current' && <Clock size={16} />}
                          {event.status === 'upcoming' && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#cbd5e1' }} />}
                        </div>
                        <div className="timeline-body">
                          <div className="timeline-body-header">
                            <strong>{event.title}</strong>
                            <span>{event.timestamp}</span>
                          </div>
                          <p>{event.description}</p>
                          <span className="timeline-author">{event.author}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p style={{ fontSize: '0.86rem', color: 'var(--muted)' }}>
                      No timeline events recorded yet.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Location, Technician Card, Specs */}
            <div className="details-column">
              {/* Assigned Technician Card */}
              {complaint.technician && (
                <div className="detail-card">
                  <div className="detail-card__header">
                    <h2 className="detail-card__title">
                      <User size={18} style={{ color: 'var(--primary)' }} />
                      <span>Assigned Technician</span>
                    </h2>
                  </div>

                  <div className="technician-profile">
                    <div className="technician-avatar">
                      {complaint.technician.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)}
                    </div>
                    <div>
                      <h3 className="technician-name">{complaint.technician.name}</h3>
                      <p className="technician-role">{complaint.technician.role}</p>
                      {complaint.technician.rating && (
                        <p className="technician-rating">{complaint.technician.rating}</p>
                      )}
                    </div>
                  </div>

                  <div className="contact-rows-list">
                    <div className="contact-row">
                      <Phone size={15} />
                      <span>{complaint.technician.phone}</span>
                    </div>
                    <div className="contact-row">
                      <Mail size={15} />
                      <span>{complaint.technician.email}</span>
                    </div>
                    <div className="contact-row">
                      <Calendar size={15} />
                      <span>Assigned: {complaint.technician.assignedDate}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Campus Location & Specs Card */}
              <div className="detail-card">
                <div className="detail-card__header">
                  <h2 className="detail-card__title">
                    <MapPin size={18} style={{ color: 'var(--primary)' }} />
                    <span>Location & Campus Context</span>
                  </h2>
                </div>

                <div className="specs-list">
                  <div className="specs-item">
                    <span>Department</span>
                    <strong>{complaint.department}</strong>
                  </div>
                  <div className="specs-item">
                    <span>Facility Category</span>
                    <strong>{complaint.category}</strong>
                  </div>
                  <div className="specs-item">
                    <span>Campus Building</span>
                    <strong>{complaint.building}</strong>
                  </div>
                  <div className="specs-item">
                    <span>Room / Exact Area</span>
                    <strong>{complaint.room}</strong>
                  </div>
                  <div className="specs-item">
                    <span>Contact Person</span>
                    <strong>{complaint.contactInfo}</strong>
                  </div>
                  <div className="specs-item">
                    <span>Submission Date</span>
                    <strong>{complaint.displayDate}</strong>
                  </div>
                </div>
              </div>

              {/* Maintenance Hotline Support Help Card */}
              <div
                className="detail-card"
                style={{ background: 'linear-gradient(145deg, #0f172a, #1e3a8a)', color: '#ffffff', border: 'none' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <HelpCircle size={22} style={{ color: '#93c5fd' }} />
                  <h3 style={{ fontSize: '1.05rem', color: '#ffffff' }}>Facility Emergency?</h3>
                </div>
                <p style={{ fontSize: '0.84rem', color: 'rgba(255,255,255,0.85)', lineHeight: '1.5' }}>
                  If this maintenance issue poses an immediate personal safety risk, contact the
                  campus rapid dispatch hotline.
                </p>
                <a
                  href="tel:+18005553494"
                  className="btn btn-primary"
                  style={{ background: '#ffffff', color: '#0f172a', fontWeight: '700', width: 'fit-content' }}
                >
                  <Phone size={14} />
                  <span>Call Maintenance (Ext 404)</span>
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ====================================================================
          Feedback Modal (when Complaint is Resolved)
          ==================================================================== */}
      {feedbackModalOpen && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={() => setFeedbackModalOpen(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Rate Maintenance Service</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setFeedbackModalOpen(false)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleFeedbackSubmit}>
              <div className="modal-body">
                <p style={{ fontSize: '0.92rem', color: 'var(--slate)', textAlign: 'center' }}>
                  How satisfied are you with the resolution of <strong>{complaint.id}</strong> by{' '}
                  <strong>{complaint.technician?.name || 'our service team'}</strong>?
                </p>

                {/* 5-Star Interactive Rating */}
                <div className="feedback-stars-selector" role="radiogroup" aria-label="Rating">
                  {[1, 2, 3, 4, 5].map((starVal) => {
                    const isFilled = (hoverRating || rating) >= starVal
                    return (
                      <button
                        key={starVal}
                        type="button"
                        className={`star-btn ${isFilled ? 'star-btn--filled' : ''}`}
                        onMouseEnter={() => setHoverRating(starVal)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(starVal)}
                        aria-label={`${starVal} star`}
                      >
                        <Star size={32} fill={isFilled ? '#f59e0b' : 'none'} />
                      </button>
                    )
                  })}
                </div>

                <div className="modal-form-group">
                  <label htmlFor="feedback-comment">Comments & Service Remarks (Optional)</label>
                  <textarea
                    id="feedback-comment"
                    placeholder="Share any details on the technician's punctuality, repair quality, or campus facility..."
                    value={feedbackComment}
                    onChange={(e) => setFeedbackComment(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setFeedbackModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================================
          Reopen Request Modal (when Resolved or Rejected)
          ==================================================================== */}
      {reopenModalOpen && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={() => setReopenModalOpen(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Reopen Complaint Request</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setReopenModalOpen(false)}
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleReopenSubmit}>
              <div className="modal-body">
                <p style={{ fontSize: '0.92rem', color: 'var(--slate)' }}>
                  Please state why you are reopening <strong>{complaint.id}</strong> (e.g. the issue
                  recurred, unresolved damage, or administrative disagreement):
                </p>

                <div className="modal-form-group">
                  <label htmlFor="reopen-reason">Reason for Reopening *</label>
                  <textarea
                    id="reopen-reason"
                    required
                    placeholder="e.g. The leak resumed after technicians left, or equipment is still not functioning properly..."
                    value={reopenReason}
                    onChange={(e) => setReopenReason(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setReopenModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ background: '#d97706' }}>
                  <RotateCcw size={15} />
                  <span>Confirm Reopen Request</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ComplaintDetails
