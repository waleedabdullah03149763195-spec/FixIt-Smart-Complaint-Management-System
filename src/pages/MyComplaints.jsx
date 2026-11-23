import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Bell,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
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
  PlusCircle,
  RotateCcw,
  Search,
  Settings,
  Sparkles,
  User,
  Wrench,
  X,
  XCircle,
} from 'lucide-react'
import './MyComplaints.css'

// Comprehensive mock complaints dataset with all required statuses
const MOCK_COMPLAINTS = [
  {
    id: 'CMP-1052',
    title: 'Severe Water Pipe Burst in 2nd Floor Corridor',
    department: 'Civil Facilities',
    location: 'Hostel Block B, West Wing',
    date: '2026-11-22',
    displayDate: 'Nov 22, 2026',
    priority: 'Urgent',
    status: 'Pending',
    technician: 'Awaiting Dispatch',
    category: 'Plumbing & Water',
    description:
      'Main overhead line connection broke and water is leaking rapidly into the walkway, posing an imminent slipping and electrical hazard.',
    timelineStep: 1,
  },
  {
    id: 'CMP-1048',
    title: 'Faulty AC in Computer Lab 3',
    department: 'Computer Science & IT',
    location: 'Science Block C, Room 302',
    date: '2026-11-21',
    displayDate: 'Nov 21, 2026',
    priority: 'High',
    status: 'In Progress',
    technician: 'Mike Vance (HVAC Tech)',
    category: 'HVAC & Air Conditioning',
    description:
      'The split AC unit is making a loud buzzing noise and not cooling. Ambient temperature in the lab is exceeding 30°C during practical sessions.',
    timelineStep: 3,
  },
  {
    id: 'CMP-1046',
    title: 'Broken Window Latch in Lecture Hall 4B',
    department: 'Civil Facilities',
    location: 'Academic Complex, 4th Floor',
    date: '2026-11-20',
    displayDate: 'Nov 20, 2026',
    priority: 'Medium',
    status: 'Pending',
    technician: 'Assigned to Carpentry Team',
    category: 'Furniture & Carpentry',
    description:
      'Window frame latch is broken, causing wind noise and rain to blow directly inside during storm conditions.',
    timelineStep: 2,
  },
  {
    id: 'CMP-1042',
    title: 'Broken Projector in Seminar Hall 102',
    department: 'Computer Science & IT',
    location: 'Academic Complex, Ground Floor',
    date: '2026-11-19',
    displayDate: 'Nov 19, 2026',
    priority: 'Medium',
    status: 'Resolved',
    technician: 'David Cole (AV Support)',
    category: 'IT & Audio-Visual',
    description:
      'HDMI port on the podium was damaged and flickering red color. Replaced HDMI transmitter module and tested presentation display.',
    timelineStep: 4,
  },
  {
    id: 'CMP-1040',
    title: 'Elevator Emergency Call Button Unresponsive',
    department: 'Hostel & Residential',
    location: 'Hostel Tower A, Lift 2',
    date: '2026-11-18',
    displayDate: 'Nov 18, 2026',
    priority: 'Urgent',
    status: 'In Progress',
    technician: 'Schindler OEM Service Crew',
    category: 'Elevators & Campus Mobility',
    description:
      'Intercom call button inside Lift 2 does not ring the security guard cabin. Technicians dispatched for circuit testing.',
    timelineStep: 3,
  },
  {
    id: 'CMP-1039',
    title: 'Flickering LED Lights in Central Library Hall',
    department: 'Central Library',
    location: 'Central Library, 1st Floor Study Area',
    date: '2026-11-17',
    displayDate: 'Nov 17, 2026',
    priority: 'Low',
    status: 'Resolved',
    technician: 'Sarah Jenkins (Electrician)',
    category: 'Electrical & Power',
    description:
      'Two ceiling LED panels were flickering intermittently. Ballast and wiring connectors were replaced.',
    timelineStep: 4,
  },
  {
    id: 'CMP-1037',
    title: 'Request to install private mini-fridge in dorm',
    department: 'Hostel & Residential',
    location: 'Hostel Block A, Room 314',
    date: '2026-11-16',
    displayDate: 'Nov 16, 2026',
    priority: 'Low',
    status: 'Rejected',
    technician: 'Campus Housing Authority',
    category: 'Electrical & Power',
    rejectionReason:
      'Campus housing safety regulations strictly prohibit personal high-wattage refrigeration appliances in non-suite residential rooms.',
    description:
      'Resident requested personal electrical wiring installation for a private refrigerator.',
    timelineStep: 1,
  },
  {
    id: 'CMP-1035',
    title: 'Damaged Chair & Desk Set in Room 104',
    department: 'Campus Administration',
    location: 'Lecture Hall Complex, Room 104',
    date: '2026-11-15',
    displayDate: 'Nov 15, 2026',
    priority: 'Low',
    status: 'Pending',
    technician: 'Queued for Furniture Repair',
    category: 'Furniture & Carpentry',
    description:
      'Row 4 desk hinge is cracked and loose, needs carpentry tightening or seat replacement.',
    timelineStep: 1,
  },
  {
    id: 'CMP-1032',
    title: 'Power Socket Sparking in Chemistry Lab',
    department: 'Science Laboratories',
    location: 'Chemistry Block, Organic Lab 2',
    date: '2026-11-13',
    displayDate: 'Nov 13, 2026',
    priority: 'Urgent',
    status: 'Resolved',
    technician: 'Robert Chen (Senior Electrician)',
    category: 'Electrical & Power',
    description:
      'Bench 4 socket threw sparks when centrifuge was plugged in. Replaced faulty 16A socket and inspected local breaker.',
    timelineStep: 4,
  },
  {
    id: 'CMP-1029',
    title: 'Request to repaint dorm room walls with custom design',
    department: 'Hostel & Residential',
    location: 'Hostel Block B, Room 112',
    date: '2026-11-11',
    displayDate: 'Nov 11, 2026',
    priority: 'Low',
    status: 'Rejected',
    technician: 'Hostel Warden Office',
    category: 'Civil & Structural',
    rejectionReason:
      'Custom wall repainting is prohibited. Structural and aesthetic modifications are managed exclusively during annual summer maintenance cycles.',
    description:
      'Student submitted a request for personal painter access to paint bedroom walls with dark gray paint.',
    timelineStep: 1,
  },
  {
    id: 'CMP-1028',
    title: 'Door Lock Jammed in Room 204',
    department: 'Hostel & Residential',
    location: 'Hostel Block A, 2nd Floor',
    date: '2026-11-10',
    displayDate: 'Nov 10, 2026',
    priority: 'Medium',
    status: 'Resolved',
    technician: 'Arthur Pendelton (Locksmith)',
    category: 'Furniture & Carpentry',
    description:
      'Cylinder lock was seized and key was stuck. Replaced cylinder mechanism and tested with 2 master keys.',
    timelineStep: 4,
  },
  {
    id: 'CMP-1025',
    title: 'Wi-Fi Access Point Frequent Disconnections',
    department: 'Computer Science & IT',
    location: 'Central Library, 3rd Floor Silent Zone',
    date: '2026-11-08',
    displayDate: 'Nov 08, 2026',
    priority: 'High',
    status: 'In Progress',
    technician: 'Network Infrastructure Team',
    category: 'IT & Audio-Visual',
    description:
      'Cisco AP is dropping DHCP leases every 15 minutes under heavy student load. Firmware update and channel rebalancing in progress.',
    timelineStep: 3,
  },
]

const DEPARTMENTS = [
  'All Departments',
  'Civil Facilities',
  'Computer Science & IT',
  'Central Library',
  'Hostel & Residential',
  'Science Laboratories',
  'Campus Administration',
]

const STATUSES = ['All Statuses', 'Pending', 'In Progress', 'Resolved', 'Rejected']
const PRIORITIES = ['All Priorities', 'Low', 'Medium', 'High', 'Urgent']

const ITEMS_PER_PAGE = 5

function MyComplaints() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: 'Technician Mike Vance estimated resolution today for CMP-1048.',
      time: '15m ago',
    },
    {
      id: 2,
      message: 'Ticket CMP-1042 was verified and closed.',
      time: '1d ago',
    },
  ])

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Statuses')
  const [priorityFilter, setPriorityFilter] = useState('All Priorities')
  const [deptFilter, setDeptFilter] = useState('All Departments')
  const [sortBy, setSortBy] = useState('date-desc') // 'date-desc', 'date-asc'
  const [currentPage, setCurrentPage] = useState(1)

  // Filter and sort complaints
  const filteredComplaints = useMemo(() => {
    return MOCK_COMPLAINTS.filter((item) => {
      // Search by title or ID
      const query = searchQuery.trim().toLowerCase()
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query)

      // Status
      const matchesStatus =
        statusFilter === 'All Statuses' ||
        item.status.toLowerCase() === statusFilter.toLowerCase()

      // Priority
      const matchesPriority =
        priorityFilter === 'All Priorities' ||
        item.priority.toLowerCase() === priorityFilter.toLowerCase()

      // Department
      const matchesDept =
        deptFilter === 'All Departments' ||
        item.department.toLowerCase() === deptFilter.toLowerCase()

      return matchesSearch && matchesStatus && matchesPriority && matchesDept
    }).sort((a, b) => {
      if (sortBy === 'date-desc') {
        return new Date(b.date) - new Date(a.date)
      }
      return new Date(a.date) - new Date(b.date)
    })
  }, [searchQuery, statusFilter, priorityFilter, deptFilter, sortBy])

  // Pagination calculation
  const totalPages = Math.ceil(filteredComplaints.length / ITEMS_PER_PAGE) || 1
  const paginatedComplaints = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredComplaints.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredComplaints, currentPage])

  // Reset page to 1 when filters change
  const handleFilterChange = (setter, value) => {
    setter(value)
    setCurrentPage(1)
  }

  const handleClearFilters = () => {
    setSearchQuery('')
    setStatusFilter('All Statuses')
    setPriorityFilter('All Priorities')
    setDeptFilter('All Departments')
    setSortBy('date-desc')
    setCurrentPage(1)
  }

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    statusFilter !== 'All Statuses' ||
    priorityFilter !== 'All Priorities' ||
    deptFilter !== 'All Departments' ||
    sortBy !== 'date-desc'

  return (
    <div className="mycomplaints-layout">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ====================================================================
          Left Sidebar Navigation (Matching User Dashboard)
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
            {notifications.length > 0 && (
              <span className="sidebar-badge">{notifications.length}</span>
            )}
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
          Main Content Column
          ==================================================================== */}
      <div className="mycomplaints-main">
        {/* Top Header */}
        <header className="mycomplaints-header">
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
              <h1>My Complaints 📋</h1>
              <p>Track, filter, and monitor resolution progress across all your requests.</p>
            </div>
          </div>

          <div className="header-right">
            <div className="header-actions">
              {/* Notifications */}
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

                {notificationsOpen && (
                  <div className="notifications-popover" role="dialog" aria-label="Notifications">
                    <div className="notifications-header">
                      <h4>Notifications ({notifications.length})</h4>
                      <button
                        type="button"
                        className="notifications-clear"
                        onClick={() => setNotifications([])}
                      >
                        Clear all
                      </button>
                    </div>
                    {notifications.length === 0 ? (
                      <p style={{ fontSize: '0.82rem', color: '#64748b', padding: '0.5rem 0' }}>
                        No notifications.
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
                      to="/user/dashboard"
                      className="profile-dropdown__item"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <LayoutDashboard size={15} />
                      <span>Dashboard Overview</span>
                    </Link>
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
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <HelpCircle size={15} />
                      <span>Campus Helpdesk</span>
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

        {/* Content Body */}
        <main className="mycomplaints-content">
          {/* Top Intro & Action */}
          <div className="mycomplaints-intro">
            <div>
              <h1>Complaint History & Status</h1>
              <p>View all submitted maintenance requests, technician updates, and resolution proofs.</p>
            </div>
            <div className="mycomplaints-intro-actions">
              <Link to="/user/submit-complaint" className="btn btn-primary">
                <PlusCircle size={16} />
                <span>Submit New Complaint</span>
              </Link>
            </div>
          </div>

          {/* ================================================================
              Filter & Search Card
              ================================================================ */}
          <section className="complaints-filter-card" aria-label="Complaint Filters">
            {/* Search Input Row */}
            <div className="filter-search-row">
              <div className="search-box-large">
                <Search size={18} className="search-box-large__icon" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Search by complaint title, ticket ID (e.g. CMP-1048), or location..."
                  value={searchQuery}
                  onChange={(e) => handleFilterChange(setSearchQuery, e.target.value)}
                  aria-label="Search complaints"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="search-clear-btn"
                    onClick={() => handleFilterChange(setSearchQuery, '')}
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Dropdowns & Sorting Row */}
            <div className="filter-dropdowns-row">
              <div className="filter-select-group">
                <label htmlFor="filter-status">Status</label>
                <select
                  id="filter-status"
                  value={statusFilter}
                  onChange={(e) => handleFilterChange(setStatusFilter, e.target.value)}
                >
                  {STATUSES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-select-group">
                <label htmlFor="filter-priority">Priority</label>
                <select
                  id="filter-priority"
                  value={priorityFilter}
                  onChange={(e) => handleFilterChange(setPriorityFilter, e.target.value)}
                >
                  {PRIORITIES.map((pr) => (
                    <option key={pr} value={pr}>
                      {pr}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-select-group">
                <label htmlFor="filter-dept">Department</label>
                <select
                  id="filter-dept"
                  value={deptFilter}
                  onChange={(e) => handleFilterChange(setDeptFilter, e.target.value)}
                >
                  {DEPARTMENTS.map((dp) => (
                    <option key={dp} value={dp}>
                      {dp}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-select-group">
                <label htmlFor="filter-sort">Sort By Date</label>
                <select
                  id="filter-sort"
                  value={sortBy}
                  onChange={(e) => handleFilterChange(setSortBy, e.target.value)}
                >
                  <option value="date-desc">Newest First (Recent)</option>
                  <option value="date-asc">Oldest First</option>
                </select>
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  className="clear-filters-btn"
                  onClick={handleClearFilters}
                  title="Clear all search and dropdown filters"
                >
                  <RotateCcw size={14} />
                  <span>Clear Filters</span>
                </button>
              )}
            </div>

            {/* Filter Summary Bar */}
            <div className="filter-summary-bar">
              <span>
                Showing <strong>{filteredComplaints.length}</strong> of{' '}
                <strong>{MOCK_COMPLAINTS.length}</strong> complaints
              </span>

              {hasActiveFilters && (
                <div className="active-filter-tags">
                  {statusFilter !== 'All Statuses' && (
                    <span className="filter-tag">
                      Status: {statusFilter}
                      <button
                        type="button"
                        className="filter-tag-remove"
                        onClick={() => handleFilterChange(setStatusFilter, 'All Statuses')}
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}
                  {priorityFilter !== 'All Priorities' && (
                    <span className="filter-tag">
                      Priority: {priorityFilter}
                      <button
                        type="button"
                        className="filter-tag-remove"
                        onClick={() => handleFilterChange(setPriorityFilter, 'All Priorities')}
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}
                  {deptFilter !== 'All Departments' && (
                    <span className="filter-tag">
                      Dept: {deptFilter}
                      <button
                        type="button"
                        className="filter-tag-remove"
                        onClick={() => handleFilterChange(setDeptFilter, 'All Departments')}
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* ================================================================
              Complaints List: Desktop Table & Mobile Cards
              ================================================================ */}
          <div className="complaints-table-card">
            {filteredComplaints.length === 0 ? (
              /* Empty State */
              <div className="complaints-empty-state">
                <div className="empty-state-icon" aria-hidden="true">
                  <Filter size={28} />
                </div>
                <h3>No Complaints Found</h3>
                <p>
                  No maintenance records match your active search terms or filter combinations.
                  Try resetting the filters or searching with a different keyword.
                </p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClearFilters}
                >
                  <RotateCcw size={15} />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              <>
                {/* Desktop Responsive Table */}
                <div className="table-responsive">
                  <table className="complaints-table-desktop">
                    <thead>
                      <tr>
                        <th>Complaint ID</th>
                        <th>Title & Location</th>
                        <th>Department</th>
                        <th>Date</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedComplaints.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <span className="ticket-id">{item.id}</span>
                          </td>
                          <td style={{ maxWidth: '280px' }}>
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
                            <span className="ticket-date">{item.displayDate}</span>
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
                              {item.status === 'Rejected' && <XCircle size={13} />}
                              <span>{item.status}</span>
                            </span>
                          </td>
                          <td>
                            <Link
                              to={`/user/complaints/${item.id}`}
                              className="action-view-btn"
                              aria-label={`View details for ${item.id}`}
                            >
                              <Eye size={14} />
                              <span>View Details</span>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards (Rendered on smaller screens) */}
                <div className="complaints-mobile-cards">
                  {paginatedComplaints.map((item) => (
                    <div key={item.id} className="complaint-mobile-card">
                      <div className="mobile-card-header">
                        <span className="ticket-id">{item.id}</span>
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
                          {item.status === 'Rejected' && <XCircle size={13} />}
                          <span>{item.status}</span>
                        </span>
                      </div>

                      <h3 className="mobile-card-title">{item.title}</h3>

                      <div className="mobile-card-details">
                        <div>
                          <span>Department</span>
                          <strong>{item.department}</strong>
                        </div>
                        <div>
                          <span>Location</span>
                          <strong>{item.location}</strong>
                        </div>
                        <div>
                          <span>Submitted</span>
                          <strong>{item.displayDate}</strong>
                        </div>
                        <div>
                          <span>Priority</span>
                          <strong style={{ textTransform: 'capitalize' }}>
                            {item.priority}
                          </strong>
                        </div>
                      </div>

                      <div className="mobile-card-footer">
                        <span
                          className={`priority-badge priority-badge--${item.priority.toLowerCase()}`}
                        >
                          <span className="priority-dot" />
                          <span>{item.priority} Priority</span>
                        </span>
                        <Link
                          to={`/user/complaints/${item.id}`}
                          className="action-view-btn"
                          aria-label={`View details for ${item.id}`}
                        >
                          <Eye size={14} />
                          <span>View Details</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination Bar */}
                <div className="pagination-container">
                  <span>
                    Showing{' '}
                    <strong>
                      {(currentPage - 1) * ITEMS_PER_PAGE + 1} -{' '}
                      {Math.min(currentPage * ITEMS_PER_PAGE, filteredComplaints.length)}
                    </strong>{' '}
                    of <strong>{filteredComplaints.length}</strong> entries
                  </span>

                  <div className="pagination-buttons">
                    <button
                      type="button"
                      className="page-nav-btn"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    >
                      <ChevronLeft size={16} />
                      <span>Previous</span>
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        type="button"
                        className={`page-num-btn ${
                          currentPage === pageNum ? 'page-num-btn--active' : ''
                        }`}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </button>
                    ))}

                    <button
                      type="button"
                      className="page-nav-btn"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    >
                      <span>Next</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default MyComplaints
