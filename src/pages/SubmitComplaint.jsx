import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertCircle,
  ArrowLeft,
  Check,
  CheckCircle2,
  Copy,
  File,
  FileText,
  Loader2,
  PlusCircle,
  Send,
  UploadCloud,
  Wrench,
  X,
} from 'lucide-react'
import './SubmitComplaint.css'

const CATEGORIES = [
  'Electrical & Power (Lighting, sockets, breakers)',
  'Plumbing & Water (Leaks, drainage, faucets)',
  'HVAC & Air Conditioning (Cooling, filters, thermostats)',
  'Furniture & Carpentry (Chairs, desks, doors, locks)',
  'IT & Audio-Visual (Projectors, Wi-Fi, audio systems)',
  'Civil & Structural (Walls, floor tiles, windows)',
  'Elevators & Campus Mobility',
  'Sanitation & Waste Management',
  'Other Campus Facilities',
]

const DEPARTMENTS = [
  'Computer Science & IT',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Hostel & Residential Facilities',
  'Central Library',
  'Science Laboratories & Research',
  'Campus Sports & Gym Complex',
  'Administration & Student Services',
]

const PRIORITIES = [
  {
    level: 'Low',
    color: '#10b981',
    desc: 'Minor defect, routine repair (within 3-5 days)',
  },
  {
    level: 'Medium',
    color: '#f59e0b',
    desc: 'Standard maintenance, affects work (within 24-48 hrs)',
  },
  {
    level: 'High',
    color: '#f43f5e',
    desc: 'Severe breakdown, high urgency (within 24 hrs)',
  },
  {
    level: 'Urgent',
    color: '#ef4444',
    desc: 'Safety hazard or emergency (immediate dispatch)',
  },
]

const INITIAL_FORM = {
  title: '',
  category: '',
  department: '',
  building: '',
  room: '',
  priority: 'Medium',
  description: '',
  contactInfo: '',
}

const MAX_DESC_CHARS = 600

function SubmitComplaint() {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const [submittedData, setSubmittedData] = useState(null)
  const [copiedId, setCopiedId] = useState(false)

  const fileInputRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handlePrioritySelect = (level) => {
    setFormData((prev) => ({ ...prev, priority: level }))
  }

  // File selection and preview handler
  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList).map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      isImage: file.type.startsWith('image/'),
      previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
      rawFile: file,
    }))

    setSelectedFiles((prev) => [...prev, ...newFiles])
  }

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
    }
  }

  const handleRemoveFile = (id) => {
    setSelectedFiles((prev) => {
      const target = prev.find((f) => f.id === id)
      if (target && target.previewUrl) {
        URL.revokeObjectURL(target.previewUrl)
      }
      return prev.filter((f) => f.id !== id)
    })
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }

  // Validation
  const validate = () => {
    const nextErrors = {}

    if (!formData.title.trim()) {
      nextErrors.title = 'Complaint title is required.'
    } else if (formData.title.trim().length < 5) {
      nextErrors.title = 'Title should be at least 5 characters long.'
    }

    if (!formData.category) {
      nextErrors.category = 'Please select a facility category.'
    }

    if (!formData.department) {
      nextErrors.department = 'Please select the affected department.'
    }

    if (!formData.building.trim()) {
      nextErrors.building = 'Building or campus location is required.'
    }

    if (!formData.room.trim()) {
      nextErrors.room = 'Room or hall number is required.'
    }

    if (!formData.description.trim()) {
      nextErrors.description = 'Detailed description is required.'
    } else if (formData.description.trim().length < 15) {
      nextErrors.description = 'Please provide more detail (at least 15 characters).'
    }

    if (!formData.contactInfo.trim()) {
      nextErrors.contactInfo = 'Preferred contact info is required (phone or email).'
    }

    return nextErrors
  }

  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = validate()

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      const firstErrorKey = Object.keys(nextErrors)[0]
      const el = document.getElementById(firstErrorKey)
      if (el) el.focus()
      return
    }

    setIsSubmitting(true)
    setErrors({})

    // Simulate mock network latency for submission
    setTimeout(() => {
      const generatedId = `CMP-${new Date().getFullYear()}-${Math.floor(
        1000 + Math.random() * 9000
      )}`

      setSubmittedData({
        ...formData,
        id: generatedId,
        filesCount: selectedFiles.length,
        submittedAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      })

      // Clean form state
      setFormData(INITIAL_FORM)
      setSelectedFiles([])
      setIsSubmitting(false)
    }, 750)
  }

  const handleCopyId = () => {
    if (!submittedData) return
    navigator.clipboard.writeText(submittedData.id)
    setCopiedId(true)
    setTimeout(() => setCopiedId(false), 2500)
  }

  const handleResetForm = () => {
    setSubmittedData(null)
    setFormData(INITIAL_FORM)
    setSelectedFiles([])
    setErrors({})
  }

  return (
    <div className="submit-page-container">
      <main className="submit-main">
        {/* Top Header Bar */}
        <header className="submit-header-bar">
          <div className="submit-header-left">
            <Link to="/user/dashboard" className="btn btn-secondary btn-sm" style={{ padding: '0.45rem 0.85rem' }}>
              <ArrowLeft size={16} />
              <span>Dashboard</span>
            </Link>
            <nav className="submit-breadcrumb" aria-label="Breadcrumb">
              <Link to="/user/dashboard">Dashboard</Link>
              <span>/</span>
              <span>Submit Complaint</span>
            </nav>
          </div>

          <Link to="/" className="sidebar-logo" style={{ color: 'var(--navy)', fontSize: '1.15rem' }}>
            <span className="sidebar-logo__icon" style={{ width: '32px', height: '32px' }}>
              <Wrench size={16} strokeWidth={2.4} />
            </span>
            <span>FixIt</span>
          </Link>
        </header>

        {/* Form Body Area */}
        <div className="submit-content-area">
          {submittedData ? (
            /* ================================================================
               Success Confirmation Screen
               ================================================================ */
            <div className="submit-success-card" role="status" aria-live="polite">
              <div className="submit-success-badge" aria-hidden="true">
                <CheckCircle2 size={40} />
              </div>

              <h2>Complaint Submitted Successfully!</h2>
              <p>
                Your maintenance request has been recorded and dispatched to the facility team queue.
                You can track real-time technician progress using your ticket ID.
              </p>

              {/* Generated Ticket Box */}
              <div className="submit-ticket-box">
                <div>
                  <span className="ticket-code-label">Generated Complaint ID</span>
                  <span className="ticket-code-value">{submittedData.id}</span>
                </div>
                <button type="button" className="copy-ticket-btn" onClick={handleCopyId}>
                  {copiedId ? (
                    <>
                      <Check size={14} style={{ color: '#10b981' }} />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy ID</span>
                    </>
                  )}
                </button>
              </div>

              {/* Summary Details */}
              <div className="submit-summary-grid">
                <div className="summary-item">
                  <span>Issue Title</span>
                  <strong>{submittedData.title}</strong>
                </div>
                <div className="summary-item">
                  <span>Category</span>
                  <strong>{submittedData.category}</strong>
                </div>
                <div className="summary-item">
                  <span>Department</span>
                  <strong>{submittedData.department}</strong>
                </div>
                <div className="summary-item">
                  <span>Campus Location</span>
                  <strong>
                    {submittedData.building}, {submittedData.room}
                  </strong>
                </div>
                <div className="summary-item">
                  <span>Priority Level</span>
                  <strong>{submittedData.priority} Priority</strong>
                </div>
                <div className="summary-item">
                  <span>Contact Provided</span>
                  <strong>{submittedData.contactInfo}</strong>
                </div>
                <div className="summary-item">
                  <span>Attachments</span>
                  <strong>{submittedData.filesCount} file(s) attached</strong>
                </div>
                <div className="summary-item">
                  <span>Submission Time</span>
                  <strong>{submittedData.submittedAt}</strong>
                </div>
              </div>

              <div className="submit-success-actions">
                <Link to="/user/dashboard" className="btn btn-primary btn-lg">
                  Return to User Dashboard
                </Link>
                <button type="button" className="btn btn-secondary" onClick={handleResetForm}>
                  <PlusCircle size={16} />
                  <span>Submit Another Complaint</span>
                </button>
              </div>
            </div>
          ) : (
            /* ================================================================
               Complaint Submission Form
               ================================================================ */
            <>
              <div className="submit-intro">
                <h1>Submit Maintenance Complaint</h1>
                <p>
                  Report damaged campus assets, plumbing issues, electrical hazards, or general
                  facility breakdowns directly to authorized technicians.
                </p>
              </div>

              <div className="submit-form-card">
                <form className="submit-form" onSubmit={handleSubmit} noValidate>
                  {/* Section 1: Issue Overview */}
                  <div className="submit-form-section">
                    <h2 className="submit-section-title">
                      <FileText size={18} style={{ color: 'var(--primary)' }} />
                      <span>1. Complaint Overview</span>
                    </h2>

                    <div className="submit-field">
                      <label htmlFor="title">
                        Complaint Title <span className="required" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="title"
                        name="title"
                        type="text"
                        placeholder="e.g. Split AC leaking water continuously in Computer Lab 3"
                        value={formData.title}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.title)}
                        aria-describedby={errors.title ? 'title-error' : undefined}
                      />
                      {errors.title && (
                        <p id="title-error" className="submit-field-error">
                          <AlertCircle size={14} />
                          <span>{errors.title}</span>
                        </p>
                      )}
                    </div>

                    <div className="submit-grid-2">
                      <div className="submit-field">
                        <label htmlFor="category">
                          Category <span className="required" aria-hidden="true">*</span>
                        </label>
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          aria-invalid={Boolean(errors.category)}
                          aria-describedby={errors.category ? 'category-error' : undefined}
                        >
                          <option value="">Select facility category...</option>
                          {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                        {errors.category && (
                          <p id="category-error" className="submit-field-error">
                            <AlertCircle size={14} />
                            <span>{errors.category}</span>
                          </p>
                        )}
                      </div>

                      <div className="submit-field">
                        <label htmlFor="department">
                          Department <span className="required" aria-hidden="true">*</span>
                        </label>
                        <select
                          id="department"
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          aria-invalid={Boolean(errors.department)}
                          aria-describedby={errors.department ? 'department-error' : undefined}
                        >
                          <option value="">Select department...</option>
                          {DEPARTMENTS.map((dept) => (
                            <option key={dept} value={dept}>
                              {dept}
                            </option>
                          ))}
                        </select>
                        {errors.department && (
                          <p id="department-error" className="submit-field-error">
                            <AlertCircle size={14} />
                            <span>{errors.department}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Location Details */}
                  <div className="submit-form-section">
                    <h2 className="submit-section-title">
                      <Wrench size={18} style={{ color: 'var(--primary)' }} />
                      <span>2. Campus Location</span>
                    </h2>

                    <div className="submit-grid-2">
                      <div className="submit-field">
                        <label htmlFor="building">
                          Building / Location <span className="required" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="building"
                          name="building"
                          type="text"
                          placeholder="e.g. Science Complex Block C, 3rd Floor"
                          value={formData.building}
                          onChange={handleChange}
                          aria-invalid={Boolean(errors.building)}
                          aria-describedby={errors.building ? 'building-error' : undefined}
                        />
                        {errors.building && (
                          <p id="building-error" className="submit-field-error">
                            <AlertCircle size={14} />
                            <span>{errors.building}</span>
                          </p>
                        )}
                      </div>

                      <div className="submit-field">
                        <label htmlFor="room">
                          Room / Area Number <span className="required" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="room"
                          name="room"
                          type="text"
                          placeholder="e.g. Room 302 / Seminar Hall 2"
                          value={formData.room}
                          onChange={handleChange}
                          aria-invalid={Boolean(errors.room)}
                          aria-describedby={errors.room ? 'room-error' : undefined}
                        />
                        {errors.room && (
                          <p id="room-error" className="submit-field-error">
                            <AlertCircle size={14} />
                            <span>{errors.room}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Priority Selection */}
                  <div className="submit-form-section">
                    <h2 className="submit-section-title">
                      <span>3. Urgency & Priority Level</span>
                    </h2>

                    <div
                      className="priority-selector-grid"
                      role="radiogroup"
                      aria-label="Select priority level"
                    >
                      {PRIORITIES.map((p) => {
                        const isSelected = formData.priority === p.level
                        return (
                          <label
                            key={p.level}
                            className={`priority-option-label priority-option--${p.level.toLowerCase()} ${
                              isSelected ? 'priority-option-label--active' : ''
                            }`}
                          >
                            <input
                              type="radio"
                              name="priority"
                              value={p.level}
                              checked={isSelected}
                              onChange={() => handlePrioritySelect(p.level)}
                            />
                            <div className="priority-header">
                              <span
                                className="priority-badge-dot"
                                style={{ background: p.color }}
                              />
                              <span>{p.level}</span>
                            </div>
                            <span className="priority-desc">{p.desc}</span>
                          </label>
                        )
                      })}
                    </div>
                  </div>

                  {/* Section 4: Detailed Description */}
                  <div className="submit-form-section">
                    <h2 className="submit-section-title">
                      <span>4. Detailed Fault Description</span>
                    </h2>

                    <div className="submit-field">
                      <label htmlFor="description">
                        Description <span className="required" aria-hidden="true">*</span>
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        maxLength={MAX_DESC_CHARS}
                        placeholder="Please describe when the problem started, exact signs of damage (e.g. strange sounds, sparks, water overflow, bad odor), and any specific access instructions..."
                        value={formData.description}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.description)}
                        aria-describedby={errors.description ? 'description-error' : undefined}
                      />
                      <div className="submit-textarea-meta">
                        {errors.description ? (
                          <p id="description-error" className="submit-field-error">
                            <AlertCircle size={14} />
                            <span>{errors.description}</span>
                          </p>
                        ) : (
                          <span>Minimum 15 characters recommended.</span>
                        )}
                        <span
                          className={`char-counter ${
                            formData.description.length >= MAX_DESC_CHARS
                              ? 'char-counter--limit'
                              : ''
                          }`}
                        >
                          {formData.description.length} / {MAX_DESC_CHARS} characters
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Section 5: File Attachments */}
                  <div className="submit-form-section">
                    <h2 className="submit-section-title">
                      <UploadCloud size={18} style={{ color: 'var(--primary)' }} />
                      <span>5. Upload Photos or Supporting Files</span>
                    </h2>

                    {/* Drag and Drop Zone */}
                    <div
                      className={`file-upload-dropzone ${
                        isDragOver ? 'file-upload-dropzone--dragover' : ''
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          fileInputRef.current?.click()
                        }
                      }}
                      aria-label="Upload files dropzone"
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/png,image/jpeg,image/webp,application/pdf"
                        className="file-upload-input"
                        onChange={handleFileInputChange}
                      />
                      <div className="file-upload-icon-wrap" aria-hidden="true">
                        <UploadCloud size={24} />
                      </div>
                      <div className="file-upload-text">
                        <strong>Click to upload or drag and drop files</strong>
                        <span>Supports PNG, JPG, JPEG, WEBP or PDF documents up to 10MB</span>
                      </div>
                    </div>

                    {/* Uploaded Files Preview Cards */}
                    {selectedFiles.length > 0 && (
                      <div className="uploaded-files-list">
                        {selectedFiles.map((f) => (
                          <div key={f.id} className="uploaded-file-card">
                            {f.isImage && f.previewUrl ? (
                              <img
                                src={f.previewUrl}
                                alt={f.name}
                                className="uploaded-file-preview"
                              />
                            ) : (
                              <div className="uploaded-file-icon">
                                <File size={20} />
                              </div>
                            )}
                            <div className="uploaded-file-info">
                              <span className="uploaded-file-name" title={f.name}>
                                {f.name}
                              </span>
                              <span className="uploaded-file-size">{f.size}</span>
                            </div>
                            <button
                              type="button"
                              className="uploaded-file-remove"
                              onClick={() => handleRemoveFile(f.id)}
                              aria-label={`Remove file ${f.name}`}
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Section 6: Contact Information */}
                  <div className="submit-form-section">
                    <h2 className="submit-section-title">
                      <span>6. Preferred Contact Information</span>
                    </h2>

                    <div className="submit-field">
                      <label htmlFor="contactInfo">
                        Contact Details <span className="required" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contactInfo"
                        name="contactInfo"
                        type="text"
                        placeholder="e.g. +1 (555) 234-5678 or alex.morgan@campus.edu (Available 9 AM - 5 PM)"
                        value={formData.contactInfo}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.contactInfo)}
                        aria-describedby={errors.contactInfo ? 'contactInfo-error' : undefined}
                      />
                      {errors.contactInfo && (
                        <p id="contactInfo-error" className="submit-field-error">
                          <AlertCircle size={14} />
                          <span>{errors.contactInfo}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Submit Actions */}
                  <div className="submit-form-actions">
                    <Link to="/user/dashboard" className="btn btn-secondary">
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      className="btn btn-primary submit-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="spinner" aria-hidden="true" />
                          <span>Submitting Complaint...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} aria-hidden="true" />
                          <span>Submit Complaint</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default SubmitComplaint
