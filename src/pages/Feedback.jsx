import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertCircle,
  Bell,
  CheckCircle2,
  ChevronDown,
  Clock,
  FileText,
  LayoutDashboard,
  Loader2,
  LogOut,
  Menu,
  MessageSquare,
  PlusCircle,
  Send,
  Settings,
  Sparkles,
  Star,
  ThumbsUp,
  User,
  Wrench,
  X,
} from 'lucide-react'
import './Feedback.css'

// Initial available resolved complaints awaiting review
const RESOLVED_COMPLAINTS_TO_REVIEW = [
  {
    id: 'CMP-1039',
    title: 'Flickering LED Lights in Central Library Hall',
    department: 'Central Library',
    location: 'Central Library, 1st Floor Study Area',
    technicianName: 'Sarah Jenkins',
    technicianRole: 'Campus Electrician',
    resolvedDate: 'Nov 17, 2026',
  },
  {
    id: 'CMP-1042',
    title: 'Broken Projector in Seminar Hall 102',
    department: 'Computer Science & IT',
    location: 'Academic Complex, Ground Floor',
    technicianName: 'David Cole',
    technicianRole: 'Audio-Visual Specialist',
    resolvedDate: 'Nov 19, 2026',
  },
  {
    id: 'CMP-1032',
    title: 'Power Socket Sparking in Chemistry Lab',
    department: 'Science Laboratories',
    location: 'Chemistry Block, Organic Lab 2',
    technicianName: 'Robert Chen',
    technicianRole: 'Senior Electrician',
    resolvedDate: 'Nov 13, 2026',
  },
]

// Initial previous feedback records
const INITIAL_PREVIOUS_FEEDBACKS = [
  {
    id: 'fb-1',
    complaintId: 'CMP-1028',
    complaintTitle: 'Door Lock Jammed in Room 204',
    department: 'Hostel & Residential',
    technicianName: 'Arthur Pendelton (Locksmith)',
    overallRating: 5.0,
    serviceQuality: 5,
    responseTime: 5,
    technicianBehavior: 5,
    comment:
      'Locksmith Arthur was exceptionally fast and courteous. He arrived in under 30 minutes, replaced the damaged cylinder lock, and handed over 2 brand new test keys.',
    suggestion: 'It would be great to keep emergency master keys at the ground floor warden desk.',
    submittedDate: 'Nov 11, 2026',
  },
  {
    id: 'fb-2',
    complaintId: 'CMP-1021',
    complaintTitle: 'Leaking faucet in cafeteria wash area',
    department: 'Campus Administration',
    technicianName: 'Paul Gomez (Plumber)',
    overallRating: 4.3,
    serviceQuality: 4,
    responseTime: 4,
    technicianBehavior: 5,
    comment:
      'Clean repair job. The persistent water dripping stopped immediately and the wash counter was left tidy.',
    suggestion: 'Please notify the student cafeteria manager prior to shutting off main water valves.',
    submittedDate: 'Nov 06, 2026',
  },
]

const RATING_LABELS = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent',
}

function Feedback() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)

  // State for available complaints to review and past records
  const [availableComplaints, setAvailableComplaints] = useState(RESOLVED_COMPLAINTS_TO_REVIEW)
  const [previousFeedbacks, setPreviousFeedbacks] = useState(INITIAL_PREVIOUS_FEEDBACKS)

  // Form State
  const [selectedComplaintId, setSelectedComplaintId] = useState(
    availableComplaints.length > 0 ? availableComplaints[0].id : ''
  )
  const [serviceQuality, setServiceQuality] = useState(5)
  const [responseTime, setResponseTime] = useState(5)
  const [technicianBehavior, setTechnicianBehavior] = useState(5)
  const [comment, setComment] = useState('')
  const [suggestion, setSuggestion] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Currently selected complaint object
  const selectedComplaint = availableComplaints.find((c) => c.id === selectedComplaintId)

  // Calculate dynamic overall score
  const overallScore = (
    (serviceQuality + responseTime + technicianBehavior) /
    3
  ).toFixed(1)

  // Validation
  const validate = () => {
    const nextErrors = {}

    if (!selectedComplaintId) {
      nextErrors.complaint = 'Please select a resolved complaint to review.'
    }

    if (!serviceQuality || serviceQuality < 1) {
      nextErrors.serviceQuality = 'Please rate the service quality.'
    }

    if (!responseTime || responseTime < 1) {
      nextErrors.responseTime = 'Please rate the response time.'
    }

    if (!technicianBehavior || technicianBehavior < 1) {
      nextErrors.technicianBehavior = 'Please rate the technician behavior.'
    }

    if (!comment.trim()) {
      nextErrors.comment = 'Written feedback is required.'
    } else if (comment.trim().length < 10) {
      nextErrors.comment = 'Please provide at least 10 characters of feedback.'
    }

    return nextErrors
  }

  // Handle Submit Feedback
  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = validate()

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setIsSubmitting(true)
    setErrors({})

    setTimeout(() => {
      // Build new feedback record
      const newRecord = {
        id: `fb-${Date.now()}`,
        complaintId: selectedComplaint.id,
        complaintTitle: selectedComplaint.title,
        department: selectedComplaint.department,
        technicianName: `${selectedComplaint.technicianName} (${selectedComplaint.technicianRole})`,
        overallRating: parseFloat(overallScore),
        serviceQuality,
        responseTime,
        technicianBehavior,
        comment: comment.trim(),
        suggestion: suggestion.trim() || null,
        submittedDate: 'Just now',
      }

      // Add to past feedbacks
      setPreviousFeedbacks([newRecord, ...previousFeedbacks])

      // Remove from available complaints to prevent duplicate feedback!
      const updatedAvailable = availableComplaints.filter((c) => c.id !== selectedComplaint.id)
      setAvailableComplaints(updatedAvailable)
      setSelectedComplaintId(updatedAvailable.length > 0 ? updatedAvailable[0].id : '')

      // Reset form
      setComment('')
      setSuggestion('')
      setServiceQuality(5)
      setResponseTime(5)
      setTechnicianBehavior(5)
      setIsSubmitting(false)

      setToastMessage(
        `Thank you! Feedback for ${selectedComplaint.id} has been submitted successfully.`
      )
      setTimeout(() => setToastMessage(null), 5000)
    }, 600)
  }

  // Interactive Star Rating Component
  const renderStarInput = (val, setVal, name) => {
    return (
      <div className="stars-interactive-group" role="radiogroup" aria-label={name}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`star-input-btn ${star <= val ? 'star-input-btn--filled' : ''}`}
            onClick={() => setVal(star)}
            aria-label={`${star} Star`}
          >
            <Star size={24} fill={star <= val ? '#f59e0b' : 'none'} />
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="feedback-layout">
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
          </Link>

          <Link
            to="/user/feedback"
            className="sidebar-nav__item sidebar-nav__item--active"
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
          Main Feedback Content
          ==================================================================== */}
      <div className="feedback-main">
        {/* Header Bar */}
        <header className="feedback-header-bar">
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
              <h1>Service Feedback & Reviews ⭐</h1>
              <p>Rate completed repairs and help us maintain campus facility standards.</p>
            </div>
          </div>

          <div className="header-right">
            <div className="header-actions">
              <Link to="/user/notifications" className="header-icon-btn" aria-label="Notifications">
                <Bell size={18} />
              </Link>

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
          </div>
        </header>

        {/* Content Body */}
        <main className="feedback-content">
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

          {/* Intro Section */}
          <div className="feedback-intro">
            <div>
              <h1>Campus Maintenance Feedback</h1>
              <p>Your reviews directly inform maintenance performance reviews and contractor SLAs.</p>
            </div>

            <div className="feedback-stats-pill-row">
              <div className="feedback-stat-pill">
                <ThumbsUp size={15} style={{ color: 'var(--primary)' }} />
                <span>
                  Reviews Submitted: <strong>{previousFeedbacks.length}</strong>
                </span>
              </div>
              <div className="feedback-stat-pill">
                <Clock size={15} style={{ color: '#d97706' }} />
                <span>
                  Awaiting Review: <strong>{availableComplaints.length}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* ================================================================
              2-Column Split: Form (Left) & Previous History (Right)
              ================================================================ */}
          <div className="feedback-split-grid">
            {/* Left Column: Feedback Submission Form */}
            <div className="feedback-card">
              <div className="feedback-card__header">
                <h2 className="feedback-card__title">
                  <Star size={18} style={{ color: '#f59e0b' }} />
                  <span>Submit Resolution Feedback</span>
                </h2>
                <span className="section-card__badge">
                  {availableComplaints.length} Pending
                </span>
              </div>

              {availableComplaints.length === 0 ? (
                /* Helpful Empty State when all resolved tickets are reviewed */
                <div className="feedback-empty-state">
                  <div className="feedback-empty-icon" aria-hidden="true">
                    <CheckCircle2 size={32} style={{ color: '#10b981' }} />
                  </div>
                  <h3>All Complaints Reviewed!</h3>
                  <p>
                    You have reviewed all your recently resolved maintenance requests. Thank you for
                    helping us keep our campus running smoothly.
                  </p>
                  <Link to="/user/complaints" className="btn btn-secondary">
                    View My Complaints
                  </Link>
                </div>
              ) : (
                <form className="feedback-form" onSubmit={handleSubmit} noValidate>
                  {/* Complaint Selector */}
                  <div className="feedback-field">
                    <label htmlFor="complaint-select">
                      Select Resolved Complaint <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <select
                      id="complaint-select"
                      value={selectedComplaintId}
                      onChange={(e) => setSelectedComplaintId(e.target.value)}
                    >
                      {availableComplaints.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.id} — {item.title} (Resolved: {item.resolvedDate})
                        </option>
                      ))}
                    </select>
                    {errors.complaint && (
                      <p className="feedback-field-error">
                        <AlertCircle size={14} />
                        <span>{errors.complaint}</span>
                      </p>
                    )}
                  </div>

                  {/* Context preview for selected complaint */}
                  {selectedComplaint && (
                    <div className="complaint-context-box">
                      <div className="context-row-top">
                        <span className="record-ticket-id">{selectedComplaint.id}</span>
                        <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
                          Resolved on {selectedComplaint.resolvedDate}
                        </span>
                      </div>
                      <p className="context-title">{selectedComplaint.title}</p>
                      <div className="context-meta-text">
                        <span>
                          Technician: <strong>{selectedComplaint.technicianName}</strong> (
                          {selectedComplaint.technicianRole})
                        </span>
                        <span>
                          Location: <strong>{selectedComplaint.location}</strong>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Multi-Criteria Ratings Box */}
                  <div className="rating-criteria-box">
                    {/* 1. Service Quality */}
                    <div className="criteria-row">
                      <div className="criteria-info">
                        <span className="criteria-name">1. Service Quality</span>
                        <span className="criteria-desc">
                          Workmanship, thoroughness, and effectiveness of the repair
                        </span>
                      </div>
                      <div className="stars-picker-wrap">
                        {renderStarInput(serviceQuality, setServiceQuality, 'Service Quality')}
                        <span className="star-label-badge">{RATING_LABELS[serviceQuality]}</span>
                      </div>
                    </div>

                    {/* 2. Response Time */}
                    <div className="criteria-row">
                      <div className="criteria-info">
                        <span className="criteria-name">2. Response Time</span>
                        <span className="criteria-desc">
                          Punctuality, speed of dispatch and resolution turnaround
                        </span>
                      </div>
                      <div className="stars-picker-wrap">
                        {renderStarInput(responseTime, setResponseTime, 'Response Time')}
                        <span className="star-label-badge">{RATING_LABELS[responseTime]}</span>
                      </div>
                    </div>

                    {/* 3. Technician Behavior */}
                    <div className="criteria-row">
                      <div className="criteria-info">
                        <span className="criteria-name">3. Technician Behavior</span>
                        <span className="criteria-desc">
                          Courtesy, communication, professionalism and clean-up
                        </span>
                      </div>
                      <div className="stars-picker-wrap">
                        {renderStarInput(
                          technicianBehavior,
                          setTechnicianBehavior,
                          'Technician Behavior'
                        )}
                        <span className="star-label-badge">
                          {RATING_LABELS[technicianBehavior]}
                        </span>
                      </div>
                    </div>

                    {/* Overall Score Calculated */}
                    <div className="overall-score-bar">
                      <span>Overall Calculated Score</span>
                      <strong>{overallScore} / 5.0 ★</strong>
                    </div>
                  </div>

                  {/* Written Feedback Textarea */}
                  <div className="feedback-field">
                    <label htmlFor="feedback-comment">
                      Detailed Written Feedback <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <textarea
                      id="feedback-comment"
                      placeholder="Describe your experience with the repair. Was the problem fully solved? Did the technician explain what was wrong?"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      aria-invalid={Boolean(errors.comment)}
                    />
                    {errors.comment && (
                      <p className="feedback-field-error">
                        <AlertCircle size={14} />
                        <span>{errors.comment}</span>
                      </p>
                    )}
                  </div>

                  {/* Optional Suggestions */}
                  <div className="feedback-field">
                    <label htmlFor="feedback-suggestion">
                      Suggestions for Facility Operations (Optional)
                    </label>
                    <textarea
                      id="feedback-suggestion"
                      style={{ minHeight: '75px' }}
                      placeholder="Any ideas to prevent future breakdowns or improve campus facility processes?"
                      value={suggestion}
                      onChange={(e) => setSuggestion(e.target.value)}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-submit-feedback"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="spinner" aria-hidden="true" />
                        <span>Submitting Feedback...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} aria-hidden="true" />
                        <span>Submit Feedback</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right Column: Previous Feedback Records */}
            <div className="feedback-card">
              <div className="feedback-card__header">
                <h2 className="feedback-card__title">
                  <MessageSquare size={18} style={{ color: 'var(--primary)' }} />
                  <span>Your Previous Reviews</span>
                </h2>
                <span className="sidebar-badge" style={{ background: '#10b981' }}>
                  {previousFeedbacks.length} Recorded
                </span>
              </div>

              {previousFeedbacks.length === 0 ? (
                <div className="feedback-empty-state">
                  <div className="feedback-empty-icon" aria-hidden="true">
                    <MessageSquare size={28} />
                  </div>
                  <h3>No Past Feedback Yet</h3>
                  <p>When you rate resolved tickets, your review history will be displayed here.</p>
                </div>
              ) : (
                <div className="previous-feedbacks-list">
                  {previousFeedbacks.map((item) => (
                    <article key={item.id} className="feedback-record-card">
                      <div className="record-header">
                        <div>
                          <span className="record-ticket-id">{item.complaintId}</span>
                          <h3 className="record-title">{item.complaintTitle}</h3>
                        </div>
                        <time className="record-date">{item.submittedDate}</time>
                      </div>

                      {/* Ratings Chips */}
                      <div className="record-ratings-chips">
                        <div className="rating-chip" style={{ background: '#fffbeb', borderColor: '#fde68a' }}>
                          <Star size={13} fill="#f59e0b" color="#f59e0b" />
                          <span>Overall: <strong>{item.overallRating}</strong></span>
                        </div>
                        <div className="rating-chip">
                          <span>Quality: <strong>{item.serviceQuality}★</strong></span>
                        </div>
                        <div className="rating-chip">
                          <span>Speed: <strong>{item.responseTime}★</strong></span>
                        </div>
                        <div className="rating-chip">
                          <span>Technician: <strong>{item.technicianBehavior}★</strong></span>
                        </div>
                      </div>

                      {/* Comment */}
                      <div className="record-comment-box">
                        &ldquo;{item.comment}&rdquo;
                      </div>

                      {/* Suggestion if present */}
                      {item.suggestion && (
                        <div className="record-suggestion-box">
                          <Sparkles size={14} />
                          <span>
                            <strong>Suggestion:</strong> {item.suggestion}
                          </span>
                        </div>
                      )}

                      {/* Footer */}
                      <div className="record-footer">
                        <span>Technician: {item.technicianName}</span>
                        <Link
                          to={`/user/complaints/${item.complaintId}`}
                          style={{ color: 'var(--primary)', fontWeight: '600' }}
                        >
                          View Ticket →
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Feedback
