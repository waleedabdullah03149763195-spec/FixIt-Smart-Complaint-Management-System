import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertCircle,
  AlertTriangle,
  BarChart3,
  Bell,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Eye,
  FileText,
  HardHat,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Power,
  RotateCcw,
  Search,
  Settings,
  ShieldCheck,
  Trash2,
  UserCheck,
  Users,
  X,
} from 'lucide-react'
import './ManageUsers.css'

// Initial Campus Users Mock Dataset
const INITIAL_USERS_DATA = [
  {
    id: 'USR-101',
    name: 'Alex Morgan',
    email: 'alex.morgan@campus.edu',
    studentId: 'STU-2024-8842',
    department: 'Computer Science & IT',
    phone: '+1 (555) 482-9013',
    registrationDate: 'Sep 15, 2024',
    status: 'Active',
    totalComplaints: 24,
    resolvedComplaints: 10,
    residence: 'Hostel Block A, Room 204',
    emergencyContact: '+1 (555) 309-8812 (Guardian)',
  },
  {
    id: 'USR-102',
    name: 'Jordan Lee',
    email: 'jordan.lee@campus.edu',
    studentId: 'STU-2024-5519',
    department: 'Civil Facilities',
    phone: '+1 (555) 482-9055',
    registrationDate: 'Oct 02, 2024',
    status: 'Active',
    totalComplaints: 3,
    resolvedComplaints: 1,
    residence: 'Hostel Block B, Room 112',
    emergencyContact: '+1 (555) 902-1144',
  },
  {
    id: 'USR-103',
    name: 'Sophia Martinez',
    email: 'sophia.m@campus.edu',
    studentId: 'STU-2023-4108',
    department: 'Computer Science & IT',
    phone: '+1 (555) 482-7721',
    registrationDate: 'Sep 10, 2023',
    status: 'Active',
    totalComplaints: 5,
    resolvedComplaints: 4,
    residence: 'Hostel Block A, Room 309',
    emergencyContact: '+1 (555) 341-9900',
  },
  {
    id: 'USR-104',
    name: 'Marcus Wright',
    email: 'marcus.w@campus.edu',
    studentId: 'STU-2024-1923',
    department: 'Hostel & Residential',
    phone: '+1 (555) 482-6632',
    registrationDate: 'Aug 28, 2024',
    status: 'Active',
    totalComplaints: 4,
    resolvedComplaints: 2,
    residence: 'Hostel Block A, Room 102',
    emergencyContact: '+1 (555) 662-7711',
  },
  {
    id: 'USR-105',
    name: 'Chloe Bennett',
    email: 'c.bennett@campus.edu',
    studentId: 'STU-2023-7712',
    department: 'Central Library',
    phone: '+1 (555) 482-5509',
    registrationDate: 'Sep 12, 2023',
    status: 'Active',
    totalComplaints: 6,
    resolvedComplaints: 6,
    residence: 'Hostel Block C, Room 215',
    emergencyContact: '+1 (555) 881-2233',
  },
  {
    id: 'USR-106',
    name: 'Daniel Kim',
    email: 'daniel.kim@campus.edu',
    studentId: 'STU-2024-3381',
    department: 'Science Laboratories',
    phone: '+1 (555) 482-4418',
    registrationDate: 'Oct 15, 2024',
    status: 'Pending Verification',
    totalComplaints: 1,
    resolvedComplaints: 0,
    residence: 'Hostel Block B, Room 408',
    emergencyContact: '+1 (555) 124-7766',
  },
  {
    id: 'USR-107',
    name: 'Tariq Al-Mansoor',
    email: 't.mansoor@campus.edu',
    studentId: 'STU-2023-9022',
    department: 'Civil Facilities',
    phone: '+1 (555) 482-9901',
    registrationDate: 'Aug 20, 2023',
    status: 'Active',
    totalComplaints: 8,
    resolvedComplaints: 6,
    residence: 'Off-Campus Housing Unit 4',
    emergencyContact: '+1 (555) 901-4455',
  },
  {
    id: 'USR-108',
    name: 'Priya Patel',
    email: 'priya.patel@campus.edu',
    studentId: 'STU-2024-6649',
    department: 'Science Laboratories',
    phone: '+1 (555) 482-3312',
    registrationDate: 'Sep 01, 2024',
    status: 'Active',
    totalComplaints: 7,
    resolvedComplaints: 5,
    residence: 'Hostel Block C, Room 104',
    emergencyContact: '+1 (555) 334-1188',
  },
  {
    id: 'USR-109',
    name: 'Kevin Zhao',
    email: 'kevin.zhao@campus.edu',
    studentId: 'STU-2023-8821',
    department: 'Computer Science & IT',
    phone: '+1 (555) 482-1149',
    registrationDate: 'Sep 18, 2023',
    status: 'Active',
    totalComplaints: 2,
    resolvedComplaints: 1,
    residence: 'Hostel Block A, Room 410',
    emergencyContact: '+1 (555) 772-9911',
  },
  {
    id: 'USR-110',
    name: 'Elena Rostova',
    email: 'elena.rostov@campus.edu',
    studentId: 'STU-2024-9104',
    department: 'Civil Facilities',
    phone: '+1 (555) 482-8874',
    registrationDate: 'Nov 20, 2026',
    status: 'Active',
    totalComplaints: 0,
    resolvedComplaints: 0,
    residence: 'Hostel Block B, Room 220',
    emergencyContact: '+1 (555) 441-2299',
  },
  {
    id: 'USR-111',
    name: 'Prof. Harrison Cole',
    email: 'h.cole@campus.edu',
    studentId: 'FAC-2021-0042',
    department: 'Campus Administration',
    phone: '+1 (555) 482-0012',
    registrationDate: 'Jan 15, 2021',
    status: 'Inactive',
    totalComplaints: 1,
    resolvedComplaints: 0,
    residence: 'Faculty Residential Quarters 12',
    emergencyContact: '+1 (555) 001-4477',
  },
  {
    id: 'USR-112',
    name: 'Amina Idris',
    email: 'amina.idris@campus.edu',
    studentId: 'STU-2024-7733',
    department: 'Civil Facilities',
    phone: '+1 (555) 482-2289',
    registrationDate: 'Sep 05, 2024',
    status: 'Active',
    totalComplaints: 2,
    resolvedComplaints: 1,
    residence: 'Hostel Block C, Room 301',
    emergencyContact: '+1 (555) 229-3300',
  },
]

const DEPARTMENTS = [
  'All Departments',
  'Computer Science & IT',
  'Civil Facilities',
  'Hostel & Residential',
  'Science Laboratories',
  'Central Library',
  'Campus Administration',
]

const STATUSES = ['All Statuses', 'Active', 'Inactive', 'Pending Verification']

const ITEMS_PER_PAGE = 6

function ManageUsers() {
  // Navigation & responsive state
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)

  // Master Data & Feedback
  const [users, setUsers] = useState(INITIAL_USERS_DATA)
  const [toastMessage, setToastMessage] = useState(null)

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('All Departments')
  const [statusFilter, setStatusFilter] = useState('All Statuses')
  const [sortBy, setSortBy] = useState('name-asc') // 'name-asc' | 'name-desc' | 'date-desc' | 'id-asc'
  const [currentPage, setCurrentPage] = useState(1)

  // Modals state
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [activeUser, setActiveUser] = useState(null)

  // Edit form state
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    studentId: '',
    department: '',
    phone: '',
    status: 'Active',
    residence: '',
  })
  const [editErrors, setEditErrors] = useState({})

  // Stats calculation
  const stats = useMemo(() => {
    return {
      total: users.length,
      active: users.filter((u) => u.status === 'Active').length,
      inactive: users.filter((u) => u.status === 'Inactive').length,
      pending: users.filter((u) => u.status === 'Pending Verification').length,
    }
  }, [users])

  // Filtered and sorted users
  const processedUsers = useMemo(() => {
    const result = users.filter((user) => {
      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        user.studentId.toLowerCase().includes(q) ||
        user.department.toLowerCase().includes(q) ||
        user.id.toLowerCase().includes(q)

      const matchesDept =
        departmentFilter === 'All Departments' || user.department === departmentFilter
      const matchesStatus =
        statusFilter === 'All Statuses' || user.status === statusFilter

      return matchesSearch && matchesDept && matchesStatus
    })

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name)
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name)
      if (sortBy === 'date-desc') return new Date(b.registrationDate) - new Date(a.registrationDate)
      if (sortBy === 'id-asc') return a.studentId.localeCompare(b.studentId)
      return 0
    })

    return result
  }, [users, searchQuery, departmentFilter, statusFilter, sortBy])

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(processedUsers.length / ITEMS_PER_PAGE))
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return processedUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [processedUsers, currentPage])

  // Filter change helper
  const handleFilterChange = (setter, value) => {
    setter(value)
    setCurrentPage(1)
  }

  // Clear filters
  const handleClearFilters = () => {
    setSearchQuery('')
    setDepartmentFilter('All Departments')
    setStatusFilter('All Statuses')
    setSortBy('name-asc')
    setCurrentPage(1)
  }

  // 1. View User Details
  const handleOpenDetails = (user) => {
    setActiveUser(user)
    setDetailsModalOpen(true)
  }

  // 2. Open Edit Modal
  const handleOpenEdit = (user) => {
    setActiveUser(user)
    setEditForm({
      name: user.name,
      email: user.email,
      studentId: user.studentId,
      department: user.department,
      phone: user.phone,
      status: user.status,
      residence: user.residence,
    })
    setEditErrors({})
    setEditModalOpen(true)
  }

  const validateEditForm = () => {
    const errors = {}
    if (!editForm.name.trim()) errors.name = 'Full name is required.'

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!editForm.email.trim()) {
      errors.email = 'Email address is required.'
    } else if (!emailRegex.test(editForm.email.trim())) {
      errors.email = 'Enter a valid email address.'
    }

    if (!editForm.studentId.trim()) errors.studentId = 'Student ID is required.'
    if (!editForm.phone.trim()) errors.phone = 'Phone number is required.'

    return errors
  }

  const handleSaveEditUser = (e) => {
    e.preventDefault()
    const errors = validateEditForm()

    if (Object.keys(errors).length > 0) {
      setEditErrors(errors)
      return
    }

    setUsers((prev) =>
      prev.map((u) => (u.id === activeUser.id ? { ...u, ...editForm } : u))
    )

    setEditModalOpen(false)
    setToastMessage({
      type: 'success',
      text: `User profile for ${editForm.name} updated successfully.`,
    })
    setTimeout(() => setToastMessage(null), 3000)
  }

  // 3. Activate / Deactivate demo account
  const handleToggleStatus = (user) => {
    const nextStatus = user.status === 'Active' ? 'Inactive' : 'Active'

    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, status: nextStatus } : u))
    )

    setToastMessage({
      type: 'info',
      text: `Account ${user.studentId} (${user.name}) status changed to "${nextStatus}".`,
    })
    setTimeout(() => setToastMessage(null), 3000)
  }

  // 4. Delete user
  const handleOpenDelete = (user) => {
    setActiveUser(user)
    setDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (!activeUser) return

    setUsers((prev) => prev.filter((u) => u.id !== activeUser.id))
    setDeleteModalOpen(false)
    setToastMessage({
      type: 'info',
      text: `User ${activeUser.name} (${activeUser.studentId}) removed from campus directory.`,
    })
    setTimeout(() => setToastMessage(null), 3500)
  }

  // Status Badge Class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Active':
        return 'badge-user-status badge-user-status--active'
      case 'Inactive':
        return 'badge-user-status badge-user-status--inactive'
      default:
        return 'badge-user-status badge-user-status--pending'
    }
  }

  return (
    <div className="manage-users-layout">
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
            className="sidebar-nav__item"
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
            className="sidebar-nav__item sidebar-nav__item--active"
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
            className="sidebar-nav__item"
            onClick={() => {
              setToastMessage({ type: 'info', text: 'Reports & analytics module is active.' })
              setSidebarOpen(false)
            }}
          >
            <BarChart3 size={18} />
            <span>Reports & Analytics</span>
          </button>

          <button
            type="button"
            className="sidebar-nav__item"
            onClick={() => {
              setToastMessage({ type: 'info', text: 'Campus feedback reviews module is active.' })
              setSidebarOpen(false)
            }}
          >
            <MessageSquare size={18} />
            <span>Manage Feedback</span>
          </button>

          <div className="sidebar-divider" />

          <button
            type="button"
            className="sidebar-nav__item"
            onClick={() => {
              setToastMessage({ type: 'info', text: 'Admin system preferences are configured.' })
              setSidebarOpen(false)
            }}
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
          Main Container
          ==================================================================== */}
      <div className="manage-users-main">
        {/* Top Header Bar */}
        <header className="manage-users-header-bar">
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
                <span>Manage Campus Users</span>
                <span className="admin-portal-badge">{users.length} Registered</span>
              </h1>
              <p>Student and staff directory, account status oversight, and complaint history.</p>
            </div>
          </div>

          <div className="admin-header-controls">
            <button
              type="button"
              className="header-icon-btn"
              onClick={() =>
                setToastMessage({
                  type: 'info',
                  text: 'User alerts: 1 student account pending registrar verification.',
                })
              }
              aria-label="Notifications"
            >
              <Bell size={18} />
            </button>

            {/* Profile Dropdown */}
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
                  <Link
                    to="/admin/dashboard"
                    className="profile-dropdown__item"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <LayoutDashboard size={15} />
                    <span>Admin Dashboard</span>
                  </Link>
                  <Link
                    to="/admin/users"
                    className="profile-dropdown__item"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <Users size={15} />
                    <span>Manage Users</span>
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
        <main className="manage-users-content">
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
              1. Top Statistics Quick Strip
              ================================================================ */}
          <div className="users-stats-strip">
            <div
              className={`user-stat-card ${
                statusFilter === 'All Statuses' ? 'user-stat-card--active' : ''
              }`}
              onClick={() => handleFilterChange(setStatusFilter, 'All Statuses')}
              role="button"
              tabIndex={0}
            >
              <div>
                <span className="user-stat-label">Total Users</span>
                <div className="user-stat-val">{stats.total}</div>
              </div>
              <div className="user-stat-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
                <Users size={20} />
              </div>
            </div>

            <div
              className={`user-stat-card ${
                statusFilter === 'Active' ? 'user-stat-card--active' : ''
              }`}
              onClick={() => handleFilterChange(setStatusFilter, 'Active')}
              role="button"
              tabIndex={0}
            >
              <div>
                <span className="user-stat-label">Active Accounts</span>
                <div className="user-stat-val" style={{ color: '#059669' }}>
                  {stats.active}
                </div>
              </div>
              <div className="user-stat-icon" style={{ background: '#ecfdf5', color: '#059669' }}>
                <UserCheck size={20} />
              </div>
            </div>

            <div
              className={`user-stat-card ${
                statusFilter === 'Inactive' ? 'user-stat-card--active' : ''
              }`}
              onClick={() => handleFilterChange(setStatusFilter, 'Inactive')}
              role="button"
              tabIndex={0}
            >
              <div>
                <span className="user-stat-label">Inactive / Disabled</span>
                <div className="user-stat-val" style={{ color: '#64748b' }}>
                  {stats.inactive}
                </div>
              </div>
              <div className="user-stat-icon" style={{ background: '#f1f5f9', color: '#64748b' }}>
                <Power size={20} />
              </div>
            </div>

            <div
              className={`user-stat-card ${
                statusFilter === 'Pending Verification' ? 'user-stat-card--active' : ''
              }`}
              onClick={() => handleFilterChange(setStatusFilter, 'Pending Verification')}
              role="button"
              tabIndex={0}
            >
              <div>
                <span className="user-stat-label">Pending Verification</span>
                <div className="user-stat-val" style={{ color: '#d97706' }}>
                  {stats.pending}
                </div>
              </div>
              <div className="user-stat-icon" style={{ background: '#fffbeb', color: '#d97706' }}>
                <AlertCircle size={20} />
              </div>
            </div>
          </div>

          {/* ================================================================
              2. Search, Filter & Sort Toolbar
              ================================================================ */}
          <div className="users-toolbar-card">
            <div className="users-toolbar-left">
              <div className="users-search-wrap">
                <Search size={16} className="users-search-icon" />
                <input
                  type="text"
                  className="users-search-input"
                  placeholder="Search by student name, ID (#STU-2024-8842), or email..."
                  value={searchQuery}
                  onChange={(e) => handleFilterChange(setSearchQuery, e.target.value)}
                />
              </div>

              <select
                className="filter-select"
                value={departmentFilter}
                onChange={(e) => handleFilterChange(setDepartmentFilter, e.target.value)}
                aria-label="Filter by department"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>

              <select
                className="filter-select"
                value={statusFilter}
                onChange={(e) => handleFilterChange(setStatusFilter, e.target.value)}
                aria-label="Filter by status"
              >
                {STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div className="users-toolbar-right">
              <select
                className="filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort users"
              >
                <option value="name-asc">Name (A → Z)</option>
                <option value="name-desc">Name (Z → A)</option>
                <option value="date-desc">Registration Date (Newest)</option>
                <option value="id-asc">Student ID Code</option>
              </select>

              {(searchQuery ||
                departmentFilter !== 'All Departments' ||
                statusFilter !== 'All Statuses') && (
                <button
                  type="button"
                  className="btn-clear-filters"
                  onClick={handleClearFilters}
                >
                  <RotateCcw size={13} />
                  <span>Clear</span>
                </button>
              )}
            </div>
          </div>

          {/* ================================================================
              3. Users Table & Mobile Cards View
              ================================================================ */}
          <div className="users-table-card">
            {/* Desktop Data Table */}
            <div className="users-table-container">
              <table className="manage-users-table">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Full Name & Email</th>
                    <th>Student ID</th>
                    <th>Department</th>
                    <th>Registered</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
                        <Users size={32} style={{ color: '#94a3b8', margin: '0 auto 0.65rem' }} />
                        <p style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '1rem' }}>
                          No users found matching current filters.
                        </p>
                        <p style={{ fontSize: '0.84rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
                          Try clearing filters or checking spelling.
                        </p>
                        <button
                          type="button"
                          className="btn-table-assign"
                          style={{ marginTop: '1rem' }}
                          onClick={handleClearFilters}
                        >
                          Clear All Filters
                        </button>
                      </td>
                    </tr>
                  ) : (
                    paginatedUsers.map((user) => (
                      <tr key={user.id}>
                        {/* User ID */}
                        <td>
                          <span
                            className="student-id-code"
                            onClick={() => handleOpenDetails(user)}
                            style={{ cursor: 'pointer' }}
                            title="Click to view details"
                          >
                            {user.id}
                          </span>
                        </td>

                        {/* Full Name & Email */}
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                            <div className="user-avatar-mini">
                              {user.name.split(' ').map((n) => n[0]).join('')}
                            </div>
                            <div>
                              <span className="user-name-title">{user.name}</span>
                              <span className="user-email-sub">{user.email}</span>
                            </div>
                          </div>
                        </td>

                        {/* Student ID */}
                        <td>
                          <span className="student-id-code">{user.studentId}</span>
                        </td>

                        {/* Department */}
                        <td>
                          <span style={{ fontSize: '0.84rem', fontWeight: 500 }}>
                            {user.department}
                          </span>
                        </td>

                        {/* Registered Date */}
                        <td>
                          <span style={{ fontSize: '0.82rem', color: 'var(--slate)', whiteSpace: 'nowrap' }}>
                            {user.registrationDate}
                          </span>
                        </td>

                        {/* Status */}
                        <td>
                          <span className={getStatusBadgeClass(user.status)}>
                            {user.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'flex-end' }}>
                            <button
                              type="button"
                              className="btn-action-icon"
                              onClick={() => handleOpenDetails(user)}
                              title="View User Details"
                            >
                              <Eye size={14} />
                            </button>

                            <button
                              type="button"
                              className="btn-action-icon"
                              onClick={() => handleOpenEdit(user)}
                              title="Edit User Details"
                            >
                              <Edit3 size={14} />
                            </button>

                            <button
                              type="button"
                              className="btn-action-icon"
                              style={{ color: user.status === 'Active' ? '#d97706' : '#059669' }}
                              onClick={() => handleToggleStatus(user)}
                              title={user.status === 'Active' ? 'Deactivate Account' : 'Activate Account'}
                            >
                              <Power size={14} />
                            </button>

                            <button
                              type="button"
                              className="btn-action-icon"
                              style={{ color: '#ef4444' }}
                              onClick={() => handleOpenDelete(user)}
                              title="Delete User"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards (Shown on small screens) */}
            <div className="users-mobile-cards">
              {paginatedUsers.map((user) => (
                <div key={user.id} className="user-mobile-card">
                  <div className="user-mobile-card__header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <div className="user-avatar-mini">
                        {user.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <span className="user-name-title">{user.name}</span>
                        <span className="user-email-sub">{user.studentId}</span>
                      </div>
                    </div>

                    <span className={getStatusBadgeClass(user.status)}>
                      {user.status}
                    </span>
                  </div>

                  <div className="user-mobile-card__body">
                    <div>
                      <span style={{ color: 'var(--muted)' }}>Department: </span>
                      <span style={{ fontWeight: 600 }}>{user.department}</span>
                    </div>
                    <div>
                      <span style={{ color: 'var(--muted)' }}>Email: </span>
                      <span>{user.email}</span>
                    </div>
                    <div>
                      <span style={{ color: 'var(--muted)' }}>Registered: </span>
                      <span>{user.registrationDate}</span>
                    </div>
                  </div>

                  <div className="user-mobile-card__footer">
                    <button
                      type="button"
                      className="btn-tech-card-action"
                      onClick={() => handleOpenDetails(user)}
                    >
                      <Eye size={13} />
                      <span>Details</span>
                    </button>
                    <button
                      type="button"
                      className="btn-tech-card-action"
                      onClick={() => handleOpenEdit(user)}
                    >
                      <Edit3 size={13} />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      className="btn-tech-card-action"
                      style={{ color: '#ef4444' }}
                      onClick={() => handleOpenDelete(user)}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Bar */}
            {processedUsers.length > 0 && (
              <div className="complaints-pagination">
                <span className="pagination-info">
                  Showing{' '}
                  <strong>
                    {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                    {Math.min(currentPage * ITEMS_PER_PAGE, processedUsers.length)}
                  </strong>{' '}
                  of <strong>{processedUsers.length}</strong> registered users
                </span>

                <div className="pagination-controls">
                  <button
                    type="button"
                    className="btn-pagination"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      type="button"
                      className={`btn-pagination ${
                        currentPage === pageNum ? 'btn-pagination--active' : ''
                      }`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  ))}

                  <button
                    type="button"
                    className="btn-pagination"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ====================================================================
          1. View User Details Modal
          ==================================================================== */}
      {detailsModalOpen && activeUser && (
        <div
          className="modal-backdrop"
          onClick={() => setDetailsModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="assign-modal-card" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Student & User Information</h3>
              <button
                type="button"
                className="sidebar-close-btn"
                style={{ display: 'inline-flex' }}
                onClick={() => setDetailsModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <div className="user-profile-modal-hero">
                <div className="user-profile-modal-avatar">
                  {activeUser.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--navy)', fontWeight: 800 }}>
                    {activeUser.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                    <span className="student-id-code">{activeUser.studentId}</span>
                    <span className={getStatusBadgeClass(activeUser.status)}>
                      {activeUser.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="user-details-grid">
                <div className="user-detail-tile">
                  <label>Internal User ID</label>
                  <span>{activeUser.id}</span>
                </div>

                <div className="user-detail-tile">
                  <label>Department</label>
                  <span>{activeUser.department}</span>
                </div>

                <div className="user-detail-tile">
                  <label>Email Address</label>
                  <span style={{ fontSize: '0.8rem' }}>{activeUser.email}</span>
                </div>

                <div className="user-detail-tile">
                  <label>Contact Phone</label>
                  <span>{activeUser.phone}</span>
                </div>

                <div className="user-detail-tile">
                  <label>Registered Date</label>
                  <span>{activeUser.registrationDate}</span>
                </div>

                <div className="user-detail-tile">
                  <label>Campus Residence</label>
                  <span>{activeUser.residence}</span>
                </div>

                <div className="user-detail-tile">
                  <label>Complaints Logged</label>
                  <span style={{ color: '#2563eb' }}>{activeUser.totalComplaints} Tickets</span>
                </div>

                <div className="user-detail-tile">
                  <label>Complaints Resolved</label>
                  <span style={{ color: '#059669' }}>{activeUser.resolvedComplaints} Resolved</span>
                </div>

                <div className="user-detail-tile" style={{ gridColumn: '1 / -1' }}>
                  <label>Emergency Contact</label>
                  <span>{activeUser.emergencyContact}</span>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn-settings-cancel"
                onClick={() => setDetailsModalOpen(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn-settings-save"
                onClick={() => {
                  setDetailsModalOpen(false)
                  handleOpenEdit(activeUser)
                }}
              >
                Edit User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          2. Edit User Modal
          ==================================================================== */}
      {editModalOpen && activeUser && (
        <div
          className="modal-backdrop"
          onClick={() => setEditModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="assign-modal-card" style={{ maxWidth: '540px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit User Profile ({activeUser.id})</h3>
              <button
                type="button"
                className="sidebar-close-btn"
                style={{ display: 'inline-flex' }}
                onClick={() => setEditModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEditUser}>
              <div className="modal-body">
                <div className="modal-form-grid">
                  <div className="modal-form-group">
                    <label className="modal-label">
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      className={`modal-input ${editErrors.name ? 'modal-input--error' : ''}`}
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    />
                    {editErrors.name && (
                      <span style={{ fontSize: '0.74rem', color: '#dc2626' }}>{editErrors.name}</span>
                    )}
                  </div>

                  <div className="modal-form-group">
                    <label className="modal-label">
                      <span>Campus Email *</span>
                    </label>
                    <input
                      type="email"
                      className={`modal-input ${editErrors.email ? 'modal-input--error' : ''}`}
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    />
                    {editErrors.email && (
                      <span style={{ fontSize: '0.74rem', color: '#dc2626' }}>{editErrors.email}</span>
                    )}
                  </div>

                  <div className="modal-form-group">
                    <label className="modal-label">
                      <span>Student ID Code *</span>
                    </label>
                    <input
                      type="text"
                      className={`modal-input ${editErrors.studentId ? 'modal-input--error' : ''}`}
                      value={editForm.studentId}
                      onChange={(e) => setEditForm({ ...editForm, studentId: e.target.value })}
                    />
                    {editErrors.studentId && (
                      <span style={{ fontSize: '0.74rem', color: '#dc2626' }}>{editErrors.studentId}</span>
                    )}
                  </div>

                  <div className="modal-form-group">
                    <label className="modal-label">
                      <span>Phone Number *</span>
                    </label>
                    <input
                      type="tel"
                      className={`modal-input ${editErrors.phone ? 'modal-input--error' : ''}`}
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    />
                    {editErrors.phone && (
                      <span style={{ fontSize: '0.74rem', color: '#dc2626' }}>{editErrors.phone}</span>
                    )}
                  </div>

                  <div className="modal-form-group">
                    <label className="modal-label">
                      <span>Department</span>
                    </label>
                    <select
                      className="modal-input"
                      value={editForm.department}
                      onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                    >
                      {DEPARTMENTS.filter((d) => d !== 'All Departments').map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="modal-form-group">
                    <label className="modal-label">
                      <span>Account Status</span>
                    </label>
                    <select
                      className="modal-input"
                      value={editForm.status}
                      onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Pending Verification">Pending Verification</option>
                    </select>
                  </div>

                  <div className="modal-form-group modal-form-group--full">
                    <label className="modal-label">
                      <span>Campus Residence</span>
                    </label>
                    <input
                      type="text"
                      className="modal-input"
                      value={editForm.residence}
                      onChange={(e) => setEditForm({ ...editForm, residence: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-settings-cancel"
                  onClick={() => setEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-settings-save">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================================
          3. Delete User Confirmation Modal
          ==================================================================== */}
      {deleteModalOpen && activeUser && (
        <div
          className="modal-backdrop"
          onClick={() => setDeleteModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="confirm-dialog-card" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon-bubble confirm-icon--danger">
              <AlertTriangle size={26} />
            </div>

            <h3 className="confirm-title">Delete Campus User Record?</h3>

            <p className="confirm-desc">
              Are you sure you want to remove <strong>{activeUser.name}</strong> ({activeUser.studentId})
              from the campus management system? All associated complaint history will be archived.
            </p>

            <div className="confirm-actions-row">
              <button
                type="button"
                className="btn-confirm-cancel"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn-confirm-proceed btn-confirm-proceed--danger"
                onClick={handleConfirmDelete}
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageUsers
