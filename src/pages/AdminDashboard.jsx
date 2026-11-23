import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertCircle,
  AlertTriangle,
  BarChart3,
  Bell,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Download,
  ExternalLink,
  FileSpreadsheet,
  FileText,
  HardHat,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Search,
  Settings,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  Users,
  Wrench,
  X,
} from 'lucide-react'
import './AdminDashboard.css'

// Initial Admin Complaints Data
const INITIAL_ADMIN_COMPLAINTS = [
  {
    id: 'CMP-1048',
    title: 'Faulty AC in Computer Lab 3',
    department: 'Computer Science & IT',
    location: 'Science Complex Block C, Room 302',
    studentName: 'Alex Morgan',
    priority: 'High',
    status: 'In Progress',
    assignedTech: 'Mike Vance (HVAC)',
    date: '2026-11-21',
    displayDate: 'Nov 21, 2026',
  },
  {
    id: 'CMP-1052',
    title: 'Water Leakage from Ceiling in Corridor',
    department: 'Civil Facilities',
    location: 'Hostel Block B, 1st Floor East Wing',
    studentName: 'Jordan Lee',
    priority: 'Urgent',
    status: 'Pending',
    assignedTech: null,
    date: '2026-11-22',
    displayDate: 'Nov 22, 2026',
  },
  {
    id: 'CMP-1042',
    title: 'Broken Projector in Seminar Hall 102',
    department: 'Computer Science & IT',
    location: 'Academic Complex, Ground Floor',
    studentName: 'Sophia Martinez',
    priority: 'Medium',
    status: 'Resolved',
    assignedTech: 'David Cole (AV Tech)',
    date: '2026-11-19',
    displayDate: 'Nov 19, 2026',
  },
  {
    id: 'CMP-1040',
    title: 'Emergency Elevator Alarm Triggered',
    department: 'Hostel & Residential',
    location: 'Hostel Block A, Elevator Core 2',
    studentName: 'Marcus Wright',
    priority: 'Urgent',
    status: 'In Progress',
    assignedTech: 'Otis Elevator Team',
    date: '2026-11-18',
    displayDate: 'Nov 18, 2026',
  },
  {
    id: 'CMP-1039',
    title: 'Flickering LED Lights in Central Study Hall',
    department: 'Central Library',
    location: 'Central Library, 1st Floor Study Area',
    studentName: 'Chloe Bennett',
    priority: 'Low',
    status: 'Resolved',
    assignedTech: 'Sarah Jenkins (Electrician)',
    date: '2026-11-17',
    displayDate: 'Nov 17, 2026',
  },
  {
    id: 'CMP-1037',
    title: 'Broken Door Hinge in Chemistry Prep Room',
    department: 'Science Laboratories',
    location: 'Chemistry Block, Room 108',
    studentName: 'Daniel Kim',
    priority: 'Medium',
    status: 'Pending',
    assignedTech: null,
    date: '2026-11-15',
    displayDate: 'Nov 15, 2026',
  },
  {
    id: 'CMP-1032',
    title: 'Power Socket Sparking in Organic Lab 2',
    department: 'Science Laboratories',
    location: 'Chemistry Block, Organic Lab 2',
    studentName: 'Priya Patel',
    priority: 'High',
    status: 'Resolved',
    assignedTech: 'Robert Chen (Electrician)',
    date: '2026-11-13',
    displayDate: 'Nov 13, 2026',
  },
  {
    id: 'CMP-1028',
    title: 'Key Cylinder Jammed in Hostel Dorm 204',
    department: 'Hostel & Residential',
    location: 'Hostel Block A, 2nd Floor',
    studentName: 'Alex Morgan',
    priority: 'Medium',
    status: 'Resolved',
    assignedTech: 'Arthur Pendelton (Locksmith)',
    date: '2026-11-10',
    displayDate: 'Nov 10, 2026',
  },
]

// Available Technicians for Quick Dispatch
const AVAILABLE_TECHNICIANS = [
  { id: 'tech-1', name: 'Mike Vance', trade: 'HVAC & Climate Systems', activeJobs: 3 },
  { id: 'tech-2', name: 'David Cole', trade: 'Audio-Visual & Smart Labs', activeJobs: 1 },
  { id: 'tech-3', name: 'Sarah Jenkins', trade: 'Electrical Systems', activeJobs: 2 },
  { id: 'tech-4', name: 'Arthur Pendelton', trade: 'Carpentry & Locksmith', activeJobs: 0 },
  { id: 'tech-5', name: 'Robert Chen', trade: 'Senior Electrician', activeJobs: 1 },
  { id: 'tech-6', name: 'Paul Gomez', trade: 'Plumbing & Pipe Infrastructure', activeJobs: 2 },
]

// Monthly trend data
const MONTHLY_TREND_DATA = [
  { month: 'Jun', logged: 68, resolved: 62 },
  { month: 'Jul', logged: 84, resolved: 78 },
  { month: 'Aug', logged: 110, resolved: 104 },
  { month: 'Sep', logged: 145, resolved: 132 },
  { month: 'Oct', logged: 162, resolved: 154 },
  { month: 'Nov', logged: 156, resolved: 138 },
]

// Department breakdown data
const DEPARTMENT_BREAKDOWN = [
  { name: 'Computer Science & IT', count: 46, percent: 29, color: '#2563eb' },
  { name: 'Civil Facilities & Plumbing', count: 34, percent: 22, color: '#0891b2' },
  { name: 'Electrical & Power Systems', count: 28, percent: 18, color: '#f59e0b' },
  { name: 'Hostel & Residential Dorms', count: 24, percent: 15, color: '#7c3aed' },
  { name: 'Science Labs & Research', count: 14, percent: 9, color: '#10b981' },
  { name: 'Central Library & Archives', count: 10, percent: 7, color: '#ec4899' },
]

// Recent administrative activity items
const INITIAL_SYSTEM_ACTIVITY = [
  {
    id: 1,
    type: 'dispatch',
    title: 'Work Order Dispatched for #CMP-1048',
    desc: 'Mike Vance accepted HVAC ticket for Science Complex Block C.',
    time: '15 mins ago',
  },
  {
    id: 2,
    type: 'resolution',
    title: 'Complaint Resolved: #CMP-1042',
    desc: 'David Cole marked Projector issue resolved with calibration notes.',
    time: '2 hours ago',
  },
  {
    id: 3,
    type: 'urgent',
    title: 'Urgent Ticket Logged: #CMP-1052',
    desc: 'Water Leakage reported in Hostel Block B corridor. Pending dispatch.',
    time: '3 hours ago',
  },
  {
    id: 4,
    type: 'feedback',
    title: '5-Star Feedback Received',
    desc: 'Chloe Bennett rated Central Library LED repair (Sarah Jenkins).',
    time: '5 hours ago',
  },
  {
    id: 5,
    type: 'user',
    title: 'New Student Registered',
    desc: 'Elena Rostov (Civil Eng Dept, ID: STU-2024-9104) joined portal.',
    time: 'Yesterday at 4:30 PM',
  },
]

function AdminDashboard() {
  // Navigation & responsive state
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('Dashboard')
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)

  // Filters & search state
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [dateRange, setDateRange] = useState('This Month')
  const [toastMessage, setToastMessage] = useState(null)

  // Complaints & Activity state
  const [complaints, setComplaints] = useState(INITIAL_ADMIN_COMPLAINTS)
  const [activities] = useState(INITIAL_SYSTEM_ACTIVITY)

  // Quick Assign Modal state
  const [assignModalOpen, setAssignModalOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [chosenTechId, setChosenTechId] = useState('')

  // Filtered complaints calculation
  const filteredComplaints = useMemo(() => {
    return complaints.filter((item) => {
      const matchesSearch =
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === 'All' || item.status === statusFilter
      const matchesPriority = priorityFilter === 'All' || item.priority === priorityFilter

      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [complaints, searchQuery, statusFilter, priorityFilter])

  // Open Assign Modal for a ticket
  const handleOpenAssignModal = (ticket) => {
    setSelectedTicket(ticket)
    setChosenTechId(AVAILABLE_TECHNICIANS[0].id)
    setAssignModalOpen(true)
  }

  // Confirm technician assignment
  const handleConfirmAssignment = () => {
    if (!selectedTicket || !chosenTechId) return

    const techObj = AVAILABLE_TECHNICIANS.find((t) => t.id === chosenTechId)
    const techName = `${techObj.name} (${techObj.trade.split(' ')[0]})`

    setComplaints((prev) =>
      prev.map((c) =>
        c.id === selectedTicket.id
          ? { ...c, assignedTech: techName, status: 'In Progress' }
          : c
      )
    )

    setAssignModalOpen(false)
    setToastMessage({
      type: 'success',
      text: `Technician ${techObj.name} successfully dispatched to ticket ${selectedTicket.id}!`,
    })
    setTimeout(() => setToastMessage(null), 4000)
  }

  // Toast trigger for upcoming admin modules
  const handleNavClick = (moduleName) => {
    setActiveNav(moduleName)
    setSidebarOpen(false)
    setToastMessage({
      type: 'info',
      text: `${moduleName} operations module is active. Showing campus system records.`,
    })
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Quick export mock handler
  const handleExportReport = () => {
    setToastMessage({
      type: 'success',
      text: 'Export complete: Monthly Facility Operations Report (PDF/CSV) generated.',
    })
    setTimeout(() => setToastMessage(null), 3500)
  }

  // Priority color helper
  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'Urgent':
        return 'badge-priority badge-priority--urgent'
      case 'High':
        return 'badge-priority badge-priority--high'
      case 'Medium':
        return 'badge-priority badge-priority--medium'
      default:
        return 'badge-priority badge-priority--low'
    }
  }

  // Status color helper
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'badge-status badge-status--pending'
      case 'In Progress':
        return 'badge-status badge-status--progress'
      case 'Resolved':
        return 'badge-status badge-status--resolved'
      default:
        return 'badge-status badge-status--rejected'
    }
  }

  return (
    <div className="admin-layout">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ====================================================================
          Admin Sidebar Navigation
          ==================================================================== */}
      <aside
        className={`dashboard-sidebar ${sidebarOpen ? 'dashboard-sidebar--open' : ''}`}
        aria-label="Admin navigation sidebar"
      >
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo">
            <span className="sidebar-logo__icon" style={{ background: '#0284c7' }}>
              <ShieldCheck size={20} strokeWidth={2.4} />
            </span>
            <span>
              FixIt <span className="admin-portal-badge">Admin</span>
            </span>
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
            to="/admin/dashboard"
            className={`sidebar-nav__item ${
              activeNav === 'Dashboard' ? 'sidebar-nav__item--active' : ''
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/admin/complaints"
            className="sidebar-nav__item"
            onClick={() => setSidebarOpen(false)}
          >
            <FileText size={18} />
            <span>Manage Complaints</span>
          </Link>

          <Link
            to="/admin/technicians"
            className="sidebar-nav__item"
            onClick={() => setSidebarOpen(false)}
          >
            <HardHat size={18} />
            <span>Manage Technicians</span>
          </Link>

          <Link
            to="/admin/users"
            className="sidebar-nav__item"
            onClick={() => setSidebarOpen(false)}
          >
            <Users size={18} />
            <span>Manage Users</span>
          </Link>

          <Link
            to="/admin/departments"
            className="sidebar-nav__item"
            onClick={() => setSidebarOpen(false)}
          >
            <Building2 size={18} />
            <span>Manage Departments</span>
          </Link>

          <button
            type="button"
            className={`sidebar-nav__item ${
              activeNav === 'Reports & Analytics' ? 'sidebar-nav__item--active' : ''
            }`}
            onClick={() => handleNavClick('Reports & Analytics')}
          >
            <BarChart3 size={18} />
            <span>Reports & Analytics</span>
          </button>

          <button
            type="button"
            className={`sidebar-nav__item ${
              activeNav === 'Manage Feedback' ? 'sidebar-nav__item--active' : ''
            }`}
            onClick={() => handleNavClick('Manage Feedback')}
          >
            <MessageSquare size={18} />
            <span>Manage Feedback</span>
          </button>

          <div className="sidebar-divider" />

          <button
            type="button"
            className={`sidebar-nav__item ${
              activeNav === 'Settings' ? 'sidebar-nav__item--active' : ''
            }`}
            onClick={() => handleNavClick('Settings')}
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>

          <Link to="/login" className="sidebar-nav__item" onClick={() => setSidebarOpen(false)}>
            <LogOut size={18} />
            <span>Logout</span>
          </Link>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div
              className="sidebar-avatar"
              style={{ background: 'linear-gradient(135deg, #0284c7, #0369a1)' }}
            >
              AD
            </div>
            <div className="sidebar-user__info">
              <span className="sidebar-user__name">Dr. Eleanor Vance</span>
              <span className="sidebar-user__role">Facility Director • Super Admin</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ====================================================================
          Main Content Container
          ==================================================================== */}
      <div className="admin-main">
        {/* Top Header Bar */}
        <header className="admin-header-bar">
          <div className="header-left">
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar menu"
            >
              <Menu size={20} />
            </button>
            <div className="admin-greeting">
              <h1>
                <span>Welcome, Administrator</span>
                <span className="admin-portal-badge">Live Operations</span>
              </h1>
              <p>Campus maintenance command center • System health and real-time technician dispatch.</p>
            </div>
          </div>

          <div className="admin-header-controls">
            {/* Date filter dropdown */}
            <select
              className="date-filter-select"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              aria-label="Filter date range"
            >
              <option value="Today">Today (Real-time)</option>
              <option value="This Week">This Week</option>
              <option value="This Month">This Month (Nov 2026)</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="All Academic Year">All Academic Year</option>
            </select>

            {/* Quick Export Button */}
            <button
              type="button"
              className="admin-btn-action"
              onClick={handleExportReport}
              title="Export operational summary"
            >
              <Download size={15} />
              <span>Export Report</span>
            </button>

            {/* Notifications Icon */}
            <button
              type="button"
              className="header-icon-btn"
              onClick={() =>
                setToastMessage({
                  type: 'info',
                  text: '3 urgent tickets awaiting assignment in Hostel Block B.',
                })
              }
              aria-label="Admin alerts"
            >
              <Bell size={18} />
              <span
                style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#ef4444',
                }}
              />
            </button>

            {/* Admin Profile Dropdown */}
            <div className="profile-menu-container">
              <button
                type="button"
                className="profile-menu-trigger"
                onClick={() => setProfileDropdownOpen((prev) => !prev)}
                aria-expanded={profileDropdownOpen}
              >
                <div
                  className="profile-avatar-thumb"
                  style={{ background: 'linear-gradient(135deg, #0284c7, #0369a1)' }}
                >
                  EV
                </div>
                <span className="profile-menu-name">Admin Eleanor</span>
                <ChevronDown size={14} color="#64748b" />
              </button>

              {profileDropdownOpen && (
                <div className="profile-dropdown">
                  <div className="profile-dropdown__header">
                    <p className="profile-dropdown__name">Dr. Eleanor Vance</p>
                    <p className="profile-dropdown__email">admin.ops@campus-facilities.edu</p>
                  </div>
                  <button
                    type="button"
                    className="profile-dropdown__item"
                    onClick={() => {
                      setProfileDropdownOpen(false)
                      handleNavClick('Dashboard')
                    }}
                  >
                    <LayoutDashboard size={15} />
                    <span>Admin Overview</span>
                  </button>
                  <button
                    type="button"
                    className="profile-dropdown__item"
                    onClick={() => {
                      setProfileDropdownOpen(false)
                      handleNavClick('Settings')
                    }}
                  >
                    <Settings size={15} />
                    <span>Portal Settings</span>
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
        </header>

        {/* ================================================================
            Admin Dashboard Content
            ================================================================ */}
        <main className="admin-content">
          {/* Toast Notification Alert */}
          {toastMessage && (
            <div
              className={`admin-toast admin-toast--${toastMessage.type}`}
              role="status"
              aria-live="polite"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                {toastMessage.type === 'success' ? (
                  <CheckCircle2 size={18} />
                ) : (
                  <AlertCircle size={18} />
                )}
                <span>{toastMessage.text}</span>
              </div>
              <button
                type="button"
                className="profile-toast-close"
                onClick={() => setToastMessage(null)}
                aria-label="Dismiss message"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* ================================================================
              1. Key Performance Indicator Cards (KPIs)
              ================================================================ */}
          <div className="admin-metrics-grid">
            {/* Total Complaints */}
            <div className="metric-card">
              <div className="metric-card__top">
                <div>
                  <span className="metric-card__label">Total Complaints</span>
                  <div className="metric-card__value">156</div>
                </div>
                <div className="metric-icon-wrap metric-icon--blue">
                  <FileText size={22} />
                </div>
              </div>
              <div className="metric-card__bottom">
                <span className="metric-pill-up">
                  <TrendingUp size={13} />
                  +12.4%
                </span>
                <span>vs. previous 30-day period</span>
              </div>
            </div>

            {/* Pending */}
            <div className="metric-card">
              <div className="metric-card__top">
                <div>
                  <span className="metric-card__label">Pending Review</span>
                  <div className="metric-card__value" style={{ color: '#d97706' }}>
                    28
                  </div>
                </div>
                <div className="metric-icon-wrap metric-icon--amber">
                  <Clock size={22} />
                </div>
              </div>
              <div className="metric-card__bottom">
                <span className="metric-pill-pending">4 urgent tickets</span>
                <span>requiring technician dispatch</span>
              </div>
            </div>

            {/* In Progress */}
            <div className="metric-card">
              <div className="metric-card__top">
                <div>
                  <span className="metric-card__label">In Progress</span>
                  <div className="metric-card__value" style={{ color: '#2563eb' }}>
                    42
                  </div>
                </div>
                <div className="metric-icon-wrap metric-icon--indigo">
                  <Wrench size={22} />
                </div>
              </div>
              <div className="metric-card__bottom">
                <span style={{ color: '#2563eb', fontWeight: 700 }}>14 Technicians</span>
                <span>actively dispatched on campus</span>
              </div>
            </div>

            {/* Resolved */}
            <div className="metric-card">
              <div className="metric-card__top">
                <div>
                  <span className="metric-card__label">Resolved</span>
                  <div className="metric-card__value" style={{ color: '#059669' }}>
                    86
                  </div>
                </div>
                <div className="metric-icon-wrap metric-icon--emerald">
                  <CheckCircle2 size={22} />
                </div>
              </div>
              <div className="metric-card__bottom">
                <span className="metric-pill-up">
                  <Check size={13} strokeWidth={3} />
                  94.2%
                </span>
                <span>on-time resolution compliance</span>
              </div>
            </div>
          </div>

          {/* ================================================================
              2. Quick Action Tiles
              ================================================================ */}
          <div className="admin-quick-actions-bar">
            <button
              type="button"
              className="quick-action-tile"
              onClick={() => {
                const unassignedTicket = complaints.find((c) => !c.assignedTech) || complaints[0]
                handleOpenAssignModal(unassignedTicket)
              }}
            >
              <div className="quick-action-icon">
                <UserCheck size={20} />
              </div>
              <div>
                <span className="quick-action-title">Assign Technician</span>
                <span className="quick-action-sub">Dispatch to unassigned tickets</span>
              </div>
            </button>

            <button
              type="button"
              className="quick-action-tile"
              onClick={() => handleNavClick('Manage Users')}
            >
              <div className="quick-action-icon">
                <Users size={20} />
              </div>
              <div>
                <span className="quick-action-title">Manage Users</span>
                <span className="quick-action-sub">Student & staff directory</span>
              </div>
            </button>

            <button
              type="button"
              className="quick-action-tile"
              onClick={() => handleNavClick('Manage Technicians')}
            >
              <div className="quick-action-icon">
                <HardHat size={20} />
              </div>
              <div>
                <span className="quick-action-title">Technician Roster</span>
                <span className="quick-action-sub">View on-duty work orders</span>
              </div>
            </button>

            <button
              type="button"
              className="quick-action-tile"
              onClick={handleExportReport}
            >
              <div className="quick-action-icon">
                <FileSpreadsheet size={20} />
              </div>
              <div>
                <span className="quick-action-title">Generate Report</span>
                <span className="quick-action-sub">Download monthly analytics</span>
              </div>
            </button>
          </div>

          {/* ================================================================
              3. Visual Analytics & Charts Section
              ================================================================ */}
          <div className="admin-analytics-grid">
            {/* Left Column: Complaint Trends Bar Chart */}
            <div className="analytics-card">
              <div className="analytics-card__header">
                <h3 className="analytics-card__title">
                  <TrendingUp size={18} style={{ color: 'var(--primary)' }} />
                  <span>Complaint Influx & Resolution Trends</span>
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 600 }}>
                  Jun – Nov 2026
                </span>
              </div>

              <div className="analytics-card__body">
                <div className="chart-container">
                  <div className="chart-bars-wrap">
                    {MONTHLY_TREND_DATA.map((item) => {
                      const maxVal = 180
                      const loggedHeight = `${(item.logged / maxVal) * 100}%`
                      const resolvedHeight = `${(item.resolved / maxVal) * 100}%`

                      return (
                        <div key={item.month} className="chart-bar-col">
                          <div className="bar-tooltip">
                            {item.month}: {item.logged} logged, {item.resolved} resolved
                          </div>
                          <div className="chart-bar-group">
                            <div
                              className="bar-pill bar-pill--logged"
                              style={{ height: loggedHeight }}
                              title={`Logged: ${item.logged}`}
                            />
                            <div
                              className="bar-pill bar-pill--resolved"
                              style={{ height: resolvedHeight }}
                              title={`Resolved: ${item.resolved}`}
                            />
                          </div>
                          <span className="chart-bar-label">{item.month}</span>
                        </div>
                      )
                    })}
                  </div>

                  <div className="chart-legend">
                    <div className="legend-item">
                      <span className="legend-dot" style={{ background: '#2563eb' }} />
                      <span>Complaints Logged</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-dot" style={{ background: '#059669' }} />
                      <span>Complaints Resolved</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Complaints by Department & Priority Distribution */}
            <div className="analytics-card">
              <div className="analytics-card__header">
                <h3 className="analytics-card__title">
                  <Building2 size={18} style={{ color: '#7c3aed' }} />
                  <span>Complaints by Department</span>
                </h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Volume Share</span>
              </div>

              <div className="analytics-card__body">
                <div className="dept-bars-list">
                  {DEPARTMENT_BREAKDOWN.map((dept) => (
                    <div key={dept.name} className="dept-bar-item">
                      <div className="dept-bar-meta">
                        <span className="dept-bar-name">{dept.name}</span>
                        <span className="dept-bar-stats">
                          {dept.count} tickets ({dept.percent}%)
                        </span>
                      </div>
                      <div className="dept-progress-track">
                        <div
                          className="dept-progress-fill"
                          style={{
                            width: `${dept.percent}%`,
                            background: dept.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Priority Distribution Segmented Bar */}
                <div className="priority-distribution-box">
                  <div className="priority-distribution-title">Priority Distribution</div>
                  <div className="priority-segmented-bar">
                    <div
                      className="p-segment"
                      style={{ width: '12%', background: '#dc2626' }}
                      title="Urgent: 12%"
                    />
                    <div
                      className="p-segment"
                      style={{ width: '28%', background: '#f59e0b' }}
                      title="High: 28%"
                    />
                    <div
                      className="p-segment"
                      style={{ width: '40%', background: '#3b82f6' }}
                      title="Medium: 40%"
                    />
                    <div
                      className="p-segment"
                      style={{ width: '20%', background: '#64748b' }}
                      title="Low: 20%"
                    />
                  </div>

                  <div className="priority-legend-chips">
                    <div className="priority-chip">
                      <span className="priority-chip-name" style={{ color: '#dc2626' }}>
                        ● Urgent
                      </span>
                      <span className="priority-chip-val">12% (18)</span>
                    </div>
                    <div className="priority-chip">
                      <span className="priority-chip-name" style={{ color: '#d97706' }}>
                        ● High
                      </span>
                      <span className="priority-chip-val">28% (44)</span>
                    </div>
                    <div className="priority-chip">
                      <span className="priority-chip-name" style={{ color: '#2563eb' }}>
                        ● Medium
                      </span>
                      <span className="priority-chip-val">40% (62)</span>
                    </div>
                    <div className="priority-chip">
                      <span className="priority-chip-name" style={{ color: '#64748b' }}>
                        ● Low
                      </span>
                      <span className="priority-chip-val">20% (32)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================
              4. Recent Complaints Table & System Activity
              ================================================================ */}
          <div className="admin-analytics-grid">
            {/* Table Container (7 cols) */}
            <div className="admin-table-card">
              <div className="table-toolbar">
                <div className="table-toolbar-left">
                  <div className="admin-search-wrap">
                    <Search size={16} className="admin-search-icon" />
                    <input
                      type="text"
                      className="admin-search-input"
                      placeholder="Search by ID, title, student, or room..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="table-toolbar-right">
                  <select
                    className="table-filter-select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    aria-label="Filter by Status"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>

                  <select
                    className="table-filter-select"
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    aria-label="Filter by Priority"
                  >
                    <option value="All">All Priorities</option>
                    <option value="Urgent">Urgent</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Ticket ID</th>
                      <th>Complaint & Location</th>
                      <th>Student</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Assigned Tech</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredComplaints.length === 0 ? (
                      <tr>
                        <td colSpan={7} style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                          <AlertCircle size={28} style={{ color: '#94a3b8', margin: '0 auto 0.5rem' }} />
                          <p style={{ fontWeight: 600, color: 'var(--navy)' }}>
                            No complaints matching active filters.
                          </p>
                          <p style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
                            Try adjusting your search terms or filter selections.
                          </p>
                        </td>
                      </tr>
                    ) : (
                      filteredComplaints.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <Link to={`/user/complaints/${item.id}`} className="ticket-id-link">
                              {item.id}
                            </Link>
                          </td>
                          <td>
                            <span className="table-complaint-title">{item.title}</span>
                            <span className="table-complaint-loc">{item.location}</span>
                          </td>
                          <td>
                            <span style={{ fontWeight: 600, color: 'var(--navy)' }}>
                              {item.studentName}
                            </span>
                            <span style={{ display: 'block', fontSize: '0.74rem', color: 'var(--muted)' }}>
                              {item.department}
                            </span>
                          </td>
                          <td>
                            <span className={getPriorityBadgeClass(item.priority)}>
                              {item.priority}
                            </span>
                          </td>
                          <td>
                            <span className={getStatusBadgeClass(item.status)}>
                              {item.status}
                            </span>
                          </td>
                          <td>
                            {item.assignedTech ? (
                              <div className="tech-cell">
                                <div className="tech-avatar-mini">
                                  {item.assignedTech.slice(0, 2).toUpperCase()}
                                </div>
                                <span style={{ fontSize: '0.84rem', fontWeight: 500 }}>
                                  {item.assignedTech}
                                </span>
                              </div>
                            ) : (
                              <span
                                style={{
                                  fontSize: '0.78rem',
                                  color: '#dc2626',
                                  fontWeight: 600,
                                  background: '#fef2f2',
                                  padding: '0.2rem 0.5rem',
                                  borderRadius: '6px',
                                }}
                              >
                                Unassigned
                              </span>
                            )}
                          </td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                              {!item.assignedTech && (
                                <button
                                  type="button"
                                  className="btn-table-assign"
                                  onClick={() => handleOpenAssignModal(item)}
                                >
                                  Assign
                                </button>
                              )}
                              <Link
                                to={`/user/complaints/${item.id}`}
                                className="btn-table-view"
                                title="View full complaint details"
                              >
                                <ExternalLink size={13} />
                                <span>Details</span>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Column: Recent System Activity Timeline */}
            <div className="analytics-card">
              <div className="analytics-card__header">
                <h3 className="analytics-card__title">
                  <Clock size={18} style={{ color: 'var(--primary)' }} />
                  <span>Recent System Activity</span>
                </h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Live Feed</span>
              </div>

              <div className="analytics-card__body">
                <div className="admin-activity-list">
                  {activities.map((act) => {
                    let icon = <Wrench size={16} />
                    let iconBg = '#eff6ff'
                    let iconColor = '#2563eb'

                    if (act.type === 'resolution') {
                      icon = <CheckCircle2 size={16} />
                      iconBg = '#ecfdf5'
                      iconColor = '#059669'
                    } else if (act.type === 'urgent') {
                      icon = <AlertTriangle size={16} />
                      iconBg = '#fef2f2'
                      iconColor = '#dc2626'
                    } else if (act.type === 'feedback') {
                      icon = <MessageSquare size={16} />
                      iconBg = '#fef3c7'
                      iconColor = '#d97706'
                    } else if (act.type === 'user') {
                      icon = <Users size={16} />
                      iconBg = '#f5f3ff'
                      iconColor = '#7c3aed'
                    }

                    return (
                      <div key={act.id} className="admin-activity-item">
                        <div
                          className="activity-icon-bubble"
                          style={{ background: iconBg, color: iconColor }}
                        >
                          {icon}
                        </div>
                        <div className="activity-body">
                          <span className="activity-title-line">{act.title}</span>
                          <span className="activity-desc">{act.desc}</span>
                          <span className="activity-time">{act.time}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ====================================================================
          Quick Assign Technician Modal
          ==================================================================== */}
      {assignModalOpen && selectedTicket && (
        <div
          className="modal-backdrop"
          onClick={() => setAssignModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="assign-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Dispatch Maintenance Technician</h3>
              <button
                type="button"
                className="sidebar-close-btn"
                style={{ display: 'inline-flex' }}
                onClick={() => setAssignModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              {/* Ticket Preview Box */}
              <div className="modal-ticket-preview">
                <span className="modal-ticket-id">{selectedTicket.id}</span>
                <div className="modal-ticket-title">{selectedTicket.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.25rem' }}>
                  Location: {selectedTicket.location}
                </div>
              </div>

              {/* Technician Radio List */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    color: 'var(--navy)',
                    marginBottom: '0.65rem',
                  }}
                >
                  Select Available Specialist
                </label>
                <div className="tech-select-list">
                  {AVAILABLE_TECHNICIANS.map((tech) => (
                    <div
                      key={tech.id}
                      className={`tech-select-option ${
                        chosenTechId === tech.id ? 'tech-select-option--active' : ''
                      }`}
                      onClick={() => setChosenTechId(tech.id)}
                      role="button"
                      tabIndex={0}
                    >
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '0.9rem' }}>
                          {tech.name}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
                          {tech.trade}
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          background: tech.activeJobs === 0 ? '#ecfdf5' : '#f1f5f9',
                          color: tech.activeJobs === 0 ? '#059669' : '#475569',
                          fontWeight: 700,
                          padding: '0.2rem 0.5rem',
                          borderRadius: '6px',
                        }}
                      >
                        {tech.activeJobs === 0 ? 'Free Now' : `${tech.activeJobs} Active`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn-settings-cancel"
                onClick={() => setAssignModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-settings-save"
                onClick={handleConfirmAssignment}
              >
                Confirm Dispatch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
