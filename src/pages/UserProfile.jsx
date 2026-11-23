import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertCircle,
  Bell,
  Building2,
  Calendar,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  Edit3,
  FileText,
  LayoutDashboard,
  Loader2,
  Lock,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Phone,
  PlusCircle,
  RotateCcw,
  Save,
  Settings,
  ShieldCheck,
  Sparkles,
  User,
  Wrench,
  X,
} from 'lucide-react'
import './UserProfile.css'

// Default mock student user profile data
const DEFAULT_USER_PROFILE = {
  fullName: 'Alex Morgan',
  email: 'alex.morgan@campus.edu',
  studentId: 'STU-2024-8842',
  department: 'Computer Science & IT',
  phoneNumber: '+1 (555) 482-9013',
  accountCreatedDate: 'September 15, 2024',
  role: 'Student / User',
  residence: 'Hostel Block A, Room 204',
  emergencyContact: '+1 (555) 309-8812 (Guardian)',
}

const DEPARTMENTS = [
  'Computer Science & IT',
  'Civil Facilities & Engineering',
  'Electrical & Electronic Engineering',
  'Mechanical Engineering',
  'Science Laboratories & Research',
  'Business Administration',
  'Central Library & Archives',
  'Hostel & Residential Services',
]

function UserProfile() {
  // Navigation & responsive state
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)

  // Profile data & edit mode state
  const [userProfile, setUserProfile] = useState(DEFAULT_USER_PROFILE)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({ ...DEFAULT_USER_PROFILE })
  const [errors, setErrors] = useState({})
  const [isSaving, setIsSaving] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)
  const [copiedId, setCopiedId] = useState(false)

  // Profile avatar state
  const [avatarImage, setAvatarImage] = useState(null)
  const fileInputRef = useRef(null)

  // Form field change handler
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear inline error on edit
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  // Field validation
  const validateForm = () => {
    const newErrors = {}

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.'
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Full Name must be at least 3 characters long.'
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.'
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid campus email address (e.g. name@campus.edu).'
    }

    // Phone validation
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required.'
    } else if (!phoneRegex.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = 'Please enter a valid contact phone number.'
    }

    // Department validation
    if (!formData.department) {
      newErrors.department = 'Please select your academic or administrative department.'
    }

    return newErrors
  }

  // Toggle edit mode
  const handleStartEditing = () => {
    setFormData({ ...userProfile })
    setErrors({})
    setEditMode(true)
  }

  // Cancel editing
  const handleCancelEditing = () => {
    setFormData({ ...userProfile })
    setErrors({})
    setEditMode(false)
  }

  // Save changes handler
  const handleSaveChanges = (e) => {
    e.preventDefault()
    const validationErrors = validateForm()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      const firstKey = Object.keys(validationErrors)[0]
      const el = document.getElementById(firstKey)
      if (el) el.focus()
      return
    }

    setIsSaving(true)

    // Simulate mock save latency
    setTimeout(() => {
      setUserProfile({ ...formData })
      setIsSaving(false)
      setEditMode(false)
      setToastMessage({
        type: 'success',
        text: 'Profile details updated successfully! Your account information has been saved.',
      })
    }, 600)
  }

  // Handle avatar image selection
  const handleAvatarFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setToastMessage({
        type: 'error',
        text: 'Please select an image file (PNG, JPG, JPEG or WEBP).',
      })
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setToastMessage({
        type: 'error',
        text: 'Avatar image file must be smaller than 5MB.',
      })
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setAvatarImage(reader.result)
      setToastMessage({
        type: 'success',
        text: 'Profile avatar updated! Preview is active.',
      })
    }
    reader.readAsDataURL(file)
  }

  // Reset avatar to initial monogram
  const handleResetAvatar = () => {
    setAvatarImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    setToastMessage({
      type: 'success',
      text: 'Profile photo reset to default campus avatar.',
    })
  }

  // Copy Student ID to clipboard
  const handleCopyStudentId = () => {
    navigator.clipboard.writeText(userProfile.studentId)
    setCopiedId(true)
    setTimeout(() => setCopiedId(false), 2000)
  }

  // Derive monogram initials
  const getInitials = (name) => {
    const parts = name.trim().split(' ')
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    }
    return (name.slice(0, 2) || 'AM').toUpperCase()
  }

  return (
    <div className="profile-layout">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ====================================================================
          Left Navigation Sidebar (Standard User Dashboard)
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
            className="sidebar-nav__item"
            onClick={() => setSidebarOpen(false)}
          >
            <MessageSquare size={18} />
            <span>Feedback</span>
          </Link>

          <div className="sidebar-divider" />

          <Link
            to="/user/profile"
            className="sidebar-nav__item sidebar-nav__item--active"
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
              {avatarImage ? (
                <img
                  src={avatarImage}
                  alt="Avatar"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                />
              ) : (
                getInitials(userProfile.fullName)
              )}
            </div>
            <div className="sidebar-user__info">
              <span className="sidebar-user__name">{userProfile.fullName}</span>
              <span className="sidebar-user__role">{userProfile.role}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ====================================================================
          Main Profile View Container
          ==================================================================== */}
      <div className="profile-main">
        {/* Top Header Bar */}
        <header className="profile-header-bar">
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
              <h1>My Profile 👤</h1>
              <p>Manage your student credentials and campus maintenance contact details.</p>
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
                  aria-expanded={profileDropdownOpen}
                >
                  <div className="profile-avatar-thumb">
                    {avatarImage ? (
                      <img src={avatarImage} alt="Thumb" />
                    ) : (
                      getInitials(userProfile.fullName)
                    )}
                  </div>
                  <span className="profile-menu-name">{userProfile.fullName.split(' ')[0]}</span>
                  <ChevronDown size={14} color="#64748b" />
                </button>

                {profileDropdownOpen && (
                  <div className="profile-dropdown">
                    <div className="profile-dropdown__header">
                      <p className="profile-dropdown__name">{userProfile.fullName}</p>
                      <p className="profile-dropdown__email">{userProfile.email}</p>
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

        {/* Content Body Area */}
        <main className="profile-content">
          {/* Toast Notification Alert */}
          {toastMessage && (
            <div
              className={`profile-toast profile-toast--${toastMessage.type}`}
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
              Hero Profile Header Card
              ================================================================ */}
          <div className="profile-hero">
            <div className="profile-hero__cover">
              <div className="profile-hero__cover-pattern" />
            </div>

            <div className="profile-hero__body">
              <div className="profile-hero__left">
                {/* Avatar with selection, preview & reset */}
                <div className="profile-avatar-container">
                  <div
                    className="profile-avatar"
                    onClick={() => fileInputRef.current?.click()}
                    title="Click to change profile picture"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click()
                    }}
                  >
                    {avatarImage ? (
                      <img src={avatarImage} alt="User Avatar" />
                    ) : (
                      getInitials(userProfile.fullName)
                    )}
                    <div className="avatar-hover-overlay">
                      <Camera size={20} />
                      <span>Change</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="avatar-change-btn"
                    onClick={() => fileInputRef.current?.click()}
                    title="Upload avatar photo"
                    aria-label="Upload avatar image"
                  >
                    <Camera size={15} />
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    className="avatar-hidden-input"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleAvatarFileChange}
                  />
                </div>

                {/* User Meta Information */}
                <div className="profile-hero__meta">
                  <div className="profile-hero__name-row">
                    <h2 className="profile-hero__name">{userProfile.fullName}</h2>
                    <span className="badge-role">
                      <ShieldCheck size={13} />
                      {userProfile.role}
                    </span>
                    <span className="badge-verified">
                      <Sparkles size={12} />
                      Active Student
                    </span>
                  </div>

                  <div className="profile-hero__sub">
                    <div className="profile-hero__sub-item">
                      <Building2 size={15} />
                      <span>{userProfile.department}</span>
                    </div>

                    <div className="profile-hero__sub-item">
                      <span className="id-chip">
                        <span>ID: {userProfile.studentId}</span>
                        <button
                          type="button"
                          className="id-chip-copy"
                          onClick={handleCopyStudentId}
                          title="Copy Student ID"
                          aria-label="Copy student ID"
                        >
                          {copiedId ? (
                            <Check size={13} style={{ color: '#10b981' }} />
                          ) : (
                            <Copy size={13} />
                          )}
                        </button>
                      </span>
                    </div>

                    {avatarImage && (
                      <button
                        type="button"
                        className="btn-reset-avatar"
                        onClick={handleResetAvatar}
                        title="Revert back to default initials avatar"
                      >
                        <RotateCcw size={12} />
                        <span>Reset Photo</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="profile-hero__actions">
                {!editMode ? (
                  <button
                    type="button"
                    className="btn-edit-toggle"
                    onClick={handleStartEditing}
                  >
                    <Edit3 size={16} />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className="btn-cancel-edit"
                      onClick={handleCancelEditing}
                      disabled={isSaving}
                    >
                      <X size={15} />
                      <span>Cancel</span>
                    </button>
                    <button
                      type="button"
                      className="btn-save-profile"
                      onClick={handleSaveChanges}
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Save size={16} />
                          <span>Save Changes</span>
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* ================================================================
              Two-Column Layout: Details / Edit Form & Secondary Info
              ================================================================ */}
          <div className="profile-grid">
            {/* Left Primary Card: Profile Information */}
            <div className="profile-card">
              <div className="profile-card__header">
                <h3 className="profile-card__title">
                  <User size={18} style={{ color: 'var(--primary)' }} />
                  <span>Personal & Academic Information</span>
                </h3>
                {editMode ? (
                  <span style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 600 }}>
                    Editing Mode Active
                  </span>
                ) : (
                  <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
                    Campus Registered Account
                  </span>
                )}
              </div>

              <div className="profile-card__body">
                {!editMode ? (
                  /* ==========================================================
                     Display (Read-Only) Profile Mode
                     ========================================================== */
                  <div className="profile-details-list">
                    <div className="profile-detail-item">
                      <span className="detail-label">
                        <User size={13} />
                        Full Name
                      </span>
                      <span className="detail-val">{userProfile.fullName}</span>
                    </div>

                    <div className="profile-detail-item">
                      <span className="detail-label">
                        <Mail size={13} />
                        Email Address
                      </span>
                      <span className="detail-val">{userProfile.email}</span>
                    </div>

                    <div className="profile-detail-item">
                      <span className="detail-label">
                        <Lock size={13} />
                        Student ID
                      </span>
                      <span className="detail-val" style={{ fontFamily: 'monospace' }}>
                        {userProfile.studentId}
                      </span>
                    </div>

                    <div className="profile-detail-item">
                      <span className="detail-label">
                        <Building2 size={13} />
                        Academic Department
                      </span>
                      <span className="detail-val">{userProfile.department}</span>
                    </div>

                    <div className="profile-detail-item">
                      <span className="detail-label">
                        <Phone size={13} />
                        Phone Number
                      </span>
                      <span className="detail-val">{userProfile.phoneNumber}</span>
                    </div>

                    <div className="profile-detail-item">
                      <span className="detail-label">
                        <Calendar size={13} />
                        Account Created
                      </span>
                      <span className="detail-val">{userProfile.accountCreatedDate}</span>
                    </div>

                    <div className="profile-detail-item">
                      <span className="detail-label">
                        <ShieldCheck size={13} />
                        Account Role
                      </span>
                      <span className="detail-val">
                        <span className="badge-role">{userProfile.role}</span>
                      </span>
                    </div>

                    <div className="profile-detail-item">
                      <span className="detail-label">
                        <Building2 size={13} />
                        Campus Residence
                      </span>
                      <span className="detail-val detail-val--sub">{userProfile.residence}</span>
                    </div>

                    <div className="profile-detail-item profile-detail-item--full">
                      <span className="detail-label">
                        <Phone size={13} />
                        Emergency Guardian Contact
                      </span>
                      <span className="detail-val detail-val--sub">
                        {userProfile.emergencyContact}
                      </span>
                    </div>
                  </div>
                ) : (
                  /* ==========================================================
                     Interactive Editable Form Mode
                     ========================================================== */
                  <form onSubmit={handleSaveChanges} className="profile-edit-form" noValidate>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="fullName" className="form-label">
                          <span>
                            Full Name <span className="required-star">*</span>
                          </span>
                        </label>
                        <div className="form-input-wrap">
                          <User size={16} className="input-icon-lead" />
                          <input
                            id="fullName"
                            type="text"
                            className={`form-input ${errors.fullName ? 'form-input--error' : ''}`}
                            value={formData.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            placeholder="Enter full name"
                          />
                        </div>
                        {errors.fullName && (
                          <div className="field-error-msg" role="alert">
                            <AlertCircle size={13} />
                            <span>{errors.fullName}</span>
                          </div>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="email" className="form-label">
                          <span>
                            Campus Email <span className="required-star">*</span>
                          </span>
                        </label>
                        <div className="form-input-wrap">
                          <Mail size={16} className="input-icon-lead" />
                          <input
                            id="email"
                            type="email"
                            className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="name@campus.edu"
                          />
                        </div>
                        {errors.email && (
                          <div className="field-error-msg" role="alert">
                            <AlertCircle size={13} />
                            <span>{errors.email}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="phoneNumber" className="form-label">
                          <span>
                            Phone Number <span className="required-star">*</span>
                          </span>
                        </label>
                        <div className="form-input-wrap">
                          <Phone size={16} className="input-icon-lead" />
                          <input
                            id="phoneNumber"
                            type="tel"
                            className={`form-input ${errors.phoneNumber ? 'form-input--error' : ''}`}
                            value={formData.phoneNumber}
                            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                        {errors.phoneNumber && (
                          <div className="field-error-msg" role="alert">
                            <AlertCircle size={13} />
                            <span>{errors.phoneNumber}</span>
                          </div>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="department" className="form-label">
                          <span>
                            Department <span className="required-star">*</span>
                          </span>
                        </label>
                        <div className="form-input-wrap">
                          <Building2 size={16} className="input-icon-lead" />
                          <select
                            id="department"
                            className={`form-input ${errors.department ? 'form-input--error' : ''}`}
                            value={formData.department}
                            onChange={(e) => handleInputChange('department', e.target.value)}
                            style={{ appearance: 'auto' }}
                          >
                            {DEPARTMENTS.map((dept) => (
                              <option key={dept} value={dept}>
                                {dept}
                              </option>
                            ))}
                          </select>
                        </div>
                        {errors.department && (
                          <div className="field-error-msg" role="alert">
                            <AlertCircle size={13} />
                            <span>{errors.department}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="studentId" className="form-label">
                          <span>Student ID (Locked)</span>
                        </label>
                        <div className="form-input-wrap">
                          <Lock size={16} className="input-icon-lead" />
                          <input
                            id="studentId"
                            type="text"
                            className="form-input"
                            value={formData.studentId}
                            disabled
                            readOnly
                          />
                        </div>
                        <span className="field-hint">
                          Official university student registration code cannot be self-modified.
                        </span>
                      </div>

                      <div className="form-group">
                        <label htmlFor="residence" className="form-label">
                          <span>Campus Residence / Room</span>
                        </label>
                        <div className="form-input-wrap">
                          <Building2 size={16} className="input-icon-lead" />
                          <input
                            id="residence"
                            type="text"
                            className="form-input"
                            value={formData.residence}
                            onChange={(e) => handleInputChange('residence', e.target.value)}
                            placeholder="e.g. Hostel Block A, Room 204"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="emergencyContact" className="form-label">
                        <span>Emergency Guardian Contact</span>
                      </label>
                      <div className="form-input-wrap">
                        <Phone size={16} className="input-icon-lead" />
                        <input
                          id="emergencyContact"
                          type="text"
                          className="form-input"
                          value={formData.emergencyContact}
                          onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                          placeholder="e.g. +1 (555) 309-8812 (Guardian)"
                        />
                      </div>
                    </div>

                    <div className="form-actions-bar">
                      <button
                        type="button"
                        className="btn-cancel-edit"
                        onClick={handleCancelEditing}
                        disabled={isSaving}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn-save-profile"
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            <span>Saving Changes...</span>
                          </>
                        ) : (
                          <>
                            <Save size={16} />
                            <span>Save Profile</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Right Column: Campus Identity Card & Statistics */}
            <div className="profile-side-column">
              {/* Campus Virtual ID Card */}
              <div className="campus-id-card">
                <div className="campus-id-pattern" />
                <div className="campus-id-top">
                  <span className="campus-id-logo">
                    <Wrench size={16} />
                    <span>FixIt Campus Pass</span>
                  </span>
                  <span className="campus-id-role">Student</span>
                </div>

                <div className="campus-id-name">{userProfile.fullName}</div>
                <div className="campus-id-dept">{userProfile.department}</div>

                <div className="campus-id-footer">
                  <div>
                    <span style={{ display: 'block', fontSize: '0.65rem', opacity: 0.8 }}>
                      STUDENT ID
                    </span>
                    <span className="campus-id-barcode">{userProfile.studentId}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ display: 'block', fontSize: '0.65rem', opacity: 0.8 }}>
                      ENROLLED
                    </span>
                    <span>{userProfile.accountCreatedDate.split(',')[1] || '2024'}</span>
                  </div>
                </div>
              </div>

              {/* Maintenance Activity Mini Stats */}
              <div className="profile-card">
                <div className="profile-card__header">
                  <h4 className="profile-card__title">
                    <Sparkles size={16} style={{ color: '#0284c7' }} />
                    <span>Maintenance Activity</span>
                  </h4>
                </div>
                <div className="profile-card__body">
                  <div className="stats-mini-grid">
                    <div className="stat-mini-box">
                      <span className="stat-mini-num">24</span>
                      <span className="stat-mini-label">Total Logged</span>
                    </div>
                    <div className="stat-mini-box">
                      <span className="stat-mini-num" style={{ color: '#059669' }}>
                        10
                      </span>
                      <span className="stat-mini-label">Resolved</span>
                    </div>
                    <div className="stat-mini-box">
                      <span className="stat-mini-num" style={{ color: '#2563eb' }}>
                        6
                      </span>
                      <span className="stat-mini-label">In Progress</span>
                    </div>
                    <div className="stat-mini-box">
                      <span className="stat-mini-num" style={{ color: '#eab308' }}>
                        3
                      </span>
                      <span className="stat-mini-label">Reviews Sent</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Security Quick Links */}
              <div className="profile-card">
                <div className="profile-card__header">
                  <h4 className="profile-card__title">
                    <ShieldCheck size={16} style={{ color: '#16a34a' }} />
                    <span>Security & Access</span>
                  </h4>
                </div>
                <div className="profile-card__body">
                  <div className="security-links-list">
                    <Link to="/forgot-password" className="security-link-item">
                      <div className="security-link-info">
                        <Lock size={15} color="var(--primary)" />
                        <span>Reset Account Password</span>
                      </div>
                      <ChevronDown size={14} style={{ transform: 'rotate(-90deg)' }} />
                    </Link>

                    <Link to="/user/notifications" className="security-link-item">
                      <div className="security-link-info">
                        <Bell size={15} color="#0284c7" />
                        <span>Notification Preferences</span>
                      </div>
                      <ChevronDown size={14} style={{ transform: 'rotate(-90deg)' }} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default UserProfile
