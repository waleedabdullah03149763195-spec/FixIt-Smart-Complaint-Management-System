import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  AlertCircle,
  Bell,
  BellOff,
  CheckCheck,
  CheckCircle2,
  ChevronDown,
  Clock,
  ExternalLink,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  PlusCircle,
  Settings,
  Sparkles,
  Trash2,
  User,
  Wrench,
  X,
  XCircle,
} from 'lucide-react'
import './Notifications.css'

const INITIAL_NOTIFICATIONS = [
  {
    id: 'n-1',
    title: 'Technician Dispatched for #CMP-1048',
    description:
      'Mike Vance (HVAC Tech) has accepted work order #WO-8422 and is en route to Computer Lab 3 with replacement copper valves.',
    category: 'assignment',
    iconType: 'technician',
    complaintId: 'CMP-1048',
    date: 'Today',
    time: '15 mins ago',
    timestamp: '2026-11-23T01:15:00',
    read: false,
  },
  {
    id: 'n-2',
    title: 'Urgent Complaint #CMP-1052 Logged',
    description:
      'Your urgent water pipe burst report in Hostel Block B has been escalated to campus emergency plumbing response.',
    category: 'submission',
    iconType: 'alert',
    complaintId: 'CMP-1052',
    date: 'Today',
    time: '1 hour ago',
    timestamp: '2026-11-23T00:30:00',
    read: false,
  },
  {
    id: 'n-3',
    title: 'Scheduled Electrical Testing in Central Library',
    description:
      'Central Library power grid maintenance is scheduled today from 6:00 PM to 8:00 PM. Backup generators will supply study hall lighting.',
    category: 'announcement',
    iconType: 'announcement',
    complaintId: null,
    date: 'Today',
    time: '3 hours ago',
    timestamp: '2026-11-22T22:30:00',
    read: false,
  },
  {
    id: 'n-4',
    title: 'Complaint #CMP-1042 Marked Resolved',
    description:
      'Projector in Seminar Hall 102 was replaced & verified by David Cole. Click to view completion proof and sign-off remarks.',
    category: 'resolution',
    iconType: 'resolved',
    complaintId: 'CMP-1042',
    date: 'Yesterday',
    time: 'Nov 22 • 02:00 PM',
    timestamp: '2026-11-22T14:00:00',
    read: true,
  },
  {
    id: 'n-5',
    title: 'Please Rate Your Service Experience (#CMP-1039)',
    description:
      'Lighting repair for Central Library Hall was closed. Tell us how Sarah Jenkins did to help improve campus facility service.',
    category: 'feedback',
    iconType: 'feedback',
    complaintId: 'CMP-1039',
    date: '2 days ago',
    time: 'Nov 21 • 11:20 AM',
    timestamp: '2026-11-21T11:20:00',
    read: true,
  },
  {
    id: 'n-6',
    title: 'Status Update: #CMP-1040 Moved to In Progress',
    description:
      'Lift 2 emergency call button conduit inspection is now underway with the certified elevator mobility team.',
    category: 'status',
    iconType: 'status',
    complaintId: 'CMP-1040',
    date: '3 days ago',
    time: 'Nov 20 • 04:45 PM',
    timestamp: '2026-11-20T16:45:00',
    read: true,
  },
  {
    id: 'n-7',
    title: 'Administrative Decision on #CMP-1037',
    description:
      'Your request to install a private refrigerator in Hostel Block A was reviewed and rejected under safety policy code 4.2.',
    category: 'rejection',
    iconType: 'rejected',
    complaintId: 'CMP-1037',
    date: '4 days ago',
    time: 'Nov 19 • 03:30 PM',
    timestamp: '2026-11-19T15:30:00',
    read: true,
  },
]

function Notifications() {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)
  const [filter, setFilter] = useState('All') // 'All', 'Unread', 'Read'
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)

  // Unread count
  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.read).length
  }, [notifications])

  const readCount = useMemo(() => {
    return notifications.filter((n) => n.read).length
  }, [notifications])

  // Filtered notifications list
  const filteredNotifications = useMemo(() => {
    if (filter === 'Unread') return notifications.filter((n) => !n.read)
    if (filter === 'Read') return notifications.filter((n) => n.read)
    return notifications
  }, [notifications, filter])

  // Mark single notification as read / unread
  const handleToggleRead = (id, e) => {
    e.stopPropagation()
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: !item.read } : item))
    )
  }

  // Mark all notifications as read
  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })))
    setToastMessage('All notifications marked as read.')
    setTimeout(() => setToastMessage(null), 4000)
  }

  // Delete notification
  const handleDelete = (id, e) => {
    e.stopPropagation()
    setNotifications((prev) => prev.filter((item) => item.id !== id))
    setToastMessage('Notification removed.')
    setTimeout(() => setToastMessage(null), 3500)
  }

  // Clicking notification navigates to complaint if linked
  const handleCardClick = (item) => {
    // Automatically mark as read on click
    if (!item.read) {
      setNotifications((prev) =>
        prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
      )
    }

    if (item.complaintId) {
      navigate(`/user/complaints/${item.complaintId}`)
    }
  }

  // Render appropriate categorized icon
  const renderIcon = (type) => {
    switch (type) {
      case 'technician':
        return <Wrench size={20} />
      case 'alert':
        return <AlertCircle size={20} />
      case 'resolved':
        return <CheckCircle2 size={20} />
      case 'feedback':
        return <MessageSquare size={20} />
      case 'status':
        return <Clock size={20} />
      case 'rejected':
        return <XCircle size={20} />
      default:
        return <Sparkles size={20} />
    }
  }

  return (
    <div className="notif-layout">
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
            className="sidebar-nav__item"
            onClick={() => setSidebarOpen(false)}
          >
            <FileText size={18} />
            <span>My Complaints</span>
          </Link>

          <Link
            to="/user/notifications"
            className="sidebar-nav__item sidebar-nav__item--active"
            onClick={() => setSidebarOpen(false)}
          >
            <Bell size={18} />
            <span>Notifications</span>
            {unreadCount > 0 && <span className="sidebar-badge">{unreadCount}</span>}
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
          Main Notifications View
          ==================================================================== */}
      <div className="notif-main">
        {/* Top Header */}
        <header className="notif-header-bar">
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
              <h1>Notifications & Activity</h1>
              <p>Stay updated on maintenance progress, technician schedules, and alerts.</p>
            </div>
          </div>

          <div className="header-right">
            <div className="header-actions">
              {/* Notification icon with dynamic badge */}
              <button
                type="button"
                className="header-icon-btn"
                aria-label="Notifications count"
                title={`${unreadCount} unread notifications`}
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="header-notification-dot" aria-hidden="true" />
                )}
              </button>

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
        <main className="notif-content">
          {/* Toast Message */}
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

          {/* Intro Row */}
          <div className="notif-intro">
            <div>
              <h1>Recent Notifications</h1>
              <p>
                You have <strong>{unreadCount} unread</strong> notification{unreadCount === 1 ? '' : 's'}.
              </p>
            </div>

            <div className="notif-intro-actions">
              <button
                type="button"
                className="btn-mark-all"
                onClick={handleMarkAllAsRead}
                disabled={unreadCount === 0}
              >
                <CheckCheck size={16} />
                <span>Mark All as Read</span>
              </button>
            </div>
          </div>

          {/* Controls Card: Filter Pills */}
          <section className="notif-controls-card" aria-label="Notification filters">
            <div className="notif-filter-pills" role="tablist">
              <button
                type="button"
                className={`notif-filter-pill ${
                  filter === 'All' ? 'notif-filter-pill--active' : ''
                }`}
                onClick={() => setFilter('All')}
              >
                <span>All</span>
                <span className="notif-pill-count">{notifications.length}</span>
              </button>

              <button
                type="button"
                className={`notif-filter-pill ${
                  filter === 'Unread' ? 'notif-filter-pill--active' : ''
                }`}
                onClick={() => setFilter('Unread')}
              >
                <span>Unread</span>
                <span className="notif-pill-count">{unreadCount}</span>
              </button>

              <button
                type="button"
                className={`notif-filter-pill ${
                  filter === 'Read' ? 'notif-filter-pill--active' : ''
                }`}
                onClick={() => setFilter('Read')}
              >
                <span>Read</span>
                <span className="notif-pill-count">{readCount}</span>
              </button>
            </div>

            <span style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
              Showing {filteredNotifications.length} notification{filteredNotifications.length === 1 ? '' : 's'}
            </span>
          </section>

          {/* ================================================================
              Chronological Notification List
              ================================================================ */}
          <section className="notifications-feed" aria-label="Notifications list">
            {filteredNotifications.length === 0 ? (
              /* Empty State */
              <div className="notif-empty-state">
                <div className="notif-empty-icon" aria-hidden="true">
                  <BellOff size={32} />
                </div>
                <h3>No Notifications Found</h3>
                <p>
                  {filter === 'Unread'
                    ? "Great job! You don't have any unread notifications."
                    : filter === 'Read'
                    ? 'No read notifications to display.'
                    : "You're all caught up! Updates regarding maintenance requests and announcements will appear here."}
                </p>
                {filter !== 'All' && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setFilter('All')}
                  >
                    View All Notifications
                  </button>
                )}
              </div>
            ) : (
              filteredNotifications.map((item) => (
                <article
                  key={item.id}
                  className={`notif-card ${
                    item.read ? 'notif-card--read' : 'notif-card--unread'
                  }`}
                  onClick={() => handleCardClick(item)}
                  style={{ cursor: item.complaintId ? 'pointer' : 'default' }}
                >
                  {/* Unread indicator dot */}
                  {!item.read && <span className="notif-unread-dot" aria-label="Unread" />}

                  {/* Icon Box */}
                  <div
                    className={`notif-icon-box notif-icon-box--${item.iconType}`}
                    aria-hidden="true"
                  >
                    {renderIcon(item.iconType)}
                  </div>

                  {/* Main content */}
                  <div className="notif-main-content">
                    <div className="notif-top-row">
                      <h2 className="notif-title">
                        <span>{item.title}</span>
                        {item.complaintId && (
                          <span className="notif-ticket-tag">{item.complaintId}</span>
                        )}
                      </h2>
                      <time className="notif-time-badge">{item.time}</time>
                    </div>

                    <p className="notif-desc">{item.description}</p>

                    {/* Action buttons */}
                    <div className="notif-item-actions">
                      {item.complaintId && (
                        <button
                          type="button"
                          className="notif-view-btn"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleCardClick(item)
                          }}
                        >
                          <span>Inspect Ticket</span>
                          <ExternalLink size={13} />
                        </button>
                      )}

                      <button
                        type="button"
                        className="notif-mark-btn"
                        onClick={(e) => handleToggleRead(item.id, e)}
                        title={item.read ? 'Mark as unread' : 'Mark as read'}
                      >
                        {item.read ? 'Mark as Unread' : 'Mark as Read'}
                      </button>

                      <button
                        type="button"
                        className="notif-delete-btn"
                        onClick={(e) => handleDelete(item.id, e)}
                        aria-label={`Delete notification ${item.title}`}
                        title="Delete notification"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </section>
        </main>
      </div>
    </div>
  )
}

export default Notifications
