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
  Edit3,
  Eye,
  FileText,
  HardHat,
  LayoutDashboard,
  LayoutGrid,
  List,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Phone,
  Plus,
  Power,
  RotateCcw,
  Search,
  Settings,
  ShieldCheck,
  Star,
  Trash2,
  UserCheck,
  Users,
  Wrench,
  X,
} from 'lucide-react'
import './ManageTechnicians.css'

// Initial Campus Technicians Roster
const INITIAL_TECHNICIANS_DATA = [
  {
    id: 'TECH-101',
    name: 'Mike Vance',
    email: 'm.vance@campus-facilities.edu',
    phone: '+1 (555) 019-3382',
    department: 'Computer Science & IT',
    specialization: 'HVAC & Climate Systems',
    status: 'Busy',
    assignedTasks: 3,
    completedTasks: 42,
    rating: 4.9,
    active: true,
  },
  {
    id: 'TECH-102',
    name: 'David Cole',
    email: 'd.cole@campus-facilities.edu',
    phone: '+1 (555) 019-4419',
    department: 'Computer Science & IT',
    specialization: 'Audio-Visual & Smart Labs',
    status: 'Available',
    assignedTasks: 1,
    completedTasks: 38,
    rating: 4.8,
    active: true,
  },
  {
    id: 'TECH-103',
    name: 'Sarah Jenkins',
    email: 's.jenkins@campus-facilities.edu',
    phone: '+1 (555) 019-5521',
    department: 'Central Library',
    specialization: 'Electrical & Power Systems',
    status: 'Busy',
    assignedTasks: 2,
    completedTasks: 56,
    rating: 5.0,
    active: true,
  },
  {
    id: 'TECH-104',
    name: 'Arthur Pendelton',
    email: 'a.pendelton@campus-facilities.edu',
    phone: '+1 (555) 019-2234',
    department: 'Hostel & Residential',
    specialization: 'Carpentry & Locksmith',
    status: 'Available',
    assignedTasks: 0,
    completedTasks: 64,
    rating: 4.9,
    active: true,
  },
  {
    id: 'TECH-105',
    name: 'Robert Chen',
    email: 'r.chen@campus-facilities.edu',
    phone: '+1 (555) 019-7718',
    department: 'Science Laboratories',
    specialization: 'Senior High-Voltage Electrician',
    status: 'Available',
    assignedTasks: 1,
    completedTasks: 51,
    rating: 4.7,
    active: true,
  },
  {
    id: 'TECH-106',
    name: 'Paul Gomez',
    email: 'p.gomez@campus-facilities.edu',
    phone: '+1 (555) 019-8891',
    department: 'Civil Facilities',
    specialization: 'Plumbing & Pipe Infrastructure',
    status: 'Busy',
    assignedTasks: 2,
    completedTasks: 47,
    rating: 4.6,
    active: true,
  },
  {
    id: 'TECH-107',
    name: 'Elena Rostova',
    email: 'e.rostova@campus-facilities.edu',
    phone: '+1 (555) 019-6632',
    department: 'Civil Facilities',
    specialization: 'Structural & Masonry Maintenance',
    status: 'Busy',
    assignedTasks: 3,
    completedTasks: 29,
    rating: 4.8,
    active: true,
  },
  {
    id: 'TECH-108',
    name: 'Marcus Sterling',
    email: 'm.sterling@campus-facilities.edu',
    phone: '+1 (555) 019-3390',
    department: 'Computer Science & IT',
    specialization: 'Network & Fiber Telecoms',
    status: 'Unavailable',
    assignedTasks: 0,
    completedTasks: 34,
    rating: 4.5,
    active: false,
  },
]

// Sample Unassigned Complaints for Quick Assignment
const UNASSIGNED_COMPLAINTS = [
  {
    id: 'CMP-1052',
    title: 'Water Leakage from Ceiling in Corridor',
    location: 'Hostel Block B, 1st Floor East Wing',
    department: 'Civil Facilities',
  },
  {
    id: 'CMP-1037',
    title: 'Broken Door Hinge in Chemistry Prep Room',
    location: 'Chemistry Block, Room 108',
    department: 'Science Laboratories',
  },
  {
    id: 'CMP-1018',
    title: 'Loose Staircase Handrail Near East Gate',
    location: 'East Campus Entrance Walkway',
    department: 'Civil Facilities',
  },
]

const DEPARTMENTS = [
  'All Departments',
  'Computer Science & IT',
  'Civil Facilities',
  'Hostel & Residential',
  'Science Laboratories',
  'Central Library',
]

const STATUSES = ['All Statuses', 'Available', 'Busy', 'Unavailable']

function ManageTechnicians() {
  // Navigation & responsive state
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [viewMode, setViewMode] = useState('cards') // 'cards' | 'table'

  // Master Data & Feedback
  const [technicians, setTechnicians] = useState(INITIAL_TECHNICIANS_DATA)
  const [toastMessage, setToastMessage] = useState(null)

  // Filters & search
  const [searchQuery, setSearchQuery] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('All Departments')
  const [statusFilter, setStatusFilter] = useState('All Statuses')

  // Modals state
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [assignModalOpen, setAssignModalOpen] = useState(false)
  const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false)

  // Selected technician for actions
  const [activeTech, setActiveTech] = useState(null)
  const [selectedComplaintId, setSelectedComplaintId] = useState('')

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'Computer Science & IT',
    specialization: '',
    status: 'Available',
  })
  const [formErrors, setFormErrors] = useState({})

  // Stats computation
  const stats = useMemo(() => {
    return {
      total: technicians.length,
      available: technicians.filter((t) => t.status === 'Available').length,
      busy: technicians.filter((t) => t.status === 'Busy').length,
      unavailable: technicians.filter((t) => t.status === 'Unavailable').length,
      totalJobs: technicians.reduce((acc, t) => acc + t.completedTasks, 0),
    }
  }, [technicians])

  // Filtered technicians
  const filteredTechnicians = useMemo(() => {
    return technicians.filter((tech) => {
      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        tech.name.toLowerCase().includes(q) ||
        tech.id.toLowerCase().includes(q) ||
        tech.specialization.toLowerCase().includes(q) ||
        tech.department.toLowerCase().includes(q)

      const matchesDept =
        departmentFilter === 'All Departments' || tech.department === departmentFilter
      const matchesStatus =
        statusFilter === 'All Statuses' || tech.status === statusFilter

      return matchesSearch && matchesDept && matchesStatus
    })
  }, [technicians, searchQuery, departmentFilter, statusFilter])

  // Form validation
  const validateTechForm = () => {
    const errors = {}
    if (!formData.name.trim()) errors.name = 'Full name is required.'

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      errors.email = 'Email address is required.'
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Enter a valid email address.'
    }

    if (!formData.phone.trim()) errors.phone = 'Phone number is required.'
    if (!formData.specialization.trim()) errors.specialization = 'Trade / Specialization is required.'

    return errors
  }

  // 1. Add Technician
  const handleOpenAddModal = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      department: 'Computer Science & IT',
      specialization: '',
      status: 'Available',
    })
    setFormErrors({})
    setAddModalOpen(true)
  }

  const handleSaveNewTechnician = (e) => {
    e.preventDefault()
    const errors = validateTechForm()

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    const newId = `TECH-${100 + technicians.length + 1}`
    const newTechnician = {
      ...formData,
      id: newId,
      assignedTasks: 0,
      completedTasks: 0,
      rating: 5.0,
      active: formData.status !== 'Unavailable',
    }

    setTechnicians((prev) => [newTechnician, ...prev])
    setAddModalOpen(false)
    setToastMessage({
      type: 'success',
      text: `Technician ${newTechnician.name} (${newId}) added successfully to roster!`,
    })
    setTimeout(() => setToastMessage(null), 3500)
  }

  // 2. Edit Technician
  const handleOpenEditModal = (tech) => {
    setActiveTech(tech)
    setFormData({
      name: tech.name,
      email: tech.email,
      phone: tech.phone,
      department: tech.department,
      specialization: tech.specialization,
      status: tech.status,
    })
    setFormErrors({})
    setEditModalOpen(true)
  }

  const handleSaveEditTechnician = (e) => {
    e.preventDefault()
    const errors = validateTechForm()

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setTechnicians((prev) =>
      prev.map((t) =>
        t.id === activeTech.id
          ? {
              ...t,
              ...formData,
              active: formData.status !== 'Unavailable',
            }
          : t
      )
    )

    setEditModalOpen(false)
    setToastMessage({
      type: 'success',
      text: `Technician record for ${formData.name} updated.`,
    })
    setTimeout(() => setToastMessage(null), 3000)
  }

  // 3. View Details
  const handleOpenDetails = (tech) => {
    setActiveTech(tech)
    setDetailsModalOpen(true)
  }

  // 4. Toggle Active / Deactivate Demo Status
  const handleToggleActiveStatus = (tech) => {
    const nextActive = !tech.active
    const nextStatus = nextActive ? 'Available' : 'Unavailable'

    setTechnicians((prev) =>
      prev.map((t) =>
        t.id === tech.id
          ? { ...t, active: nextActive, status: nextStatus }
          : t
      )
    )

    setToastMessage({
      type: 'info',
      text: `Technician ${tech.name} status switched to ${nextActive ? 'Active (Available)' : 'Deactivated'}.`,
    })
    setTimeout(() => setToastMessage(null), 3000)
  }

  // 5. Open Assign Complaint Modal
  const handleOpenAssignModal = (tech) => {
    setActiveTech(tech)
    setSelectedComplaintId(UNASSIGNED_COMPLAINTS[0].id)
    setAssignModalOpen(true)
  }

  const handleConfirmAssignComplaint = () => {
    if (!activeTech || !selectedComplaintId) return

    setTechnicians((prev) =>
      prev.map((t) =>
        t.id === activeTech.id
          ? { ...t, assignedTasks: t.assignedTasks + 1, status: 'Busy' }
          : t
      )
    )

    setAssignModalOpen(false)
    setToastMessage({
      type: 'success',
      text: `Complaint #${selectedComplaintId} assigned to ${activeTech.name}. Work order dispatched.`,
    })
    setTimeout(() => setToastMessage(null), 3500)
  }

  // 6. Delete Technician
  const handleOpenDeleteModal = (tech) => {
    setActiveTech(tech)
    setDeleteConfirmModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (!activeTech) return

    setTechnicians((prev) => prev.filter((t) => t.id !== activeTech.id))
    setDeleteConfirmModalOpen(false)
    setToastMessage({
      type: 'info',
      text: `Technician ${activeTech.name} (${activeTech.id}) removed from campus roster.`,
    })
    setTimeout(() => setToastMessage(null), 3500)
  }

  // Status Badge Class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Available':
        return 'badge-status-pill badge-status-pill--available'
      case 'Busy':
        return 'badge-status-pill badge-status-pill--busy'
      default:
        return 'badge-status-pill badge-status-pill--unavailable'
    }
  }

  return (
    <div className="manage-tech-layout">
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
            className="sidebar-nav__item sidebar-nav__item--active"
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
      <div className="manage-tech-main">
        {/* Top Header Bar */}
        <header className="manage-tech-header-bar">
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
                <span>Manage Maintenance Technicians</span>
                <span className="admin-portal-badge">{technicians.length} Specialists</span>
              </h1>
              <p>Specialist directory, real-time availability tracking, and work order assignment.</p>
            </div>
          </div>

          <div className="admin-header-controls">
            <button
              type="button"
              className="btn-add-tech"
              onClick={handleOpenAddModal}
            >
              <Plus size={16} />
              <span>Add Technician</span>
            </button>

            <button
              type="button"
              className="header-icon-btn"
              onClick={() =>
                setToastMessage({
                  type: 'info',
                  text: 'Roster status: 3 specialists available for immediate dispatch.',
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
                    to="/admin/complaints"
                    className="profile-dropdown__item"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <FileText size={15} />
                    <span>Manage Complaints</span>
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
        <main className="manage-tech-content">
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
          <div className="tech-stats-strip">
            <div
              className={`tech-stat-card ${
                statusFilter === 'All Statuses' ? 'tech-stat-card--active' : ''
              }`}
              onClick={() => setStatusFilter('All Statuses')}
              role="button"
              tabIndex={0}
            >
              <div>
                <span className="tech-stat-label">Total Technicians</span>
                <div className="tech-stat-val">{stats.total}</div>
              </div>
              <div className="tech-stat-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
                <Users size={20} />
              </div>
            </div>

            <div
              className={`tech-stat-card ${
                statusFilter === 'Available' ? 'tech-stat-card--active' : ''
              }`}
              onClick={() => setStatusFilter('Available')}
              role="button"
              tabIndex={0}
            >
              <div>
                <span className="tech-stat-label">Available on Duty</span>
                <div className="tech-stat-val" style={{ color: '#059669' }}>
                  {stats.available}
                </div>
              </div>
              <div className="tech-stat-icon" style={{ background: '#ecfdf5', color: '#059669' }}>
                <UserCheck size={20} />
              </div>
            </div>

            <div
              className={`tech-stat-card ${
                statusFilter === 'Busy' ? 'tech-stat-card--active' : ''
              }`}
              onClick={() => setStatusFilter('Busy')}
              role="button"
              tabIndex={0}
            >
              <div>
                <span className="tech-stat-label">Busy on Jobs</span>
                <div className="tech-stat-val" style={{ color: '#d97706' }}>
                  {stats.busy}
                </div>
              </div>
              <div className="tech-stat-icon" style={{ background: '#fffbeb', color: '#d97706' }}>
                <Wrench size={20} />
              </div>
            </div>

            <div
              className="tech-stat-card"
              onClick={() =>
                setToastMessage({
                  type: 'info',
                  text: `Campus specialists have resolved ${stats.totalJobs} maintenance requests to date.`,
                })
              }
              role="button"
              tabIndex={0}
            >
              <div>
                <span className="tech-stat-label">Completed Jobs</span>
                <div className="tech-stat-val" style={{ color: '#7c3aed' }}>
                  {stats.totalJobs}
                </div>
              </div>
              <div className="tech-stat-icon" style={{ background: '#f5f3ff', color: '#7c3aed' }}>
                <CheckCircle2 size={20} />
              </div>
            </div>
          </div>

          {/* ================================================================
              2. Toolbar (Search, Filter, Table/Card Switcher)
              ================================================================ */}
          <div className="tech-toolbar-card">
            <div className="tech-toolbar-left">
              {/* Search Bar */}
              <div className="tech-search-wrap">
                <Search size={16} className="tech-search-icon" />
                <input
                  type="text"
                  className="tech-search-input"
                  placeholder="Search by name, ID (TECH-101), trade, or department..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Department Filter */}
              <select
                className="filter-select"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                aria-label="Filter by Department"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>

              {/* Availability Filter */}
              <select
                className="filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                aria-label="Filter by Status"
              >
                {STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div className="tech-toolbar-right">
              {/* Clear filters button */}
              {(searchQuery ||
                departmentFilter !== 'All Departments' ||
                statusFilter !== 'All Statuses') && (
                <button
                  type="button"
                  className="btn-clear-filters"
                  onClick={() => {
                    setSearchQuery('')
                    setDepartmentFilter('All Departments')
                    setStatusFilter('All Statuses')
                  }}
                >
                  <RotateCcw size={13} />
                  <span>Clear</span>
                </button>
              )}

              {/* View Mode Toggle */}
              <div className="view-mode-toggle" aria-label="Toggle view mode">
                <button
                  type="button"
                  className={`view-mode-btn ${
                    viewMode === 'cards' ? 'view-mode-btn--active' : ''
                  }`}
                  onClick={() => setViewMode('cards')}
                  title="Card Grid View"
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  type="button"
                  className={`view-mode-btn ${
                    viewMode === 'table' ? 'view-mode-btn--active' : ''
                  }`}
                  onClick={() => setViewMode('table')}
                  title="Table Data View"
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* ================================================================
              3. Main Directory Display (Cards vs Table)
              ================================================================ */}
          {filteredTechnicians.length === 0 ? (
            <div
              style={{
                background: '#ffffff',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '4rem 1.5rem',
                textAlign: 'center',
              }}
            >
              <HardHat size={36} style={{ color: '#94a3b8', margin: '0 auto 0.75rem' }} />
              <h3 style={{ fontSize: '1.1rem', color: 'var(--navy)', fontWeight: 700 }}>
                No technicians match current filters
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.86rem', marginTop: '0.25rem' }}>
                Try adjusting your search query or selecting a different department.
              </p>
            </div>
          ) : viewMode === 'cards' ? (
            /* ==============================================================
               Card Grid View
               ============================================================== */
            <div className="tech-grid-view">
              {filteredTechnicians.map((tech) => (
                <div key={tech.id} className="tech-card">
                  <div>
                    {/* Top Row: Avatar & Status */}
                    <div className="tech-card__top">
                      <div className="tech-profile-left">
                        <div className="tech-avatar-circle">
                          {tech.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="tech-name">{tech.name}</h3>
                          <span className="tech-id-badge">{tech.id}</span>
                        </div>
                      </div>

                      <span className={getStatusBadgeClass(tech.status)}>
                        {tech.status}
                      </span>
                    </div>

                    {/* Trade & Info */}
                    <div className="tech-card__info" style={{ marginTop: '1rem' }}>
                      <div className="tech-info-row">
                        <span className="tech-trade-pill">
                          <Wrench size={13} />
                          <span>{tech.specialization}</span>
                        </span>
                      </div>

                      <div className="tech-info-row">
                        <Building2 size={14} color="#64748b" />
                        <span>{tech.department}</span>
                      </div>

                      <div className="tech-info-row">
                        <Mail size={14} color="#64748b" />
                        <span style={{ fontSize: '0.8rem', color: 'var(--slate)' }}>
                          {tech.email}
                        </span>
                      </div>

                      <div className="tech-info-row">
                        <Phone size={14} color="#64748b" />
                        <span style={{ fontSize: '0.8rem', color: 'var(--slate)' }}>
                          {tech.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tasks Box */}
                  <div className="tech-tasks-box">
                    <div className="task-stat-col">
                      <div className="task-stat-num" style={{ color: '#2563eb' }}>
                        {tech.assignedTasks}
                      </div>
                      <div className="task-stat-label">Active Tasks</div>
                    </div>

                    <div style={{ width: '1px', height: '24px', background: '#e2e8f0' }} />

                    <div className="task-stat-col">
                      <div className="task-stat-num" style={{ color: '#059669' }}>
                        {tech.completedTasks}
                      </div>
                      <div className="task-stat-label">Completed</div>
                    </div>

                    <div style={{ width: '1px', height: '24px', background: '#e2e8f0' }} />

                    <div className="task-stat-col">
                      <div className="task-stat-num" style={{ color: '#f59e0b' }}>
                        {tech.rating} ★
                      </div>
                      <div className="task-stat-label">Rating</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="tech-card__actions">
                    <button
                      type="button"
                      className="btn-tech-card-action btn-tech-card-assign"
                      onClick={() => handleOpenAssignModal(tech)}
                      title="Dispatch Complaint to Technician"
                    >
                      <UserCheck size={14} />
                      <span>Assign</span>
                    </button>

                    <button
                      type="button"
                      className="btn-tech-card-action"
                      onClick={() => handleOpenDetails(tech)}
                      title="View Details"
                    >
                      <Eye size={14} />
                      <span>Details</span>
                    </button>

                    <button
                      type="button"
                      className="btn-tech-card-action"
                      onClick={() => handleOpenEditModal(tech)}
                      title="Edit Technician"
                    >
                      <Edit3 size={14} />
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      className="btn-tech-card-action"
                      style={{ color: tech.active ? '#d97706' : '#059669', flex: 'none', width: '34px' }}
                      onClick={() => handleToggleActiveStatus(tech)}
                      title={tech.active ? 'Deactivate Technician' : 'Activate Technician'}
                    >
                      <Power size={14} />
                    </button>

                    <button
                      type="button"
                      className="btn-tech-card-action"
                      style={{ color: '#ef4444', flex: 'none', width: '34px' }}
                      onClick={() => handleOpenDeleteModal(tech)}
                      title="Delete Technician"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* ==============================================================
               Table View
               ============================================================== */
            <div className="tech-table-card">
              <table className="tech-table">
                <thead>
                  <tr>
                    <th>Tech ID</th>
                    <th>Specialist Name</th>
                    <th>Trade / Specialization</th>
                    <th>Department</th>
                    <th>Contact Info</th>
                    <th>Status</th>
                    <th>Active Tasks</th>
                    <th>Completed</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTechnicians.map((tech) => (
                    <tr key={tech.id}>
                      <td>
                        <span className="tech-id-badge" style={{ fontSize: '0.82rem' }}>
                          {tech.id}
                        </span>
                      </td>

                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          <div
                            className="tech-avatar-circle"
                            style={{ width: '32px', height: '32px', fontSize: '0.85rem' }}
                          >
                            {tech.name.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <div>
                            <span style={{ fontWeight: 700, color: 'var(--navy)', display: 'block' }}>
                              {tech.name}
                            </span>
                            <span style={{ fontSize: '0.74rem', color: '#f59e0b', fontWeight: 600 }}>
                              {tech.rating} ★ (Rating)
                            </span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="tech-trade-pill">
                          <Wrench size={12} />
                          <span>{tech.specialization}</span>
                        </span>
                      </td>

                      <td>
                        <span style={{ fontSize: '0.84rem' }}>{tech.department}</span>
                      </td>

                      <td>
                        <div style={{ fontSize: '0.8rem' }}>
                          <div style={{ color: 'var(--navy)', fontWeight: 500 }}>{tech.phone}</div>
                          <div style={{ color: 'var(--muted)' }}>{tech.email}</div>
                        </div>
                      </td>

                      <td>
                        <span className={getStatusBadgeClass(tech.status)}>
                          {tech.status}
                        </span>
                      </td>

                      <td>
                        <span
                          style={{
                            fontWeight: 700,
                            color: tech.assignedTasks > 0 ? '#2563eb' : '#64748b',
                            fontSize: '0.9rem',
                          }}
                        >
                          {tech.assignedTasks} Active
                        </span>
                      </td>

                      <td>
                        <span style={{ fontWeight: 700, color: '#059669', fontSize: '0.9rem' }}>
                          {tech.completedTasks}
                        </span>
                      </td>

                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'flex-end' }}>
                          <button
                            type="button"
                            className="btn-action-icon btn-action-assign"
                            onClick={() => handleOpenAssignModal(tech)}
                            title="Assign Complaint"
                          >
                            <UserCheck size={14} />
                          </button>

                          <button
                            type="button"
                            className="btn-action-icon"
                            onClick={() => handleOpenDetails(tech)}
                            title="View Profile Details"
                          >
                            <Eye size={14} />
                          </button>

                          <button
                            type="button"
                            className="btn-action-icon"
                            onClick={() => handleOpenEditModal(tech)}
                            title="Edit Record"
                          >
                            <Edit3 size={14} />
                          </button>

                          <button
                            type="button"
                            className="btn-action-icon"
                            style={{ color: tech.active ? '#d97706' : '#059669' }}
                            onClick={() => handleToggleActiveStatus(tech)}
                            title={tech.active ? 'Deactivate Technician' : 'Activate Technician'}
                          >
                            <Power size={14} />
                          </button>

                          <button
                            type="button"
                            className="btn-action-icon"
                            style={{ color: '#ef4444' }}
                            onClick={() => handleOpenDeleteModal(tech)}
                            title="Delete Technician"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>

      {/* ====================================================================
          1. Add Technician Modal
          ==================================================================== */}
      {addModalOpen && (
        <div
          className="modal-backdrop"
          onClick={() => setAddModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="assign-modal-card" style={{ maxWidth: '540px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Campus Technician</h3>
              <button
                type="button"
                className="sidebar-close-btn"
                style={{ display: 'inline-flex' }}
                onClick={() => setAddModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveNewTechnician}>
              <div className="modal-body">
                <div className="modal-form-grid">
                  <div className="modal-form-group">
                    <label className="modal-label">
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      className={`modal-input ${formErrors.name ? 'modal-input--error' : ''}`}
                      placeholder="e.g. Samuel Rodriguez"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    {formErrors.name && (
                      <span style={{ fontSize: '0.74rem', color: '#dc2626' }}>{formErrors.name}</span>
                    )}
                  </div>

                  <div className="modal-form-group">
                    <label className="modal-label">
                      <span>Campus Email *</span>
                    </label>
                    <input
                      type="email"
                      className={`modal-input ${formErrors.email ? 'modal-input--error' : ''}`}
                      placeholder="s.rodriguez@campus-facilities.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {formErrors.email && (
                      <span style={{ fontSize: '0.74rem', color: '#dc2626' }}>{formErrors.email}</span>
                    )}
                  </div>

                  <div className="modal-form-group">
                    <label className="modal-label">
                      <span>Phone Number *</span>
                    </label>
                    <input
                      type="tel"
                      className={`modal-input ${formErrors.phone ? 'modal-input--error' : ''}`}
                      placeholder="+1 (555) 019-XXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    {formErrors.phone && (
                      <span style={{ fontSize: '0.74rem', color: '#dc2626' }}>{formErrors.phone}</span>
                    )}
                  </div>

                  <div className="modal-form-group">
                    <label className="modal-label">
                      <span>Department</span>
                    </label>
                    <select
                      className="modal-input"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    >
                      {DEPARTMENTS.filter((d) => d !== 'All Departments').map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="modal-form-group modal-form-group--full">
                    <label className="modal-label">
                      <span>Specialization / Trade *</span>
                    </label>
                    <input
                      type="text"
                      className={`modal-input ${formErrors.specialization ? 'modal-input--error' : ''}`}
                      placeholder="e.g. Elevators, Industrial HVAC, Smart Locksmith"
                      value={formData.specialization}
                      onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    />
                    {formErrors.specialization && (
                      <span style={{ fontSize: '0.74rem', color: '#dc2626' }}>
                        {formErrors.specialization}
                      </span>
                    )}
                  </div>

                  <div className="modal-form-group">
                    <label className="modal-label">
                      <span>Initial Availability</span>
                    </label>
                    <select
                      className="modal-input"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="Available">Available</option>
                      <option value="Busy">Busy</option>
                      <option value="Unavailable">Unavailable</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-settings-cancel"
                  onClick={() => setAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-settings-save">
                  Add Technician
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================================
          2. Edit Technician Modal
          ==================================================================== */}
      {editModalOpen && activeTech && (
        <div
          className="modal-backdrop"
          onClick={() => setEditModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="assign-modal-card" style={{ maxWidth: '540px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Technician Record ({activeTech.id})</h3>
              <button
                type="button"
                className="sidebar-close-btn"
                style={{ display: 'inline-flex' }}
                onClick={() => setEditModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEditTechnician}>
              <div className="modal-body">
                <div className="modal-form-grid">
                  <div className="modal-form-group">
                    <label className="modal-label">
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      className={`modal-input ${formErrors.name ? 'modal-input--error' : ''}`}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    {formErrors.name && (
                      <span style={{ fontSize: '0.74rem', color: '#dc2626' }}>{formErrors.name}</span>
                    )}
                  </div>

                  <div className="modal-form-group">
                    <label className="modal-label">
                      <span>Campus Email *</span>
                    </label>
                    <input
                      type="email"
                      className={`modal-input ${formErrors.email ? 'modal-input--error' : ''}`}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="modal-form-group">
                    <label className="modal-label">
                      <span>Phone Number *</span>
                    </label>
                    <input
                      type="tel"
                      className={`modal-input ${formErrors.phone ? 'modal-input--error' : ''}`}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="modal-form-group">
                    <label className="modal-label">
                      <span>Department</span>
                    </label>
                    <select
                      className="modal-input"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    >
                      {DEPARTMENTS.filter((d) => d !== 'All Departments').map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="modal-form-group modal-form-group--full">
                    <label className="modal-label">
                      <span>Specialization / Trade *</span>
                    </label>
                    <input
                      type="text"
                      className={`modal-input ${formErrors.specialization ? 'modal-input--error' : ''}`}
                      value={formData.specialization}
                      onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    />
                  </div>

                  <div className="modal-form-group">
                    <label className="modal-label">
                      <span>Availability Status</span>
                    </label>
                    <select
                      className="modal-input"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="Available">Available</option>
                      <option value="Busy">Busy</option>
                      <option value="Unavailable">Unavailable</option>
                    </select>
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
          3. View Technician Details Modal
          ==================================================================== */}
      {detailsModalOpen && activeTech && (
        <div
          className="modal-backdrop"
          onClick={() => setDetailsModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="assign-modal-card" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Technician Profile & Performance</h3>
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
              <div className="tech-details-header">
                <div className="tech-avatar-circle" style={{ width: '56px', height: '56px', fontSize: '1.35rem' }}>
                  {activeTech.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--navy)', fontWeight: 800 }}>
                    {activeTech.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                    <span className="tech-id-badge">{activeTech.id}</span>
                    <span className={getStatusBadgeClass(activeTech.status)}>
                      {activeTech.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="tech-details-grid">
                <div className="tech-detail-box">
                  <label>Department</label>
                  <span>{activeTech.department}</span>
                </div>

                <div className="tech-detail-box">
                  <label>Trade & Expertise</label>
                  <span>{activeTech.specialization}</span>
                </div>

                <div className="tech-detail-box">
                  <label>Campus Email</label>
                  <span style={{ fontSize: '0.82rem' }}>{activeTech.email}</span>
                </div>

                <div className="tech-detail-box">
                  <label>Direct Contact</label>
                  <span>{activeTech.phone}</span>
                </div>

                <div className="tech-detail-box">
                  <label>Active Work Orders</label>
                  <span style={{ color: '#2563eb' }}>{activeTech.assignedTasks} Active Jobs</span>
                </div>

                <div className="tech-detail-box">
                  <label>Lifetime Completed</label>
                  <span style={{ color: '#059669' }}>{activeTech.completedTasks} Resolved</span>
                </div>

                <div className="tech-detail-box" style={{ gridColumn: '1 / -1' }}>
                  <label>Performance Rating</label>
                  <span style={{ color: '#d97706', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Star size={16} fill="#f59e0b" color="#f59e0b" />
                    <span>{activeTech.rating} / 5.0 (Campus satisfaction score)</span>
                  </span>
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
                  handleOpenAssignModal(activeTech)
                }}
              >
                Assign Work Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          4. Assign Complaint Modal
          ==================================================================== */}
      {assignModalOpen && activeTech && (
        <div
          className="modal-backdrop"
          onClick={() => setAssignModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="assign-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Dispatch Work Order to {activeTech.name}</h3>
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
              <div className="modal-ticket-preview">
                <span className="modal-ticket-id">Selected Specialist</span>
                <div className="modal-ticket-title">
                  {activeTech.name} — {activeTech.specialization}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
                  Currently has {activeTech.assignedTasks} active jobs.
                </div>
              </div>

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
                  Select Pending Campus Complaint
                </label>
                <div className="tech-select-list">
                  {UNASSIGNED_COMPLAINTS.map((c) => (
                    <div
                      key={c.id}
                      className={`tech-select-option ${
                        selectedComplaintId === c.id ? 'tech-select-option--active' : ''
                      }`}
                      onClick={() => setSelectedComplaintId(c.id)}
                      role="button"
                      tabIndex={0}
                    >
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.85rem' }}>
                          #{c.id}
                        </div>
                        <div style={{ fontWeight: 600, color: 'var(--navy)', fontSize: '0.88rem' }}>
                          {c.title}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
                          {c.location}
                        </div>
                      </div>
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
                onClick={handleConfirmAssignComplaint}
              >
                Confirm Dispatch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          5. Delete Confirmation Modal
          ==================================================================== */}
      {deleteConfirmModalOpen && activeTech && (
        <div
          className="modal-backdrop"
          onClick={() => setDeleteConfirmModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="confirm-dialog-card" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon-bubble confirm-icon--danger">
              <AlertTriangle size={26} />
            </div>

            <h3 className="confirm-title">Remove Technician Record?</h3>

            <p className="confirm-desc">
              Are you sure you want to delete <strong>{activeTech.name}</strong> ({activeTech.id})
              from the active campus facility directory? Any ongoing work orders should be
              reassigned before removing this staff member.
            </p>

            <div className="confirm-actions-row">
              <button
                type="button"
                className="btn-confirm-cancel"
                onClick={() => setDeleteConfirmModalOpen(false)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn-confirm-proceed btn-confirm-proceed--danger"
                onClick={handleConfirmDelete}
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageTechnicians
