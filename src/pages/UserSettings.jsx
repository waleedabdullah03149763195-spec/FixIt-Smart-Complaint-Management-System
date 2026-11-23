import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertCircle,
  Bell,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Eye,
  EyeOff,
  FileText,
  Globe,
  KeyRound,
  LayoutDashboard,
  Loader2,
  Lock,
  LogOut,
  Menu,
  MessageSquare,
  Moon,
  PlusCircle,
  RotateCcw,
  Save,
  Settings,
  ShieldCheck,
  Sliders,
  Sun,
  SunMoon,
  User,
  Wrench,
  X,
} from 'lucide-react'
import './UserSettings.css'

// Default mock settings configuration
const DEFAULT_SETTINGS = {
  // 1. Account Preferences
  language: 'en-US',
  timeZone: 'UTC-05:00',
  dateFormat: 'MM/DD/YYYY',
  defaultBuilding: 'Hostel Block A',
  autoRefreshComplaints: true,

  // 2. Notification Preferences
  emailNotifications: true,
  statusUpdateAlerts: true,
  technicianAssignmentAlerts: true,
  feedbackReminders: true,
  campusBroadcasts: false,

  // 3. Appearance
  theme: 'light', // 'light' | 'dark' | 'system'
  density: 'comfortable', // 'comfortable' | 'compact'
  reducedAnimations: false,

  // 4. Privacy
  profileVisibility: 'technicians', // 'technicians' | 'hostel' | 'private'
  sharePhoneOnDispatch: true,
  allowCampusSurveys: true,
  anonymousFeedbackByDefault: false,
}

const LANGUAGES = [
  { code: 'en-US', name: 'English (United States)' },
  { code: 'en-GB', name: 'English (United Kingdom)' },
  { code: 'es-ES', name: 'Español (Spanish)' },
  { code: 'fr-FR', name: 'Français (French)' },
  { code: 'de-DE', name: 'Deutsch (German)' },
  { code: 'ur-PK', name: 'اردو (Urdu)' },
]

const TIMEZONES = [
  { code: 'UTC-08:00', name: '(UTC-08:00) Pacific Time (US & Canada)' },
  { code: 'UTC-05:00', name: '(UTC-05:00) Eastern Time (US & Canada)' },
  { code: 'UTC+00:00', name: '(UTC+00:00) UTC / Greenwich Mean Time' },
  { code: 'UTC+01:00', name: '(UTC+01:00) Central European Time' },
  { code: 'UTC+05:00', name: '(UTC+05:00) Islamabad, Karachi, Tashkent' },
  { code: 'UTC+05:30', name: '(UTC+05:30) Mumbai, New Delhi, Kolkata' },
  { code: 'UTC+08:00', name: '(UTC+08:00) Singapore, Beijing, Perth' },
]

const CAMPUS_BUILDINGS = [
  'Hostel Block A',
  'Hostel Block B',
  'Academic Complex (CS & Engineering)',
  'Central Library',
  'Science Laboratories',
  'Campus Student Center',
  'Sports Arena & Gymnasium',
]

function UserSettings() {
  // Navigation & UI state
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('account') // 'account' | 'notifications' | 'appearance' | 'privacy' | 'security'
  const [toastMessage, setToastMessage] = useState(null)
  const [isSaving, setIsSaving] = useState(false)

  // Settings state (Committed vs Working)
  const [savedSettings, setSavedSettings] = useState(DEFAULT_SETTINGS)
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)

  // Password change demo form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [passwordErrors, setPasswordErrors] = useState({})
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)

  // Handle generic setting update
  const updateSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  // Toggle boolean setting
  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  // Save changes handler
  const handleSaveAllSettings = () => {
    setIsSaving(true)

    // Simulate mock save latency
    setTimeout(() => {
      setSavedSettings({ ...settings })
      setIsSaving(false)
      setToastMessage({
        type: 'success',
        text: 'All settings and preferences have been updated successfully!',
      })
    }, 600)
  }

  // Reset to defaults
  const handleResetToDefaults = () => {
    setSettings({ ...DEFAULT_SETTINGS })
    setToastMessage({
      type: 'info',
      text: 'Settings restored to factory campus defaults. Click "Save Changes" to apply.',
    })
  }

  // Cancel pending changes
  const handleCancelPending = () => {
    setSettings({ ...savedSettings })
    setToastMessage({
      type: 'info',
      text: 'Pending changes reverted to last saved configuration.',
    })
  }

  // Password form validation & submission
  const validatePasswordForm = () => {
    const errors = {}

    if (!passwordForm.currentPassword) {
      errors.currentPassword = 'Enter your existing campus password.'
    }

    if (!passwordForm.newPassword) {
      errors.newPassword = 'New password is required.'
    } else if (passwordForm.newPassword.length < 6) {
      errors.newPassword = 'New password must contain at least 6 characters.'
    }

    if (!passwordForm.confirmPassword) {
      errors.confirmPassword = 'Confirm your new password.'
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.'
    }

    return errors
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    const errors = validatePasswordForm()

    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors)
      return
    }

    setIsUpdatingPassword(true)
    setPasswordErrors({})

    setTimeout(() => {
      setIsUpdatingPassword(false)
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
      setToastMessage({
        type: 'success',
        text: 'Security credentials updated! Your demo password was changed successfully.',
      })
    }, 700)
  }

  // Calculate password strength
  const getPasswordStrength = (pwd) => {
    if (!pwd) return 0
    let score = 0
    if (pwd.length >= 6) score += 1
    if (pwd.length >= 10) score += 1
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) score += 1
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1
    return Math.min(score, 3)
  }

  const pwdStrength = getPasswordStrength(passwordForm.newPassword)

  return (
    <div className="settings-layout">
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
            className="sidebar-nav__item"
            onClick={() => setSidebarOpen(false)}
          >
            <User size={18} />
            <span>My Profile</span>
          </Link>

          <Link
            to="/user/settings"
            className="sidebar-nav__item sidebar-nav__item--active"
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
          Main Content Container
          ==================================================================== */}
      <div className="settings-main">
        {/* Top Header Bar */}
        <header className="settings-header-bar">
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
              <h1>Settings & Preferences ⚙️</h1>
              <p>Configure account localization, alerts, security, and privacy.</p>
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
                  <div className="profile-avatar-thumb">AM</div>
                  <span className="profile-menu-name">Alex</span>
                  <ChevronDown size={14} color="#64748b" />
                </button>

                {profileDropdownOpen && (
                  <div className="profile-dropdown">
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
                      to="/user/settings"
                      className="profile-dropdown__item"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <Settings size={15} />
                      <span>Account Settings</span>
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
        <main className="settings-content">
          {/* Toast Notification Alert */}
          {toastMessage && (
            <div
              className={`profile-toast profile-toast--${
                toastMessage.type === 'error' ? 'error' : 'success'
              }`}
              role="status"
              aria-live="polite"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                {toastMessage.type === 'error' ? (
                  <AlertCircle size={18} />
                ) : (
                  <CheckCircle2 size={18} />
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

          {/* Quick Jump Navigation Tabs */}
          <div className="settings-tabs-bar" role="tablist" aria-label="Settings sections">
            <button
              type="button"
              className={`settings-tab-btn ${
                activeTab === 'account' ? 'settings-tab-btn--active' : ''
              }`}
              onClick={() => setActiveTab('account')}
              role="tab"
              aria-selected={activeTab === 'account'}
            >
              <Globe size={15} />
              <span>Account Preferences</span>
            </button>

            <button
              type="button"
              className={`settings-tab-btn ${
                activeTab === 'notifications' ? 'settings-tab-btn--active' : ''
              }`}
              onClick={() => setActiveTab('notifications')}
              role="tab"
              aria-selected={activeTab === 'notifications'}
            >
              <Bell size={15} />
              <span>Notification Alerts</span>
            </button>

            <button
              type="button"
              className={`settings-tab-btn ${
                activeTab === 'appearance' ? 'settings-tab-btn--active' : ''
              }`}
              onClick={() => setActiveTab('appearance')}
              role="tab"
              aria-selected={activeTab === 'appearance'}
            >
              <SunMoon size={15} />
              <span>Appearance & Display</span>
            </button>

            <button
              type="button"
              className={`settings-tab-btn ${
                activeTab === 'privacy' ? 'settings-tab-btn--active' : ''
              }`}
              onClick={() => setActiveTab('privacy')}
              role="tab"
              aria-selected={activeTab === 'privacy'}
            >
              <ShieldCheck size={15} />
              <span>Privacy & Visibility</span>
            </button>

            <button
              type="button"
              className={`settings-tab-btn ${
                activeTab === 'security' ? 'settings-tab-btn--active' : ''
              }`}
              onClick={() => setActiveTab('security')}
              role="tab"
              aria-selected={activeTab === 'security'}
            >
              <KeyRound size={15} />
              <span>Security & Account</span>
            </button>
          </div>

          {/* ================================================================
              SECTION 1: Account Preferences
              ================================================================ */}
          {(activeTab === 'account' || activeTab === 'all') && (
            <div className="settings-section-card" id="section-account">
              <div className="settings-card__header">
                <div className="settings-card__header-left">
                  <h3 className="settings-card__title">
                    <Globe size={18} style={{ color: 'var(--primary)' }} />
                    <span>Account Preferences & Localization</span>
                  </h3>
                  <p className="settings-card__desc">
                    Manage regional language, time zone alignment, and default campus location.
                  </p>
                </div>
              </div>

              <div className="settings-card__body">
                <div className="settings-form-grid">
                  <div className="settings-form-group">
                    <label htmlFor="pref-language" className="settings-label">
                      <Globe size={14} />
                      <span>Interface Language</span>
                    </label>
                    <select
                      id="pref-language"
                      className="settings-select"
                      value={settings.language}
                      onChange={(e) => updateSetting('language', e.target.value)}
                    >
                      {LANGUAGES.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.name}
                        </option>
                      ))}
                    </select>
                    <span className="settings-hint">
                      Applied across user dashboard prompts and notifications.
                    </span>
                  </div>

                  <div className="settings-form-group">
                    <label htmlFor="pref-timezone" className="settings-label">
                      <Clock size={14} />
                      <span>Time Zone</span>
                    </label>
                    <select
                      id="pref-timezone"
                      className="settings-select"
                      value={settings.timeZone}
                      onChange={(e) => updateSetting('timeZone', e.target.value)}
                    >
                      {TIMEZONES.map((tz) => (
                        <option key={tz.code} value={tz.code}>
                          {tz.name}
                        </option>
                      ))}
                    </select>
                    <span className="settings-hint">
                      Used for complaint timestamps and estimated completion schedules.
                    </span>
                  </div>

                  <div className="settings-form-group">
                    <label htmlFor="pref-dateformat" className="settings-label">
                      <Calendar size={14} />
                      <span>Date Display Format</span>
                    </label>
                    <select
                      id="pref-dateformat"
                      className="settings-select"
                      value={settings.dateFormat}
                      onChange={(e) => updateSetting('dateFormat', e.target.value)}
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY (e.g. 11/23/2026)</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY (e.g. 23/11/2026)</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD (ISO standard)</option>
                    </select>
                  </div>

                  <div className="settings-form-group">
                    <label htmlFor="pref-building" className="settings-label">
                      <Building2 size={14} />
                      <span>Default Campus Building</span>
                    </label>
                    <select
                      id="pref-building"
                      className="settings-select"
                      value={settings.defaultBuilding}
                      onChange={(e) => updateSetting('defaultBuilding', e.target.value)}
                    >
                      {CAMPUS_BUILDINGS.map((bld) => (
                        <option key={bld} value={bld}>
                          {bld}
                        </option>
                      ))}
                    </select>
                    <span className="settings-hint">
                      Pre-fills the location field when submitting a new complaint.
                    </span>
                  </div>
                </div>

                <div className="toggle-items-list" style={{ marginTop: '0.5rem' }}>
                  <div className="toggle-item">
                    <div className="toggle-item-info">
                      <span className="toggle-item-title">
                        <RotateCcw size={15} />
                        Auto-refresh Complaint Lists
                      </span>
                      <span className="toggle-item-desc">
                        Automatically fetch new technician log remarks and status changes every 2
                        minutes without reloading the browser.
                      </span>
                    </div>
                    <label className="switch-control" aria-label="Auto-refresh complaint lists">
                      <input
                        type="checkbox"
                        checked={settings.autoRefreshComplaints}
                        onChange={() => toggleSetting('autoRefreshComplaints')}
                      />
                      <span className="switch-slider" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================
              SECTION 2: Notification Preferences
              ================================================================ */}
          {(activeTab === 'notifications' || activeTab === 'all') && (
            <div className="settings-section-card" id="section-notifications">
              <div className="settings-card__header">
                <div className="settings-card__header-left">
                  <h3 className="settings-card__title">
                    <Bell size={18} style={{ color: '#0284c7' }} />
                    <span>Notification & Alert Preferences</span>
                  </h3>
                  <p className="settings-card__desc">
                    Choose what alerts and campus announcements you wish to receive.
                  </p>
                </div>
              </div>

              <div className="settings-card__body">
                <div className="toggle-items-list">
                  <div className="toggle-item">
                    <div className="toggle-item-info">
                      <span className="toggle-item-title">Email Notifications</span>
                      <span className="toggle-item-desc">
                        Receive instant email notifications to alex.morgan@campus.edu whenever an
                        action is taken on your logged tickets.
                      </span>
                    </div>
                    <label className="switch-control" aria-label="Email Notifications">
                      <input
                        type="checkbox"
                        checked={settings.emailNotifications}
                        onChange={() => toggleSetting('emailNotifications')}
                      />
                      <span className="switch-slider" />
                    </label>
                  </div>

                  <div className="toggle-item">
                    <div className="toggle-item-info">
                      <span className="toggle-item-title">Complaint Status Updates</span>
                      <span className="toggle-item-desc">
                        Get notified when complaints move between stages (e.g., Submitted → Under
                        Review → In Progress → Resolved).
                      </span>
                    </div>
                    <label className="switch-control" aria-label="Complaint Status Updates">
                      <input
                        type="checkbox"
                        checked={settings.statusUpdateAlerts}
                        onChange={() => toggleSetting('statusUpdateAlerts')}
                      />
                      <span className="switch-slider" />
                    </label>
                  </div>

                  <div className="toggle-item">
                    <div className="toggle-item-info">
                      <span className="toggle-item-title">Technician Assignment Alerts</span>
                      <span className="toggle-item-desc">
                        Receive immediate notice with technician contact info and expected arrival
                        window when a work order is dispatched.
                      </span>
                    </div>
                    <label className="switch-control" aria-label="Technician Assignment Alerts">
                      <input
                        type="checkbox"
                        checked={settings.technicianAssignmentAlerts}
                        onChange={() => toggleSetting('technicianAssignmentAlerts')}
                      />
                      <span className="switch-slider" />
                    </label>
                  </div>

                  <div className="toggle-item">
                    <div className="toggle-item-info">
                      <span className="toggle-item-title">Feedback & Review Reminders</span>
                      <span className="toggle-item-desc">
                        Send gentle reminders to rate completed maintenance work and review campus
                        facility staff conduct.
                      </span>
                    </div>
                    <label className="switch-control" aria-label="Feedback Reminders">
                      <input
                        type="checkbox"
                        checked={settings.feedbackReminders}
                        onChange={() => toggleSetting('feedbackReminders')}
                      />
                      <span className="switch-slider" />
                    </label>
                  </div>

                  <div className="toggle-item">
                    <div className="toggle-item-info">
                      <span className="toggle-item-title">Campus Maintenance Broadcasts</span>
                      <span className="toggle-item-desc">
                        Receive alerts regarding scheduled campus power shutdowns, elevator
                        servicing, or water pipeline repairs.
                      </span>
                    </div>
                    <label className="switch-control" aria-label="Campus Maintenance Broadcasts">
                      <input
                        type="checkbox"
                        checked={settings.campusBroadcasts}
                        onChange={() => toggleSetting('campusBroadcasts')}
                      />
                      <span className="switch-slider" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================
              SECTION 3: Appearance & Display
              ================================================================ */}
          {(activeTab === 'appearance' || activeTab === 'all') && (
            <div className="settings-section-card" id="section-appearance">
              <div className="settings-card__header">
                <div className="settings-card__header-left">
                  <h3 className="settings-card__title">
                    <SunMoon size={18} style={{ color: '#d97706' }} />
                    <span>Appearance & Visual Theme</span>
                  </h3>
                  <p className="settings-card__desc">
                    Customize your visual environment, card density, and interface aesthetics.
                  </p>
                </div>
              </div>

              <div className="settings-card__body">
                <div>
                  <label className="settings-label" style={{ marginBottom: '0.75rem' }}>
                    <span>Theme Preference</span>
                  </label>
                  <div className="theme-selector-grid">
                    {/* Light Theme */}
                    <div
                      className={`theme-card ${
                        settings.theme === 'light' ? 'theme-card--active' : ''
                      }`}
                      onClick={() => updateSetting('theme', 'light')}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="theme-card-preview theme-card-preview--light">
                        <div className="preview-bar-1" />
                        <div className="preview-bar-2" />
                        <div className="preview-bar-3" />
                      </div>
                      <div className="theme-card-meta">
                        <span className="theme-card-title">
                          <Sun size={15} style={{ color: '#f59e0b' }} />
                          <span>Light Mode</span>
                        </span>
                        {settings.theme === 'light' && (
                          <span className="theme-card-check">
                            <Check size={12} strokeWidth={3} />
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Dark Theme */}
                    <div
                      className={`theme-card ${
                        settings.theme === 'dark' ? 'theme-card--active' : ''
                      }`}
                      onClick={() => updateSetting('theme', 'dark')}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="theme-card-preview theme-card-preview--dark">
                        <div className="preview-bar-1" />
                        <div className="preview-bar-2" />
                        <div className="preview-bar-3" />
                      </div>
                      <div className="theme-card-meta">
                        <span className="theme-card-title">
                          <Moon size={15} style={{ color: '#38bdf8' }} />
                          <span>Dark Night</span>
                        </span>
                        {settings.theme === 'dark' && (
                          <span className="theme-card-check">
                            <Check size={12} strokeWidth={3} />
                          </span>
                        )}
                      </div>
                    </div>

                    {/* System Theme */}
                    <div
                      className={`theme-card ${
                        settings.theme === 'system' ? 'theme-card--active' : ''
                      }`}
                      onClick={() => updateSetting('theme', 'system')}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="theme-card-preview theme-card-preview--system">
                        <div className="preview-bar-1" />
                        <div className="preview-bar-2" />
                        <div className="preview-bar-3" />
                      </div>
                      <div className="theme-card-meta">
                        <span className="theme-card-title">
                          <SunMoon size={15} style={{ color: '#6366f1' }} />
                          <span>System Default</span>
                        </span>
                        {settings.theme === 'system' && (
                          <span className="theme-card-check">
                            <Check size={12} strokeWidth={3} />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '0.5rem' }}>
                  <label className="settings-label" style={{ marginBottom: '0.65rem' }}>
                    <Sliders size={14} />
                    <span>Card & Table Density</span>
                  </label>
                  <div className="density-options-row">
                    <label
                      className={`density-option-label ${
                        settings.density === 'comfortable' ? 'density-option-label--active' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="density"
                        value="comfortable"
                        checked={settings.density === 'comfortable'}
                        onChange={() => updateSetting('density', 'comfortable')}
                      />
                      <span>Comfortable (Standard spacing with clear breathing room)</span>
                    </label>

                    <label
                      className={`density-option-label ${
                        settings.density === 'compact' ? 'density-option-label--active' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="density"
                        value="compact"
                        checked={settings.density === 'compact'}
                        onChange={() => updateSetting('density', 'compact')}
                      />
                      <span>Compact (Higher information density for desktop data view)</span>
                    </label>
                  </div>
                </div>

                <div className="toggle-items-list" style={{ marginTop: '0.5rem' }}>
                  <div className="toggle-item">
                    <div className="toggle-item-info">
                      <span className="toggle-item-title">Reduced Animations</span>
                      <span className="toggle-item-desc">
                        Minimizes transition and motion effects across tables, modals, and dropdowns.
                      </span>
                    </div>
                    <label className="switch-control" aria-label="Reduced Animations">
                      <input
                        type="checkbox"
                        checked={settings.reducedAnimations}
                        onChange={() => toggleSetting('reducedAnimations')}
                      />
                      <span className="switch-slider" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================
              SECTION 4: Privacy & Visibility
              ================================================================ */}
          {(activeTab === 'privacy' || activeTab === 'all') && (
            <div className="settings-section-card" id="section-privacy">
              <div className="settings-card__header">
                <div className="settings-card__header-left">
                  <h3 className="settings-card__title">
                    <ShieldCheck size={18} style={{ color: '#16a34a' }} />
                    <span>Privacy & Profile Visibility</span>
                  </h3>
                  <p className="settings-card__desc">
                    Control who can view your contact details and campus maintenance history.
                  </p>
                </div>
              </div>

              <div className="settings-card__body">
                <div className="settings-form-group">
                  <label htmlFor="pref-visibility" className="settings-label">
                    <span>Profile Visibility Scope</span>
                  </label>
                  <select
                    id="pref-visibility"
                    className="settings-select"
                    value={settings.profileVisibility}
                    onChange={(e) => updateSetting('profileVisibility', e.target.value)}
                  >
                    <option value="technicians">
                      Public to Dispatched Technicians & Facility Admin Staff (Recommended)
                    </option>
                    <option value="hostel">
                      Hostel Residents & Dormitory Wardens Only
                    </option>
                    <option value="private">
                      Strictly Confidential (Chief Facility Director Only)
                    </option>
                  </select>
                  <span className="settings-hint">
                    Determines who can see your registered room number and student ID when handling tickets.
                  </span>
                </div>

                <div className="toggle-items-list" style={{ marginTop: '0.5rem' }}>
                  <div className="toggle-item">
                    <div className="toggle-item-info">
                      <span className="toggle-item-title">
                        Display Contact Number on Dispatched Tickets
                      </span>
                      <span className="toggle-item-desc">
                        Allows assigned maintenance specialists to call or SMS you before entering
                        your hostel room or lab.
                      </span>
                    </div>
                    <label className="switch-control" aria-label="Display contact number">
                      <input
                        type="checkbox"
                        checked={settings.sharePhoneOnDispatch}
                        onChange={() => toggleSetting('sharePhoneOnDispatch')}
                      />
                      <span className="switch-slider" />
                    </label>
                  </div>

                  <div className="toggle-item">
                    <div className="toggle-item-info">
                      <span className="toggle-item-title">
                        Submit Reviews & Feedback Anonymously by Default
                      </span>
                      <span className="toggle-item-desc">
                        Hide your name from ratings left for campus service technicians.
                      </span>
                    </div>
                    <label className="switch-control" aria-label="Anonymous reviews">
                      <input
                        type="checkbox"
                        checked={settings.anonymousFeedbackByDefault}
                        onChange={() => toggleSetting('anonymousFeedbackByDefault')}
                      />
                      <span className="switch-slider" />
                    </label>
                  </div>

                  <div className="toggle-item">
                    <div className="toggle-item-info">
                      <span className="toggle-item-title">
                        Campus Maintenance Quality Surveys
                      </span>
                      <span className="toggle-item-desc">
                        Participate in end-of-semester campus facility satisfaction questionnaires.
                      </span>
                    </div>
                    <label className="switch-control" aria-label="Campus quality surveys">
                      <input
                        type="checkbox"
                        checked={settings.allowCampusSurveys}
                        onChange={() => toggleSetting('allowCampusSurveys')}
                      />
                      <span className="switch-slider" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================
              SECTION 5: Security & Account
              ================================================================ */}
          {(activeTab === 'security' || activeTab === 'all') && (
            <div className="settings-section-card" id="section-security">
              <div className="settings-card__header">
                <div className="settings-card__header-left">
                  <h3 className="settings-card__title">
                    <KeyRound size={18} style={{ color: '#dc2626' }} />
                    <span>Security & Account Access</span>
                  </h3>
                  <p className="settings-card__desc">
                    Update your account authentication credentials and manage active sessions.
                  </p>
                </div>
              </div>

              <div className="settings-card__body">
                {/* Change Password Demo Form */}
                <div
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1.5rem',
                  }}
                >
                  <div className="password-box-header">
                    <Lock size={16} style={{ color: 'var(--navy)' }} />
                    <h4>Change Account Password</h4>
                  </div>
                  <p className="password-box-desc">
                    Demo security form. Update your password with validation and instant feedback.
                  </p>

                  <form onSubmit={handlePasswordSubmit} noValidate>
                    <div className="settings-form-grid">
                      {/* Current Password */}
                      <div className="settings-form-group">
                        <label htmlFor="currentPassword" className="settings-label">
                          <span>Current Password</span>
                        </label>
                        <div className="password-input-wrap">
                          <input
                            id="currentPassword"
                            type={showPassword.current ? 'text' : 'password'}
                            className={`settings-input ${
                              passwordErrors.currentPassword ? 'settings-input--error' : ''
                            }`}
                            value={passwordForm.currentPassword}
                            onChange={(e) =>
                              setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                            }
                            placeholder="••••••••••••"
                          />
                          <button
                            type="button"
                            className="password-toggle-btn"
                            onClick={() =>
                              setShowPassword((p) => ({ ...p, current: !p.current }))
                            }
                            aria-label="Toggle current password visibility"
                          >
                            {showPassword.current ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                        {passwordErrors.currentPassword && (
                          <div className="field-error-msg">
                            <AlertCircle size={13} />
                            <span>{passwordErrors.currentPassword}</span>
                          </div>
                        )}
                      </div>

                      {/* New Password */}
                      <div className="settings-form-group">
                        <label htmlFor="newPassword" className="settings-label">
                          <span>New Password</span>
                        </label>
                        <div className="password-input-wrap">
                          <input
                            id="newPassword"
                            type={showPassword.new ? 'text' : 'password'}
                            className={`settings-input ${
                              passwordErrors.newPassword ? 'settings-input--error' : ''
                            }`}
                            value={passwordForm.newPassword}
                            onChange={(e) =>
                              setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                            }
                            placeholder="At least 6 characters"
                          />
                          <button
                            type="button"
                            className="password-toggle-btn"
                            onClick={() => setShowPassword((p) => ({ ...p, new: !p.new }))}
                            aria-label="Toggle new password visibility"
                          >
                            {showPassword.new ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>

                        {/* Password strength bar */}
                        {passwordForm.newPassword && (
                          <div className="password-strength-bar">
                            <div
                              className={`strength-segment ${
                                pwdStrength >= 1 ? 'strength-segment--active-weak' : ''
                              }`}
                            />
                            <div
                              className={`strength-segment ${
                                pwdStrength >= 2 ? 'strength-segment--active-med' : ''
                              }`}
                            />
                            <div
                              className={`strength-segment ${
                                pwdStrength >= 3 ? 'strength-segment--active-strong' : ''
                              }`}
                            />
                          </div>
                        )}

                        {passwordErrors.newPassword && (
                          <div className="field-error-msg">
                            <AlertCircle size={13} />
                            <span>{passwordErrors.newPassword}</span>
                          </div>
                        )}
                      </div>

                      {/* Confirm New Password */}
                      <div className="settings-form-group settings-form-group--full">
                        <label htmlFor="confirmPassword" className="settings-label">
                          <span>Confirm New Password</span>
                        </label>
                        <div className="password-input-wrap">
                          <input
                            id="confirmPassword"
                            type={showPassword.confirm ? 'text' : 'password'}
                            className={`settings-input ${
                              passwordErrors.confirmPassword ? 'settings-input--error' : ''
                            }`}
                            value={passwordForm.confirmPassword}
                            onChange={(e) =>
                              setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                            }
                            placeholder="Re-type new password"
                          />
                          <button
                            type="button"
                            className="password-toggle-btn"
                            onClick={() =>
                              setShowPassword((p) => ({ ...p, confirm: !p.confirm }))
                            }
                            aria-label="Toggle confirm password visibility"
                          >
                            {showPassword.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                        {passwordErrors.confirmPassword && (
                          <div className="field-error-msg">
                            <AlertCircle size={13} />
                            <span>{passwordErrors.confirmPassword}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="password-actions-row">
                      <button
                        type="submit"
                        className="btn-update-pwd"
                        disabled={isUpdatingPassword}
                      >
                        {isUpdatingPassword ? (
                          <>
                            <Loader2 size={15} className="animate-spin" />
                            <span>Updating Password...</span>
                          </>
                        ) : (
                          <>
                            <KeyRound size={15} />
                            <span>Update Password</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Logout Banner */}
                <div className="logout-banner-card">
                  <div className="logout-banner-info">
                    <span className="logout-banner-title">
                      <LogOut size={16} />
                      Active Student Session
                    </span>
                    <span className="logout-banner-desc">
                      Currently logged in as Alex Morgan on Windows • Chrome Browser. Sign out to end your session.
                    </span>
                  </div>

                  <Link to="/login" className="btn-logout-confirm">
                    <LogOut size={15} />
                    <span>Sign Out of FixIt</span>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================
              Sticky Global Actions Bar (Save Changes, Reset, Cancel)
              ================================================================ */}
          <div className="settings-action-bar">
            <div className="settings-action-bar__left">
              <CheckCircle2 size={16} style={{ color: '#10b981' }} />
              <span>Settings changes are applied immediately to your local demo state.</span>
            </div>

            <div className="settings-action-bar__right">
              <button
                type="button"
                className="btn-settings-cancel"
                onClick={handleCancelPending}
                disabled={isSaving}
              >
                <X size={15} />
                <span>Cancel</span>
              </button>

              <button
                type="button"
                className="btn-settings-reset"
                onClick={handleResetToDefaults}
                disabled={isSaving}
                title="Restore initial system defaults"
              >
                <RotateCcw size={15} />
                <span>Reset to Defaults</span>
              </button>

              <button
                type="button"
                className="btn-settings-save"
                onClick={handleSaveAllSettings}
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
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default UserSettings
