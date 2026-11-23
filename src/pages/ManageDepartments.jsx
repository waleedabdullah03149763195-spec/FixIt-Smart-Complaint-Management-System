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
  Droplets,
  Edit3,
  Eye,
  FileText,
  Hammer,
  HardHat,
  LayoutDashboard,
  LayoutGrid,
  List,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Monitor,
  Phone,
  Plus,
  RotateCcw,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Trash2,
  Users,
  Wrench,
  X,
  Zap,
} from 'lucide-react'
import './ManageDepartments.css'

// Initial Campus Facility Departments Mock Dataset
const INITIAL_DEPARTMENTS_DATA = [
  {
    id: 'DEPT-01',
    name: 'Electrical & Power Systems',
    description:
      'High-voltage distribution, backup diesel generators, classroom wiring, and campus lighting networks.',
    head: 'Eng. Robert Chen, P.E.',
    techniciansCount: 4,
    totalComplaints: 28,
    pendingComplaints: 5,
    resolvedComplaints: 23,
    email: 'electrical.dept@campus-facilities.edu',
    phone: '+1 (555) 019-5501',
    location: 'Engineering Annex, Ground Floor',
    icon: 'zap',
    color: '#f59e0b',
  },
  {
    id: 'DEPT-02',
    name: 'Plumbing & Water Infrastructure',
    description:
      'Potable water lines, drainage snaking, restroom fixtures, water filtration plants, and hostel sewage lines.',
    head: 'Master Plumber Paul Gomez',
    techniciansCount: 3,
    totalComplaints: 26,
    pendingComplaints: 4,
    resolvedComplaints: 22,
    email: 'plumbing.dept@campus-facilities.edu',
    phone: '+1 (555) 019-5502',
    location: 'Facility Operations Yard, Bay 3',
    icon: 'droplets',
    color: '#0891b2',
  },
  {
    id: 'DEPT-03',
    name: 'IT Support & Smart Infrastructure',
    description:
      'Campus Wi-Fi APs, lab desktop hardware, multimedia projectors, seminar audio systems, and network switches.',
    head: 'Dr. Sarah Lin (IT Director)',
    techniciansCount: 5,
    totalComplaints: 46,
    pendingComplaints: 8,
    resolvedComplaints: 38,
    email: 'it.support@campus-facilities.edu',
    phone: '+1 (555) 019-5503',
    location: 'Academic Complex, Room 104',
    icon: 'monitor',
    color: '#2563eb',
  },
  {
    id: 'DEPT-04',
    name: 'Civil & Structural Maintenance',
    description:
      'Masonry, staircase handrails, roofing leaks, structural inspections, walkway paving, and door lock hardware.',
    head: 'Elena Rostova, M.Eng.',
    techniciansCount: 4,
    totalComplaints: 34,
    pendingComplaints: 7,
    resolvedComplaints: 27,
    email: 'civil.maintenance@campus-facilities.edu',
    phone: '+1 (555) 019-5504',
    location: 'Civil Engineering Block, Bay 1',
    icon: 'hammer',
    color: '#7c3aed',
  },
  {
    id: 'DEPT-05',
    name: 'Cleaning & Custodial Services',
    description:
      'Classroom sanitization, chemical waste disposal, floor polishing, and daily campus grounds keeping.',
    head: 'Clara Jenkins (Custodial Supervisor)',
    techniciansCount: 6,
    totalComplaints: 18,
    pendingComplaints: 2,
    resolvedComplaints: 16,
    email: 'custodial.services@campus-facilities.edu',
    phone: '+1 (555) 019-5505',
    location: 'Central Administration, Basement Wing',
    icon: 'sparkles',
    color: '#10b981',
  },
  {
    id: 'DEPT-06',
    name: 'General Campus Maintenance',
    description:
      'Auditorium seating, window glazing, campus signage, dormitory furniture repairs, and locksmith services.',
    head: 'Arthur Pendelton (Facility Foreman)',
    techniciansCount: 3,
    totalComplaints: 20,
    pendingComplaints: 3,
    resolvedComplaints: 17,
    email: 'general.facility@campus-facilities.edu',
    phone: '+1 (555) 019-5506',
    location: 'Central Services Depot, Bay 6',
    icon: 'wrench',
    color: '#ea580c',
  },
]

function ManageDepartments() {
  // Navigation & responsive state
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [viewMode, setViewMode] = useState('cards') // 'cards' | 'table'

  // Master Data & Feedback
  const [departments, setDepartments] = useState(INITIAL_DEPARTMENTS_DATA)
  const [toastMessage, setToastMessage] = useState(null)

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('name-asc') // 'name-asc' | 'complaints-desc' | 'techs-desc' | 'rate-desc'

  // Modals state
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [activeDept, setActiveDept] = useState(null)

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    head: '',
    description: '',
    techniciansCount: 3,
    email: '',
    phone: '',
    location: '',
  })
  const [formErrors, setFormErrors] = useState({})

  // Stats calculation
  const stats = useMemo(() => {
    return {
      totalDepts: departments.length,
      totalTechs: departments.reduce((acc, d) => acc + d.techniciansCount, 0),
      totalPending: departments.reduce((acc, d) => acc + d.pendingComplaints, 0),
      totalResolved: departments.reduce((acc, d) => acc + d.resolvedComplaints, 0),
    }
  }, [departments])

  // Filtered and sorted departments
  const processedDepartments = useMemo(() => {
    const result = departments.filter((dept) => {
      const q = searchQuery.toLowerCase().trim()
      return (
        !q ||
        dept.name.toLowerCase().includes(q) ||
        dept.id.toLowerCase().includes(q) ||
        dept.head.toLowerCase().includes(q) ||
        dept.description.toLowerCase().includes(q)
      )
    })

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name)
      if (sortBy === 'complaints-desc') return b.totalComplaints - a.totalComplaints
      if (sortBy === 'techs-desc') return b.techniciansCount - a.techniciansCount
      if (sortBy === 'rate-desc') {
        const rateA = a.totalComplaints > 0 ? a.resolvedComplaints / a.totalComplaints : 0
        const rateB = b.totalComplaints > 0 ? b.resolvedComplaints / b.totalComplaints : 0
        return rateB - rateA
      }
      return 0
    })

    return result
  }, [departments, searchQuery, sortBy])

  // Form validation
  const validateForm = () => {
    const errors = {}
    if (!formData.name.trim()) errors.name = 'Department name is required.'
    if (!formData.head.trim()) errors.head = 'Department head is required.'
    if (!formData.description.trim()) errors.description = 'Description is required.'
    return errors
  }

  // 1. Add Department
  const handleOpenAddModal = () => {
    setFormData({
      name: '',
      head: '',
      description: '',
      techniciansCount: 3,
      email: '',
      phone: '',
      location: '',
    })
    setFormErrors({})
    setAddModalOpen(true)
  }

  const handleSaveNewDepartment = (e) => {
    e.preventDefault()
    const errors = validateForm()

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    const nextIdNum = departments.length + 1
    const newId = `DEPT-0${nextIdNum}`

    const newDepartment = {
      ...formData,
      id: newId,
      totalComplaints: 0,
      pendingComplaints: 0,
      resolvedComplaints: 0,
      icon: 'building',
      color: '#0284c7',
    }

    setDepartments((prev) => [newDepartment, ...prev])
    setAddModalOpen(false)
    setToastMessage({
      type: 'success',
      text: `Department "${newDepartment.name}" (${newId}) created successfully!`,
    })
    setTimeout(() => setToastMessage(null), 3500)
  }

  // 2. Edit Department
  const handleOpenEdit = (dept) => {
    setActiveDept(dept)
    setFormData({
      name: dept.name,
      head: dept.head,
      description: dept.description,
      techniciansCount: dept.techniciansCount,
      email: dept.email,
      phone: dept.phone,
      location: dept.location,
    })
    setFormErrors({})
    setEditModalOpen(true)
  }

  const handleSaveEditDepartment = (e) => {
    e.preventDefault()
    const errors = validateForm()

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setDepartments((prev) =>
      prev.map((d) => (d.id === activeDept.id ? { ...d, ...formData } : d))
    )

    setEditModalOpen(false)
    setToastMessage({
      type: 'success',
      text: `Department "${formData.name}" updated successfully.`,
    })
    setTimeout(() => setToastMessage(null), 3000)
  }

  // 3. View Department Details
  const handleOpenDetails = (dept) => {
    setActiveDept(dept)
    setDetailsModalOpen(true)
  }

  // 4. Delete Department
  const handleOpenDelete = (dept) => {
    setActiveDept(dept)
    setDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (!activeDept) return

    setDepartments((prev) => prev.filter((d) => d.id !== activeDept.id))
    setDeleteModalOpen(false)
    setToastMessage({
      type: 'info',
      text: `Department "${activeDept.name}" removed from campus directory.`,
    })
    setTimeout(() => setToastMessage(null), 3500)
  }

  // Render department category icon
  const renderDeptIcon = (iconName, color) => {
    const props = { size: 22, color: '#ffffff' }
    let iconComp = <Building2 {...props} />

    if (iconName === 'zap') iconComp = <Zap {...props} />
    if (iconName === 'droplets') iconComp = <Droplets {...props} />
    if (iconName === 'monitor') iconComp = <Monitor {...props} />
    if (iconName === 'hammer') iconComp = <Hammer {...props} />
    if (iconName === 'sparkles') iconComp = <Sparkles {...props} />
    if (iconName === 'wrench') iconComp = <Wrench {...props} />

    return (
      <div className="dept-icon-box" style={{ background: color }}>
        {iconComp}
      </div>
    )
  }

  return (
    <div className="manage-depts-layout">
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
            className="sidebar-nav__item"
            onClick={() => setSidebarOpen(false)}
          >
            <Users size={18} />
            <span>Manage Users</span>
          </Link>

          <Link
            to="/admin/departments"
            className="sidebar-nav__item sidebar-nav__item--active"
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
      <div className="manage-depts-main">
        {/* Top Header Bar */}
        <header className="manage-depts-header-bar">
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
                <span>Facility Departments Directory</span>
                <span className="admin-portal-badge">{departments.length} Units</span>
              </h1>
              <p>Maintenance division structure, workforce allocation, and workload oversight.</p>
            </div>
          </div>

          <div className="admin-header-controls">
            <button
              type="button"
              className="btn-add-tech"
              onClick={handleOpenAddModal}
            >
              <Plus size={16} />
              <span>Add Department</span>
            </button>

            <button
              type="button"
              className="header-icon-btn"
              onClick={() =>
                setToastMessage({
                  type: 'info',
                  text: 'Departments alert: IT Support has 8 complaints awaiting technician pickup.',
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
                    to="/admin/departments"
                    className="profile-dropdown__item"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <Building2 size={15} />
                    <span>Manage Departments</span>
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
        <main className="manage-depts-content">
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
          <div className="depts-stats-strip">
            <div className="dept-stat-card">
              <div>
                <span className="dept-stat-label">Facility Divisions</span>
                <div className="dept-stat-val">{stats.totalDepts}</div>
              </div>
              <div className="dept-stat-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
                <Building2 size={20} />
              </div>
            </div>

            <div className="dept-stat-card">
              <div>
                <span className="dept-stat-label">Assigned Technicians</span>
                <div className="dept-stat-val" style={{ color: '#0284c7' }}>
                  {stats.totalTechs}
                </div>
              </div>
              <div className="dept-stat-icon" style={{ background: '#f0f9ff', color: '#0284c7' }}>
                <HardHat size={20} />
              </div>
            </div>

            <div className="dept-stat-card">
              <div>
                <span className="dept-stat-label">Pending Complaints</span>
                <div className="dept-stat-val" style={{ color: '#d97706' }}>
                  {stats.totalPending}
                </div>
              </div>
              <div className="dept-stat-icon" style={{ background: '#fffbeb', color: '#d97706' }}>
                <Wrench size={20} />
              </div>
            </div>

            <div className="dept-stat-card">
              <div>
                <span className="dept-stat-label">Resolved Complaints</span>
                <div className="dept-stat-val" style={{ color: '#059669' }}>
                  {stats.totalResolved}
                </div>
              </div>
              <div className="dept-stat-icon" style={{ background: '#ecfdf5', color: '#059669' }}>
                <CheckCircle2 size={20} />
              </div>
            </div>
          </div>

          {/* ================================================================
              2. Toolbar (Search, Sort, Table/Card Switcher)
              ================================================================ */}
          <div className="depts-toolbar-card">
            <div className="depts-toolbar-left">
              <div className="depts-search-wrap">
                <Search size={16} className="depts-search-icon" />
                <input
                  type="text"
                  className="depts-search-input"
                  placeholder="Search by department name, ID (DEPT-01), head, or trade..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <select
                className="filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort departments"
              >
                <option value="name-asc">Name (A → Z)</option>
                <option value="complaints-desc">Complaints (Highest First)</option>
                <option value="techs-desc">Technicians (Most First)</option>
                <option value="rate-desc">Resolution Rate (%)</option>
              </select>
            </div>

            <div className="depts-toolbar-right">
              {searchQuery && (
                <button
                  type="button"
                  className="btn-clear-filters"
                  onClick={() => setSearchQuery('')}
                >
                  <RotateCcw size={13} />
                  <span>Clear Search</span>
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
              3. Departments Grid or Table View
              ================================================================ */}
          {processedDepartments.length === 0 ? (
            <div
              style={{
                background: '#ffffff',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '4rem 1.5rem',
                textAlign: 'center',
              }}
            >
              <Building2 size={36} style={{ color: '#94a3b8', margin: '0 auto 0.75rem' }} />
              <h3 style={{ fontSize: '1.1rem', color: 'var(--navy)', fontWeight: 700 }}>
                No departments found
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.86rem', marginTop: '0.25rem' }}>
                No department matched your search query. Try typing another division keyword.
              </p>
            </div>
          ) : viewMode === 'cards' ? (
            /* Cards View */
            <div className="depts-grid-view">
              {processedDepartments.map((dept) => {
                const resolutionRate =
                  dept.totalComplaints > 0
                    ? Math.round((dept.resolvedComplaints / dept.totalComplaints) * 100)
                    : 100

                return (
                  <div key={dept.id} className="dept-card">
                    <div>
                      {/* Header */}
                      <div className="dept-card__header">
                        <div className="dept-header-left">
                          {renderDeptIcon(dept.icon, dept.color)}
                          <div>
                            <h3 className="dept-name-title">{dept.name}</h3>
                            <span className="dept-id-chip">{dept.id}</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="dept-card__desc" style={{ marginTop: '0.85rem' }}>
                        {dept.description}
                      </p>

                      {/* Head */}
                      <div className="dept-head-row" style={{ marginTop: '0.85rem' }}>
                        <span className="dept-head-label">Head:</span>
                        <span>{dept.head}</span>
                      </div>
                    </div>

                    <div>
                      {/* Metrics Box */}
                      <div className="dept-metrics-box">
                        <div className="dept-metric-item">
                          <span className="dept-metric-num" style={{ color: '#0284c7' }}>
                            {dept.techniciansCount}
                          </span>
                          <span className="dept-metric-label">Technicians</span>
                        </div>

                        <div className="dept-metric-item">
                          <span className="dept-metric-num" style={{ color: '#d97706' }}>
                            {dept.pendingComplaints}
                          </span>
                          <span className="dept-metric-label">Pending</span>
                        </div>

                        <div className="dept-metric-item">
                          <span className="dept-metric-num" style={{ color: '#059669' }}>
                            {dept.resolvedComplaints}
                          </span>
                          <span className="dept-metric-label">Resolved</span>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="dept-resolution-progress" style={{ marginTop: '0.85rem' }}>
                        <div className="resolution-progress-meta">
                          <span>Resolution Rate</span>
                          <span>{resolutionRate}%</span>
                        </div>
                        <div className="resolution-progress-track">
                          <div
                            className="resolution-progress-fill"
                            style={{ width: `${resolutionRate}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="dept-card__actions">
                      <button
                        type="button"
                        className="btn-tech-card-action"
                        onClick={() => handleOpenDetails(dept)}
                      >
                        <Eye size={14} />
                        <span>Details</span>
                      </button>

                      <button
                        type="button"
                        className="btn-tech-card-action"
                        onClick={() => handleOpenEdit(dept)}
                      >
                        <Edit3 size={14} />
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        className="btn-tech-card-action"
                        style={{ color: '#ef4444', flex: 'none', width: '36px' }}
                        onClick={() => handleOpenDelete(dept)}
                        title="Delete Department"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            /* Table View */
            <div className="depts-table-card">
              <table className="manage-depts-table">
                <thead>
                  <tr>
                    <th>Dept ID</th>
                    <th>Department Name & Location</th>
                    <th>Division Head</th>
                    <th>Technicians</th>
                    <th>Pending</th>
                    <th>Resolved</th>
                    <th>Total Complaints</th>
                    <th>Resolution Rate</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {processedDepartments.map((dept) => {
                    const resolutionRate =
                      dept.totalComplaints > 0
                        ? Math.round((dept.resolvedComplaints / dept.totalComplaints) * 100)
                        : 100

                    return (
                      <tr key={dept.id}>
                        <td>
                          <span className="dept-id-chip" style={{ fontSize: '0.82rem' }}>
                            {dept.id}
                          </span>
                        </td>

                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                            {renderDeptIcon(dept.icon, dept.color)}
                            <div>
                              <span style={{ fontWeight: 700, color: 'var(--navy)', display: 'block' }}>
                                {dept.name}
                              </span>
                              <span style={{ fontSize: '0.74rem', color: 'var(--muted)' }}>
                                {dept.location}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span style={{ fontWeight: 600, color: 'var(--navy)' }}>{dept.head}</span>
                        </td>

                        <td>
                          <span style={{ fontWeight: 700, color: '#0284c7' }}>
                            {dept.techniciansCount} Techs
                          </span>
                        </td>

                        <td>
                          <span style={{ fontWeight: 700, color: '#d97706' }}>
                            {dept.pendingComplaints}
                          </span>
                        </td>

                        <td>
                          <span style={{ fontWeight: 700, color: '#059669' }}>
                            {dept.resolvedComplaints}
                          </span>
                        </td>

                        <td>
                          <span style={{ fontWeight: 700, color: 'var(--navy)' }}>
                            {dept.totalComplaints}
                          </span>
                        </td>

                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div
                              style={{
                                width: '48px',
                                height: '6px',
                                background: '#f1f5f9',
                                borderRadius: '4px',
                                overflow: 'hidden',
                              }}
                            >
                              <div
                                style={{
                                  width: `${resolutionRate}%`,
                                  height: '100%',
                                  background: '#10b981',
                                }}
                              />
                            </div>
                            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#059669' }}>
                              {resolutionRate}%
                            </span>
                          </div>
                        </td>

                        <td>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.4rem',
                              justifyContent: 'flex-end',
                            }}
                          >
                            <button
                              type="button"
                              className="btn-action-icon"
                              onClick={() => handleOpenDetails(dept)}
                              title="View Details"
                            >
                              <Eye size={14} />
                            </button>

                            <button
                              type="button"
                              className="btn-action-icon"
                              onClick={() => handleOpenEdit(dept)}
                              title="Edit Department"
                            >
                              <Edit3 size={14} />
                            </button>

                            <button
                              type="button"
                              className="btn-action-icon"
                              style={{ color: '#ef4444' }}
                              onClick={() => handleOpenDelete(dept)}
                              title="Delete Department"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>

      {/* ====================================================================
          1. Add Department Modal
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
              <h3>Create Facility Department</h3>
              <button
                type="button"
                className="sidebar-close-btn"
                style={{ display: 'inline-flex' }}
                onClick={() => setAddModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveNewDepartment}>
              <div className="modal-body">
                <div className="modal-form-grid">
                  <div className="modal-form-group modal-form-group--full">
                    <label className="modal-label">
                      <span>Department Name *</span>
                    </label>
                    <input
                      type="text"
                      className={`modal-input ${formErrors.name ? 'modal-input--error' : ''}`}
                      placeholder="e.g. Elevators & Vertical Transport"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    {formErrors.name && (
                      <span style={{ fontSize: '0.74rem', color: '#dc2626' }}>{formErrors.name}</span>
                    )}
                  </div>

                  <div className="modal-form-group">
                    <label className="modal-label">
                      <span>Department Head *</span>
                    </label>
                    <input
                      type="text"
                      className={`modal-input ${formErrors.head ? 'modal-input--error' : ''}`}
                      placeholder="e.g. Eng. Kevin Cross"
                      value={formData.head}
                      onChange={(e) => setFormData({ ...formData, head: e.target.value })}
                    />
                    {formErrors.head && (
                      <span style={{ fontSize: '0.74rem', color: '#dc2626' }}>{formErrors.head}</span>
                    )}
                  </div>

                  <div className="modal-form-group">
                    <label className="modal-label">
                      <span>Technicians Count</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      className="modal-input"
                      value={formData.techniciansCount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          techniciansCount: parseInt(e.target.value, 10) || 1,
                        })
                      }
                    />
                  </div>

                  <div className="modal-form-group">
                    <label className="modal-label">
                      <span>Official Email</span>
                    </label>
                    <input
                      type="email"
                      className="modal-input"
                      placeholder="division@campus-facilities.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="modal-form-group">
                    <label className="modal-label">
                      <span>Contact Hotline</span>
                    </label>
                    <input
                      type="tel"
                      className="modal-input"
                      placeholder="+1 (555) 019-XXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="modal-form-group modal-form-group--full">
                    <label className="modal-label">
                      <span>Office Location</span>
                    </label>
                    <input
                      type="text"
                      className="modal-input"
                      placeholder="e.g. Engineering Block, Ground Floor, Bay 2"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>

                  <div className="modal-form-group modal-form-group--full">
                    <label className="modal-label">
                      <span>Description & Scope of Work *</span>
                    </label>
                    <textarea
                      className={`remark-textarea ${
                        formErrors.description ? 'modal-input--error' : ''
                      }`}
                      placeholder="Describe the operational responsibilities of this division..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                    {formErrors.description && (
                      <span style={{ fontSize: '0.74rem', color: '#dc2626' }}>
                        {formErrors.description}
                      </span>
                    )}
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
                  Add Department
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================================
          2. Edit Department Modal
          ==================================================================== */}
      {editModalOpen && activeDept && (
        <div
          className="modal-backdrop"
          onClick={() => setEditModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="assign-modal-card" style={{ maxWidth: '540px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Department ({activeDept.id})</h3>
              <button
                type="button"
                className="sidebar-close-btn"
                style={{ display: 'inline-flex' }}
                onClick={() => setEditModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEditDepartment}>
              <div className="modal-body">
                <div className="modal-form-grid">
                  <div className="modal-form-group modal-form-group--full">
                    <label className="modal-label">
                      <span>Department Name *</span>
                    </label>
                    <input
                      type="text"
                      className={`modal-input ${formErrors.name ? 'modal-input--error' : ''}`}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="modal-form-group">
                    <label className="modal-label">
                      <span>Department Head *</span>
                    </label>
                    <input
                      type="text"
                      className={`modal-input ${formErrors.head ? 'modal-input--error' : ''}`}
                      value={formData.head}
                      onChange={(e) => setFormData({ ...formData, head: e.target.value })}
                    />
                  </div>

                  <div className="modal-form-group">
                    <label className="modal-label">
                      <span>Technicians Count</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      className="modal-input"
                      value={formData.techniciansCount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          techniciansCount: parseInt(e.target.value, 10) || 1,
                        })
                      }
                    />
                  </div>

                  <div className="modal-form-group">
                    <label className="modal-label">
                      <span>Official Email</span>
                    </label>
                    <input
                      type="email"
                      className="modal-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="modal-form-group">
                    <label className="modal-label">
                      <span>Contact Hotline</span>
                    </label>
                    <input
                      type="tel"
                      className="modal-input"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="modal-form-group modal-form-group--full">
                    <label className="modal-label">
                      <span>Office Location</span>
                    </label>
                    <input
                      type="text"
                      className="modal-input"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>

                  <div className="modal-form-group modal-form-group--full">
                    <label className="modal-label">
                      <span>Description & Scope of Work *</span>
                    </label>
                    <textarea
                      className="remark-textarea"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
          3. View Department Details Modal
          ==================================================================== */}
      {detailsModalOpen && activeDept && (
        <div
          className="modal-backdrop"
          onClick={() => setDetailsModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="assign-modal-card" style={{ maxWidth: '540px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Department Profile & Diagnostics</h3>
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
              <div className="dept-details-hero">
                {renderDeptIcon(activeDept.icon, activeDept.color)}
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--navy)', fontWeight: 800 }}>
                    {activeDept.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                    <span className="dept-id-chip">{activeDept.id}</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 600 }}>
                      Head: {activeDept.head}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.86rem', color: 'var(--slate)', lineHeight: 1.5, background: '#ffffff', padding: '0.85rem', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                {activeDept.description}
              </div>

              <div className="tech-details-grid">
                <div className="tech-detail-box">
                  <label>Assigned Technicians</label>
                  <span style={{ color: '#0284c7' }}>{activeDept.techniciansCount} Specialists</span>
                </div>

                <div className="tech-detail-box">
                  <label>Pending Complaints</label>
                  <span style={{ color: '#d97706' }}>{activeDept.pendingComplaints} Pending</span>
                </div>

                <div className="tech-detail-box">
                  <label>Resolved Complaints</label>
                  <span style={{ color: '#059669' }}>{activeDept.resolvedComplaints} Completed</span>
                </div>

                <div className="tech-detail-box">
                  <label>Total Logged</label>
                  <span style={{ color: 'var(--navy)' }}>{activeDept.totalComplaints} Tickets</span>
                </div>

                <div className="tech-detail-box">
                  <label>Department Email</label>
                  <span style={{ fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Mail size={13} />
                    {activeDept.email}
                  </span>
                </div>

                <div className="tech-detail-box">
                  <label>Hotline Phone</label>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Phone size={13} />
                    {activeDept.phone}
                  </span>
                </div>

                <div className="tech-detail-box" style={{ gridColumn: '1 / -1' }}>
                  <label>Physical Location</label>
                  <span>{activeDept.location}</span>
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
                  handleOpenEdit(activeDept)
                }}
              >
                Edit Department
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          4. Delete Department Confirmation Modal
          ==================================================================== */}
      {deleteModalOpen && activeDept && (
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

            <h3 className="confirm-title">Remove Facility Division?</h3>

            <p className="confirm-desc">
              Are you sure you want to remove <strong>{activeDept.name}</strong> ({activeDept.id})?
              All ongoing work orders and assigned technicians must be reassigned prior to deletion.
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
                Delete Department
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageDepartments
