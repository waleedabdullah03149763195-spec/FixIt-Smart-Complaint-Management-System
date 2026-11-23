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
  Clock,
  ExternalLink,
  FileText,
  HardHat,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  RotateCcw,
  Search,
  Settings,
  ShieldCheck,
  UserCheck,
  Users,
  Wrench,
  X,
} from 'lucide-react'
import './AdminComplaints.css'

// Initial Admin Complaints Master Dataset
const INITIAL_COMPLAINTS_DATA = [
  {
    id: 'CMP-1048',
    title: 'Faulty AC in Computer Lab 3',
    department: 'Computer Science & IT',
    location: 'Science Complex Block C, Room 302',
    studentName: 'Alex Morgan',
    studentId: 'STU-2024-8842',
    priority: 'High',
    status: 'In Progress',
    assignedTech: 'Mike Vance (HVAC)',
    assignedTechId: 'tech-1',
    date: '2026-11-21',
    displayDate: 'Nov 21, 2026',
    remarks: [
      {
        id: 1,
        author: 'Dr. Eleanor Vance (Super Admin)',
        text: 'Verified with CS Lab Coordinator. Dispatched as High Priority before practical exams.',
        time: 'Nov 21, 10:15 AM',
      },
      {
        id: 2,
        author: 'Mike Vance (HVAC Tech)',
        text: 'Identified refrigerant flare leak. Sourcing replacement R-410A gas.',
        time: 'Nov 21, 02:40 PM',
      },
    ],
  },
  {
    id: 'CMP-1052',
    title: 'Water Leakage from Ceiling in Corridor',
    department: 'Civil Facilities',
    location: 'Hostel Block B, 1st Floor East Wing',
    studentName: 'Jordan Lee',
    studentId: 'STU-2024-5519',
    priority: 'Urgent',
    status: 'Pending',
    assignedTech: null,
    assignedTechId: null,
    date: '2026-11-22',
    displayDate: 'Nov 22, 2026',
    remarks: [
      {
        id: 1,
        author: 'Hostel Warden Office',
        text: 'Water spreading toward electrical junction box. Immediate civil inspection required.',
        time: 'Nov 22, 08:30 AM',
      },
    ],
  },
  {
    id: 'CMP-1042',
    title: 'Broken Projector in Seminar Hall 102',
    department: 'Computer Science & IT',
    location: 'Academic Complex, Ground Floor',
    studentName: 'Sophia Martinez',
    studentId: 'STU-2023-4108',
    priority: 'Medium',
    status: 'Resolved',
    assignedTech: 'David Cole (AV Tech)',
    assignedTechId: 'tech-2',
    date: '2026-11-19',
    displayDate: 'Nov 19, 2026',
    remarks: [
      {
        id: 1,
        author: 'David Cole (AV Tech)',
        text: 'Replaced optical bulb and calibrated HDMI ceiling feed. Fully operational.',
        time: 'Nov 19, 04:15 PM',
      },
    ],
  },
  {
    id: 'CMP-1040',
    title: 'Emergency Elevator Alarm Triggered',
    department: 'Hostel & Residential',
    location: 'Hostel Block A, Elevator Core 2',
    studentName: 'Marcus Wright',
    studentId: 'STU-2024-1923',
    priority: 'Urgent',
    status: 'In Progress',
    assignedTech: 'Otis Certified Team',
    assignedTechId: 'tech-ot',
    date: '2026-11-18',
    displayDate: 'Nov 18, 2026',
    remarks: [
      {
        id: 1,
        author: 'Chief Safety Officer',
        text: 'Elevator grounded safely. Sensors being recalibrated by OEM contractors.',
        time: 'Nov 18, 01:20 PM',
      },
    ],
  },
  {
    id: 'CMP-1039',
    title: 'Flickering LED Lights in Central Study Hall',
    department: 'Central Library',
    location: 'Central Library, 1st Floor Study Area',
    studentName: 'Chloe Bennett',
    studentId: 'STU-2023-7712',
    priority: 'Low',
    status: 'Resolved',
    assignedTech: 'Sarah Jenkins (Electrician)',
    assignedTechId: 'tech-3',
    date: '2026-11-17',
    displayDate: 'Nov 17, 2026',
    remarks: [
      {
        id: 1,
        author: 'Sarah Jenkins (Electrician)',
        text: 'Swapped failing LED ballast and replaced two fluorescent fixtures.',
        time: 'Nov 17, 03:00 PM',
      },
    ],
  },
  {
    id: 'CMP-1037',
    title: 'Broken Door Hinge in Chemistry Prep Room',
    department: 'Science Laboratories',
    location: 'Chemistry Block, Room 108',
    studentName: 'Daniel Kim',
    studentId: 'STU-2024-3381',
    priority: 'Medium',
    status: 'Pending',
    assignedTech: null,
    assignedTechId: null,
    date: '2026-11-15',
    displayDate: 'Nov 15, 2026',
    remarks: [],
  },
  {
    id: 'CMP-1035',
    title: 'Drainage Clog in Basement Restroom',
    department: 'Civil Facilities',
    location: 'Engineering Building, Basement Level',
    studentName: 'Tariq Al-Mansoor',
    studentId: 'STU-2023-9022',
    priority: 'High',
    status: 'In Progress',
    assignedTech: 'Paul Gomez (Plumber)',
    assignedTechId: 'tech-6',
    date: '2026-11-14',
    displayDate: 'Nov 14, 2026',
    remarks: [
      {
        id: 1,
        author: 'Paul Gomez (Plumber)',
        text: 'Snaking mainline drain pipe. Debris cleared; pressure testing seals.',
        time: 'Nov 14, 05:00 PM',
      },
    ],
  },
  {
    id: 'CMP-1032',
    title: 'Power Socket Sparking in Organic Lab 2',
    department: 'Science Laboratories',
    location: 'Chemistry Block, Organic Lab 2',
    studentName: 'Priya Patel',
    studentId: 'STU-2024-6649',
    priority: 'High',
    status: 'Resolved',
    assignedTech: 'Robert Chen (Electrician)',
    assignedTechId: 'tech-5',
    date: '2026-11-13',
    displayDate: 'Nov 13, 2026',
    remarks: [
      {
        id: 1,
        author: 'Robert Chen (Electrician)',
        text: 'Burnt 16A industrial socket isolated and replaced with surge-protected wall unit.',
        time: 'Nov 13, 02:30 PM',
      },
    ],
  },
  {
    id: 'CMP-1028',
    title: 'Key Cylinder Jammed in Hostel Dorm 204',
    department: 'Hostel & Residential',
    location: 'Hostel Block A, 2nd Floor',
    studentName: 'Alex Morgan',
    studentId: 'STU-2024-8842',
    priority: 'Medium',
    status: 'Resolved',
    assignedTech: 'Arthur Pendelton (Locksmith)',
    assignedTechId: 'tech-4',
    date: '2026-11-10',
    displayDate: 'Nov 10, 2026',
    remarks: [
      {
        id: 1,
        author: 'Arthur Pendelton (Locksmith)',
        text: 'Replaced brass cylinder mechanism and handed over 2 new cut keys.',
        time: 'Nov 10, 06:15 PM',
      },
    ],
  },
  {
    id: 'CMP-1025',
    title: 'Wi-Fi Access Point Frequent Disconnections',
    department: 'Computer Science & IT',
    location: 'Central Library, 3rd Floor Silent Zone',
    studentName: 'Kevin Zhao',
    studentId: 'STU-2023-8821',
    priority: 'High',
    status: 'In Progress',
    assignedTech: 'Network Infrastructure Team',
    assignedTechId: 'tech-net',
    date: '2026-11-08',
    displayDate: 'Nov 08, 2026',
    remarks: [
      {
        id: 1,
        author: 'Network Admin',
        text: 'Firmware roll-out scheduled tonight to fix Cisco AP DHCP handoff glitch.',
        time: 'Nov 08, 04:00 PM',
      },
    ],
  },
  {
    id: 'CMP-1021',
    title: 'Broken Microwave Door in Faculty Lounge',
    department: 'Campus Administration',
    location: 'Admin Building, 2nd Floor Staff Pantry',
    studentName: 'Prof. Harrison Cole',
    studentId: 'FAC-2021-0042',
    priority: 'Low',
    status: 'Rejected',
    assignedTech: null,
    assignedTechId: null,
    date: '2026-11-06',
    displayDate: 'Nov 06, 2026',
    remarks: [
      {
        id: 1,
        author: 'Dr. Eleanor Vance (Super Admin)',
        text: 'Appliance is non-university property (personal faculty contribution). Vendor warranty referral sent.',
        time: 'Nov 06, 11:00 AM',
      },
    ],
  },
  {
    id: 'CMP-1018',
    title: 'Loose Staircase Handrail Near East Gate',
    department: 'Civil Facilities',
    location: 'East Campus Entrance Walkway',
    studentName: 'Amina Idris',
    studentId: 'STU-2024-7733',
    priority: 'Urgent',
    status: 'Pending',
    assignedTech: null,
    assignedTechId: null,
    date: '2026-11-04',
    displayDate: 'Nov 04, 2026',
    remarks: [
      {
        id: 1,
        author: 'Campus Safety Patrol',
        text: 'Caution tape applied. Heavy steel bracket anchoring required.',
        time: 'Nov 04, 09:10 AM',
      },
    ],
  },
]

// Available Campus Technicians for Assignment
const AVAILABLE_TECHNICIANS = [
  { id: 'tech-1', name: 'Mike Vance', trade: 'HVAC & Climate Systems', activeJobs: 3 },
  { id: 'tech-2', name: 'David Cole', trade: 'Audio-Visual & Smart Labs', activeJobs: 1 },
  { id: 'tech-3', name: 'Sarah Jenkins', trade: 'Electrical Systems', activeJobs: 2 },
  { id: 'tech-4', name: 'Arthur Pendelton', trade: 'Carpentry & Locksmith', activeJobs: 0 },
  { id: 'tech-5', name: 'Robert Chen', trade: 'Senior Electrician', activeJobs: 1 },
  { id: 'tech-6', name: 'Paul Gomez', trade: 'Plumbing & Pipe Infrastructure', activeJobs: 2 },
]

const DEPARTMENTS_LIST = [
  'All Departments',
  'Computer Science & IT',
  'Civil Facilities',
  'Electrical & Power Systems',
  'Hostel & Residential',
  'Science Laboratories',
  'Central Library',
  'Campus Administration',
]

const STATUSES_LIST = ['All Statuses', 'Pending', 'In Progress', 'Resolved', 'Rejected']
const PRIORITIES_LIST = ['All Priorities', 'Urgent', 'High', 'Medium', 'Low']

const ITEMS_PER_PAGE = 6

function AdminComplaints() {
  // Navigation & responsive state
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)

  // Dataset & Feedback
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS_DATA)
  const [toastMessage, setToastMessage] = useState(null)

  // Filter, search & sorting state
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Statuses')
  const [priorityFilter, setPriorityFilter] = useState('All Priorities')
  const [departmentFilter, setDepartmentFilter] = useState('All Departments')
  const [sortBy, setSortBy] = useState('date-desc') // 'date-desc' | 'date-asc' | 'priority-desc' | 'priority-asc'
  const [currentPage, setCurrentPage] = useState(1)

  // Assign Technician Modal State
  const [assignModalOpen, setAssignModalOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [chosenTechId, setChosenTechId] = useState('')

  // Remarks Modal State
  const [remarksModalOpen, setRemarksModalOpen] = useState(false)
  const [remarkTicket, setRemarkTicket] = useState(null)
  const [newRemarkText, setNewRemarkText] = useState('')

  // Status Change Confirmation Modal State
  const [statusConfirmModalOpen, setStatusConfirmModalOpen] = useState(false)
  const [pendingStatusChange, setPendingStatusChange] = useState(null) // { ticket, targetStatus }

  // Quick stats calculations
  const statsCounts = useMemo(() => {
    return {
      total: complaints.length,
      pending: complaints.filter((c) => c.status === 'Pending').length,
      inProgress: complaints.filter((c) => c.status === 'In Progress').length,
      resolved: complaints.filter((c) => c.status === 'Resolved').length,
      rejected: complaints.filter((c) => c.status === 'Rejected').length,
    }
  }, [complaints])

  // Filtered and sorted complaints
  const processedComplaints = useMemo(() => {
    const priorityWeight = { Urgent: 4, High: 3, Medium: 2, Low: 1 }

    const result = complaints.filter((item) => {
      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        item.id.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.studentName.toLowerCase().includes(q) ||
        item.studentId.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q)

      const matchesStatus =
        statusFilter === 'All Statuses' || item.status === statusFilter
      const matchesPriority =
        priorityFilter === 'All Priorities' || item.priority === priorityFilter
      const matchesDepartment =
        departmentFilter === 'All Departments' || item.department === departmentFilter

      return matchesSearch && matchesStatus && matchesPriority && matchesDepartment
    })

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'date-desc') {
        return new Date(b.date) - new Date(a.date)
      }
      if (sortBy === 'date-asc') {
        return new Date(a.date) - new Date(b.date)
      }
      if (sortBy === 'priority-desc') {
        return (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0)
      }
      if (sortBy === 'priority-asc') {
        return (priorityWeight[a.priority] || 0) - (priorityWeight[b.priority] || 0)
      }
      return 0
    })

    return result
  }, [complaints, searchQuery, statusFilter, priorityFilter, departmentFilter, sortBy])

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(processedComplaints.length / ITEMS_PER_PAGE))
  const paginatedComplaints = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return processedComplaints.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [processedComplaints, currentPage])

  // Reset pagination when filters change
  const handleFilterChange = (setter, value) => {
    setter(value)
    setCurrentPage(1)
  }

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery('')
    setStatusFilter('All Statuses')
    setPriorityFilter('All Priorities')
    setDepartmentFilter('All Departments')
    setSortBy('date-desc')
    setCurrentPage(1)
  }

  // 1. Open Assign Modal
  const handleOpenAssignModal = (ticket) => {
    setSelectedTicket(ticket)
    setChosenTechId(ticket.assignedTechId || AVAILABLE_TECHNICIANS[0].id)
    setAssignModalOpen(true)
  }

  // Confirm Assign Technician
  const handleConfirmAssignment = () => {
    if (!selectedTicket || !chosenTechId) return

    const techObj = AVAILABLE_TECHNICIANS.find((t) => t.id === chosenTechId)
    const techName = `${techObj.name} (${techObj.trade.split(' ')[0]})`

    setComplaints((prev) =>
      prev.map((c) =>
        c.id === selectedTicket.id
          ? {
              ...c,
              assignedTech: techName,
              assignedTechId: techObj.id,
              status: c.status === 'Pending' ? 'In Progress' : c.status,
            }
          : c
      )
    )

    setAssignModalOpen(false)
    setToastMessage({
      type: 'success',
      text: `Technician ${techObj.name} assigned to ticket ${selectedTicket.id}.`,
    })
    setTimeout(() => setToastMessage(null), 3500)
  }

  // 2. Open Remarks Modal
  const handleOpenRemarksModal = (ticket) => {
    setRemarkTicket(ticket)
    setNewRemarkText('')
    setRemarksModalOpen(true)
  }

  // Append new remark
  const handleAddRemark = (e) => {
    e.preventDefault()
    if (!newRemarkText.trim() || !remarkTicket) return

    const newRemarkObj = {
      id: Date.now(),
      author: 'Dr. Eleanor Vance (Super Admin)',
      text: newRemarkText.trim(),
      time: 'Just now',
    }

    setComplaints((prev) =>
      prev.map((c) =>
        c.id === remarkTicket.id
          ? { ...c, remarks: [...(c.remarks || []), newRemarkObj] }
          : c
      )
    )

    setRemarkTicket((prev) => ({
      ...prev,
      remarks: [...(prev.remarks || []), newRemarkObj],
    }))

    setNewRemarkText('')
    setToastMessage({
      type: 'success',
      text: `Admin remark recorded for ticket ${remarkTicket.id}.`,
    })
    setTimeout(() => setToastMessage(null), 3000)
  }

  // 3. Initiate Status Change
  const handleRequestStatusChange = (ticket, targetStatus) => {
    if (ticket.status === targetStatus) return

    // Require confirmation for critical statuses (Resolved or Rejected)
    if (targetStatus === 'Resolved' || targetStatus === 'Rejected') {
      setPendingStatusChange({ ticket, targetStatus })
      setStatusConfirmModalOpen(true)
    } else {
      // Direct update for Pending or In Progress
      applyStatusChange(ticket.id, targetStatus)
    }
  }

  // Confirm Status Change in modal
  const handleConfirmStatusChange = () => {
    if (!pendingStatusChange) return
    applyStatusChange(pendingStatusChange.ticket.id, pendingStatusChange.targetStatus)
    setStatusConfirmModalOpen(false)
    setPendingStatusChange(null)
  }

  const applyStatusChange = (ticketId, targetStatus) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === ticketId ? { ...c, status: targetStatus } : c))
    )

    setToastMessage({
      type: 'success',
      text: `Ticket ${ticketId} status updated to "${targetStatus}".`,
    })
    setTimeout(() => setToastMessage(null), 3500)
  }

  // Helper priority badge class
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

  // Helper status inline select class
  const getStatusDropdownClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'status-dropdown-inline status-dropdown-inline--pending'
      case 'In Progress':
        return 'status-dropdown-inline status-dropdown-inline--progress'
      case 'Resolved':
        return 'status-dropdown-inline status-dropdown-inline--resolved'
      default:
        return 'status-dropdown-inline status-dropdown-inline--rejected'
    }
  }

  return (
    <div className="admin-complaints-layout">
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
            className="sidebar-nav__item sidebar-nav__item--active"
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
      <div className="admin-complaints-main">
        {/* Header Bar */}
        <header className="admin-complaints-header-bar">
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
                <span>Manage Complaints & Work Orders</span>
                <span className="admin-portal-badge">{complaints.length} Records</span>
              </h1>
              <p>Campus maintenance ticket dispatch, real-time status management, and audit remarks.</p>
            </div>
          </div>

          <div className="admin-header-controls">
            <button
              type="button"
              className="header-icon-btn"
              onClick={() =>
                setToastMessage({
                  type: 'info',
                  text: 'Alerts: 3 complaints currently require technician assignment.',
                })
              }
              aria-label="Notifications"
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
        <main className="complaints-content">
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
              1. Top Statistics Quick Filter Strip
              ================================================================ */}
          <div className="complaints-stats-strip">
            <div
              className={`stat-strip-box ${
                statusFilter === 'All Statuses' ? 'stat-strip-box--active' : ''
              }`}
              onClick={() => handleFilterChange(setStatusFilter, 'All Statuses')}
              role="button"
              tabIndex={0}
            >
              <div>
                <span className="stat-strip-label">Total Complaints</span>
                <div className="stat-strip-val">{statsCounts.total}</div>
              </div>
              <div className="stat-strip-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
                <FileText size={18} />
              </div>
            </div>

            <div
              className={`stat-strip-box ${
                statusFilter === 'Pending' ? 'stat-strip-box--active' : ''
              }`}
              onClick={() => handleFilterChange(setStatusFilter, 'Pending')}
              role="button"
              tabIndex={0}
            >
              <div>
                <span className="stat-strip-label">Pending</span>
                <div className="stat-strip-val" style={{ color: '#d97706' }}>
                  {statsCounts.pending}
                </div>
              </div>
              <div className="stat-strip-icon" style={{ background: '#fffbeb', color: '#d97706' }}>
                <Clock size={18} />
              </div>
            </div>

            <div
              className={`stat-strip-box ${
                statusFilter === 'In Progress' ? 'stat-strip-box--active' : ''
              }`}
              onClick={() => handleFilterChange(setStatusFilter, 'In Progress')}
              role="button"
              tabIndex={0}
            >
              <div>
                <span className="stat-strip-label">In Progress</span>
                <div className="stat-strip-val" style={{ color: '#2563eb' }}>
                  {statsCounts.inProgress}
                </div>
              </div>
              <div className="stat-strip-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
                <Wrench size={18} />
              </div>
            </div>

            <div
              className={`stat-strip-box ${
                statusFilter === 'Resolved' ? 'stat-strip-box--active' : ''
              }`}
              onClick={() => handleFilterChange(setStatusFilter, 'Resolved')}
              role="button"
              tabIndex={0}
            >
              <div>
                <span className="stat-strip-label">Resolved</span>
                <div className="stat-strip-val" style={{ color: '#059669' }}>
                  {statsCounts.resolved}
                </div>
              </div>
              <div className="stat-strip-icon" style={{ background: '#ecfdf5', color: '#059669' }}>
                <CheckCircle2 size={18} />
              </div>
            </div>

            <div
              className={`stat-strip-box ${
                statusFilter === 'Rejected' ? 'stat-strip-box--active' : ''
              }`}
              onClick={() => handleFilterChange(setStatusFilter, 'Rejected')}
              role="button"
              tabIndex={0}
            >
              <div>
                <span className="stat-strip-label">Rejected</span>
                <div className="stat-strip-val" style={{ color: '#dc2626' }}>
                  {statsCounts.rejected}
                </div>
              </div>
              <div className="stat-strip-icon" style={{ background: '#fef2f2', color: '#dc2626' }}>
                <X size={18} />
              </div>
            </div>
          </div>

          {/* ================================================================
              2. Search, Filters & Sorting Toolbar Card
              ================================================================ */}
          <div className="complaints-filter-card">
            <div className="filter-row-top">
              {/* Search Bar */}
              <div className="complaints-search-wrap">
                <Search size={16} className="complaints-search-icon" />
                <input
                  type="text"
                  className="complaints-search-input"
                  placeholder="Search by ID (#CMP-1048), title, student name, or location..."
                  value={searchQuery}
                  onChange={(e) => handleFilterChange(setSearchQuery, e.target.value)}
                />
              </div>

              {/* Filter Controls Cluster */}
              <div className="filter-row-controls">
                {/* Department Filter */}
                <select
                  className="filter-select"
                  value={departmentFilter}
                  onChange={(e) => handleFilterChange(setDepartmentFilter, e.target.value)}
                  aria-label="Filter by department"
                >
                  {DEPARTMENTS_LIST.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>

                {/* Status Filter */}
                <select
                  className="filter-select"
                  value={statusFilter}
                  onChange={(e) => handleFilterChange(setStatusFilter, e.target.value)}
                  aria-label="Filter by status"
                >
                  {STATUSES_LIST.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>

                {/* Priority Filter */}
                <select
                  className="filter-select"
                  value={priorityFilter}
                  onChange={(e) => handleFilterChange(setPriorityFilter, e.target.value)}
                  aria-label="Filter by priority"
                >
                  {PRIORITIES_LIST.map((pr) => (
                    <option key={pr} value={pr}>
                      {pr}
                    </option>
                  ))}
                </select>

                {/* Sort Option */}
                <select
                  className="filter-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort complaints"
                >
                  <option value="date-desc">Date (Newest First)</option>
                  <option value="date-asc">Date (Oldest First)</option>
                  <option value="priority-desc">Priority (Highest First)</option>
                  <option value="priority-asc">Priority (Lowest First)</option>
                </select>

                {/* Clear Filters Button */}
                {(searchQuery ||
                  statusFilter !== 'All Statuses' ||
                  priorityFilter !== 'All Priorities' ||
                  departmentFilter !== 'All Departments') && (
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
          </div>

          {/* ================================================================
              3. Complaints Table & Pagination Card
              ================================================================ */}
          <div className="complaints-table-card">
            <div className="complaints-table-container">
              <table className="manage-complaints-table">
                <thead>
                  <tr>
                    <th>Ticket ID</th>
                    <th>Complaint Title & Location</th>
                    <th>Student Requester</th>
                    <th>Department</th>
                    <th>Submitted</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Assigned Tech</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedComplaints.length === 0 ? (
                    <tr>
                      <td colSpan={9} style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
                        <AlertCircle
                          size={32}
                          style={{ color: '#94a3b8', margin: '0 auto 0.65rem' }}
                        />
                        <p style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '1rem' }}>
                          No complaints match your active filters.
                        </p>
                        <p style={{ fontSize: '0.84rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
                          Try clearing filters or searching with different keywords.
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
                    paginatedComplaints.map((item) => (
                      <tr key={item.id}>
                        {/* ID */}
                        <td>
                          <span
                            className="ticket-code-pill"
                            onClick={() => handleOpenRemarksModal(item)}
                            title="Click to view remarks history"
                          >
                            {item.id}
                          </span>
                        </td>

                        {/* Title & Room Location */}
                        <td>
                          <span className="table-title-main">{item.title}</span>
                          <span className="table-sub-loc">{item.location}</span>
                        </td>

                        {/* Student / User */}
                        <td>
                          <span className="table-user-main">{item.studentName}</span>
                          <span className="table-user-sub">{item.studentId}</span>
                        </td>

                        {/* Department */}
                        <td>
                          <span style={{ fontSize: '0.84rem', fontWeight: 500 }}>
                            {item.department}
                          </span>
                        </td>

                        {/* Date */}
                        <td>
                          <span style={{ fontSize: '0.82rem', color: 'var(--slate)', whiteSpace: 'nowrap' }}>
                            {item.displayDate}
                          </span>
                        </td>

                        {/* Priority Badge */}
                        <td>
                          <span className={getPriorityBadgeClass(item.priority)}>
                            {item.priority}
                          </span>
                        </td>

                        {/* Status (Interactive dropdown selector) */}
                        <td>
                          <select
                            className={getStatusDropdownClass(item.status)}
                            value={item.status}
                            onChange={(e) => handleRequestStatusChange(item, e.target.value)}
                            title="Change complaint status"
                          >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </td>

                        {/* Assigned Technician */}
                        <td>
                          {item.assignedTech ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                              <div
                                style={{
                                  width: '24px',
                                  height: '24px',
                                  borderRadius: '50%',
                                  background: '#e2e8f0',
                                  fontSize: '0.65rem',
                                  fontWeight: 700,
                                  display: 'grid',
                                  placeItems: 'center',
                                }}
                              >
                                {item.assignedTech.slice(0, 2).toUpperCase()}
                              </div>
                              <span style={{ fontSize: '0.84rem', fontWeight: 500 }}>
                                {item.assignedTech}
                              </span>
                            </div>
                          ) : (
                            <span
                              style={{
                                fontSize: '0.75rem',
                                color: '#dc2626',
                                fontWeight: 700,
                                background: '#fef2f2',
                                padding: '0.2rem 0.5rem',
                                borderRadius: '6px',
                                border: '1px solid #fecaca',
                              }}
                            >
                              Unassigned
                            </span>
                          )}
                        </td>

                        {/* Actions Cluster */}
                        <td>
                          <div className="table-action-cluster" style={{ justifyContent: 'flex-end' }}>
                            {/* Assign / Reassign Button */}
                            <button
                              type="button"
                              className="btn-action-icon btn-action-assign"
                              onClick={() => handleOpenAssignModal(item)}
                              title={item.assignedTech ? 'Reassign Technician' : 'Assign Technician'}
                            >
                              <UserCheck size={15} />
                            </button>

                            {/* Remarks Button */}
                            <button
                              type="button"
                              className="btn-action-icon btn-action-remarks"
                              onClick={() => handleOpenRemarksModal(item)}
                              title="Add or view admin remarks"
                            >
                              <MessageSquare size={15} />
                            </button>

                            {/* View Complaint Details */}
                            <Link
                              to={`/user/complaints/${item.id}`}
                              className="btn-action-icon"
                              title="Open full complaint details"
                            >
                              <ExternalLink size={15} />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {processedComplaints.length > 0 && (
              <div className="complaints-pagination">
                <span className="pagination-info">
                  Showing{' '}
                  <strong>
                    {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                    {Math.min(currentPage * ITEMS_PER_PAGE, processedComplaints.length)}
                  </strong>{' '}
                  of <strong>{processedComplaints.length}</strong> complaints
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
          1. Assign or Reassign Technician Modal
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
              <h3>
                {selectedTicket.assignedTech
                  ? 'Reassign Maintenance Specialist'
                  : 'Assign Maintenance Specialist'}
              </h3>
              <button
                type="button"
                className="sidebar-close-btn"
                style={{ display: 'inline-flex' }}
                onClick={() => setAssignModalOpen(false)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              {/* Ticket Preview Box */}
              <div className="modal-ticket-preview">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="modal-ticket-id">{selectedTicket.id}</span>
                  <span className={getPriorityBadgeClass(selectedTicket.priority)}>
                    {selectedTicket.priority}
                  </span>
                </div>
                <div className="modal-ticket-title">{selectedTicket.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.25rem' }}>
                  Location: {selectedTicket.location}
                </div>
                {selectedTicket.assignedTech && (
                  <div
                    style={{
                      fontSize: '0.78rem',
                      color: '#2563eb',
                      fontWeight: 600,
                      marginTop: '0.35rem',
                    }}
                  >
                    Current: {selectedTicket.assignedTech}
                  </div>
                )}
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
                  Select Available Campus Technician
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
                {selectedTicket.assignedTech ? 'Confirm Reassignment' : 'Dispatch Technician'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          2. Admin Remarks & History Modal
          ==================================================================== */}
      {remarksModalOpen && remarkTicket && (
        <div
          className="modal-backdrop"
          onClick={() => setRemarksModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="assign-modal-card" style={{ maxWidth: '540px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Admin Remarks & Audit Log</h3>
              <button
                type="button"
                className="sidebar-close-btn"
                style={{ display: 'inline-flex' }}
                onClick={() => setRemarksModalOpen(false)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              {/* Ticket Preview Box */}
              <div className="modal-ticket-preview">
                <span className="modal-ticket-id">{remarkTicket.id}</span>
                <div className="modal-ticket-title">{remarkTicket.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
                  Requester: {remarkTicket.studentName} ({remarkTicket.department})
                </div>
              </div>

              {/* Remarks History */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: 'var(--navy)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Previous Remarks ({remarkTicket.remarks?.length || 0})
                </label>

                {remarkTicket.remarks && remarkTicket.remarks.length > 0 ? (
                  <div className="modal-remarks-history">
                    {remarkTicket.remarks.map((r) => (
                      <div key={r.id} className="remark-bubble">
                        <div className="remark-meta">
                          <span className="remark-author">{r.author}</span>
                          <span>{r.time}</span>
                        </div>
                        <p style={{ margin: 0, color: 'var(--slate)', lineHeight: 1.4 }}>{r.text}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: '0.82rem', color: 'var(--muted)', fontStyle: 'italic', padding: '0.5rem 0' }}>
                    No administrative remarks have been logged for this ticket yet.
                  </p>
                )}
              </div>

              {/* Add New Remark Form */}
              <form onSubmit={handleAddRemark}>
                <label
                  htmlFor="new-remark"
                  style={{
                    display: 'block',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: 'var(--navy)',
                    marginBottom: '0.4rem',
                  }}
                >
                  Append Official Remark
                </label>
                <textarea
                  id="new-remark"
                  className="remark-textarea"
                  placeholder="Enter administrative directive, inspection notes, or parts status..."
                  value={newRemarkText}
                  onChange={(e) => setNewRemarkText(e.target.value)}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.65rem' }}>
                  <button
                    type="submit"
                    className="btn-settings-save"
                    disabled={!newRemarkText.trim()}
                  >
                    Add Remark
                  </button>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn-settings-cancel"
                onClick={() => setRemarksModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          3. Status Change Confirmation Modal
          ==================================================================== */}
      {statusConfirmModalOpen && pendingStatusChange && (
        <div
          className="modal-backdrop"
          onClick={() => setStatusConfirmModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="confirm-dialog-card" onClick={(e) => e.stopPropagation()}>
            <div
              className={`confirm-icon-bubble ${
                pendingStatusChange.targetStatus === 'Rejected'
                  ? 'confirm-icon--danger'
                  : 'confirm-icon--success'
              }`}
            >
              {pendingStatusChange.targetStatus === 'Rejected' ? (
                <AlertTriangle size={26} />
              ) : (
                <CheckCircle2 size={26} />
              )}
            </div>

            <h3 className="confirm-title">
              {pendingStatusChange.targetStatus === 'Rejected'
                ? 'Reject Maintenance Request?'
                : 'Mark Complaint as Resolved?'}
            </h3>

            <p className="confirm-desc">
              {pendingStatusChange.targetStatus === 'Rejected' ? (
                <>
                  Are you sure you want to reject ticket{' '}
                  <strong>{pendingStatusChange.ticket.id}</strong> (
                  {pendingStatusChange.ticket.title})? The requester will be notified that this
                  maintenance request was declined.
                </>
              ) : (
                <>
                  Are you sure you want to mark ticket{' '}
                  <strong>{pendingStatusChange.ticket.id}</strong> as{' '}
                  <strong>Resolved</strong>? This will record the work as complete and invite the
                  student to submit feedback.
                </>
              )}
            </p>

            <div className="confirm-actions-row">
              <button
                type="button"
                className="btn-confirm-cancel"
                onClick={() => {
                  setStatusConfirmModalOpen(false)
                  setPendingStatusChange(null)
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                className={`btn-confirm-proceed ${
                  pendingStatusChange.targetStatus === 'Rejected'
                    ? 'btn-confirm-proceed--danger'
                    : 'btn-confirm-proceed--success'
                }`}
                onClick={handleConfirmStatusChange}
              >
                Confirm {pendingStatusChange.targetStatus}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminComplaints
