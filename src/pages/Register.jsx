import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertCircle,
  ArrowLeft,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  IdCard,
  Loader2,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  User,
  Wrench,
} from 'lucide-react'
import { registerWithDemo } from '../services/authDemo'
import './Register.css'

const DEPARTMENTS = [
  'Computer Science & Engineering',
  'Electrical & Electronics Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Information Technology & Software',
  'Business Administration & Management',
  'Architecture & Design',
  'Basic Sciences & Humanities',
  'Campus Resident / Hostel Services',
  'General Campus Administration',
]

const initialValues = {
  fullName: '',
  email: '',
  studentId: '',
  department: '',
  phone: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false,
}

function Register() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [successData, setSuccessData] = useState(null)

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    const newValue = type === 'checkbox' ? checked : value

    setValues((prev) => ({
      ...prev,
      [name]: newValue,
    }))

    // Clear field-specific error as the user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
    setFeedback(null)
  }

  const validate = () => {
    const nextErrors = {}

    // Full Name
    if (!values.fullName.trim()) {
      nextErrors.fullName = 'Full Name is required.'
    } else if (values.fullName.trim().length < 2) {
      nextErrors.fullName = 'Full Name must be at least 2 characters.'
    }

    // Email
    if (!values.email.trim()) {
      nextErrors.email = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    // Student ID
    if (!values.studentId.trim()) {
      nextErrors.studentId = 'Student ID is required.'
    } else if (values.studentId.trim().length < 3) {
      nextErrors.studentId = 'Student ID must be at least 3 characters.'
    }

    // Department
    if (!values.department) {
      nextErrors.department = 'Please select your department.'
    }

    // Phone Number
    if (!values.phone.trim()) {
      nextErrors.phone = 'Phone number is required.'
    } else {
      const digitsOnly = values.phone.replace(/\D/g, '')
      if (digitsOnly.length < 7 || digitsOnly.length > 15) {
        nextErrors.phone = 'Please enter a valid phone number (at least 7 digits).'
      }
    }

    // Password
    if (!values.password) {
      nextErrors.password = 'Password is required.'
    } else if (values.password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters long.'
    }

    // Confirm Password
    if (!values.confirmPassword) {
      nextErrors.confirmPassword = 'Confirm password is required.'
    } else if (values.password && values.confirmPassword !== values.password) {
      nextErrors.confirmPassword = 'Passwords do not match.'
    }

    // Terms and Conditions
    if (!values.agreeTerms) {
      nextErrors.agreeTerms = 'You must agree to the Terms and Conditions.'
    }

    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate()

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setFeedback({
        type: 'error',
        title: 'Validation Error',
        message: 'Please resolve the highlighted errors before submitting.',
      })
      return
    }

    setIsSubmitting(true)
    setErrors({})
    setFeedback(null)

    try {
      // Structured demo register call (pure frontend demo - no backend / database connected)
      const result = await registerWithDemo({
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        studentId: values.studentId.trim(),
        department: values.department,
        phone: values.phone.trim(),
        password: values.password,
      })

      if (result.success) {
        setSuccessData(result)
      } else {
        setFeedback({
          type: 'error',
          title: 'Registration failed',
          message: result.message || 'Unable to register at this time.',
        })
      }
    } catch {
      setFeedback({
        type: 'error',
        title: 'Registration Error',
        message: 'Unable to process demo registration. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setValues(initialValues)
    setErrors({})
    setFeedback(null)
    setSuccessData(null)
  }

  return (
    <div className="register-page">
      {/* Left Column: FixIt Branding & Highlights */}
      <section className="register-branding" aria-label="FixIt registration branding">
        <Link to="/" className="register-logo" title="FixIt - Back to Home">
          <span className="register-logo__icon" aria-hidden="true">
            <Wrench size={18} strokeWidth={2.4} />
          </span>
          <span>FixIt</span>
        </Link>

        <div className="register-branding__content">
          <p className="register-branding__eyebrow">Smart Maintenance Platform</p>
          <h1>Join FixIt Today</h1>
          <p className="register-branding__description">
            Register to report campus maintenance issues, monitor technician progress in real time,
            and keep our campus environment safe and functional.
          </p>

          <div className="register-visual" aria-hidden="true">
            <div className="register-visual__card">
              <div className="register-visual__header">
                <Sparkles size={18} />
                <span>Why Register with FixIt</span>
              </div>
              <div className="register-visual__features">
                <div className="register-visual__item">
                  <div className="register-visual__icon">
                    <Wrench size={15} />
                  </div>
                  <div className="register-visual__text">
                    <strong>Fast Ticket Creation</strong>
                    <span>Submit requests for electrical, plumbing, or facility issues in seconds.</span>
                  </div>
                </div>
                <div className="register-visual__item">
                  <div className="register-visual__icon">
                    <ShieldCheck size={15} />
                  </div>
                  <div className="register-visual__text">
                    <strong>Real-Time Tracking</strong>
                    <span>Monitor repair status from assignment to final inspection.</span>
                  </div>
                </div>
                <div className="register-visual__item">
                  <div className="register-visual__icon">
                    <CheckCircle2 size={15} />
                  </div>
                  <div className="register-visual__text">
                    <strong>Verified Campus Accountability</strong>
                    <span>Direct feedback loop with campus technicians and facility managers.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="register-roles-note">
            Public registration creates Student / User accounts. Admin, Technician, and
            Facility Manager accounts are provisioned exclusively by campus administration.
          </p>
        </div>
      </section>

      {/* Right Column: Registration Form Panel */}
      <section className="register-panel">
        <div className="register-panel__inner">
          <div className="register-top-nav">
            <Link to="/" className="register-back-link">
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Success State View */}
          {successData ? (
            <div className="register-success-card" role="status" aria-live="polite">
              <div className="register-success-badge" aria-hidden="true">
                <CheckCircle2 size={36} />
              </div>
              <h3>Registration Successful!</h3>
              <p>
                Welcome to FixIt, <strong>{successData.user.fullName}</strong>! Your demo student account
                has been created successfully.
              </p>

              <div className="register-success-details">
                <div className="register-success-row">
                  <span>Full Name</span>
                  <strong>{successData.user.fullName}</strong>
                </div>
                <div className="register-success-row">
                  <span>Student ID</span>
                  <strong>{successData.user.studentId}</strong>
                </div>
                <div className="register-success-row">
                  <span>Department</span>
                  <strong>{successData.user.department}</strong>
                </div>
                <div className="register-success-row">
                  <span>Email Address</span>
                  <strong>{successData.user.email}</strong>
                </div>
                <div className="register-success-row">
                  <span>Phone</span>
                  <strong>{successData.user.phone}</strong>
                </div>
                <div className="register-success-row">
                  <span>Account Role</span>
                  <strong>Student / Campus User</strong>
                </div>
              </div>

              <div className="register-success-actions">
                <Link to="/login" className="btn btn-primary btn-lg">
                  Proceed to Login
                </Link>
                <Link to="/" className="btn btn-secondary">
                  Return to Home
                </Link>
                <button
                  type="button"
                  className="register-reset-btn"
                  onClick={handleReset}
                >
                  Register another account
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="register-panel__header">
                <h2>Create an Account</h2>
                <p>Fill in your student information to get started with FixIt.</p>
              </div>

              <form className="register-form" onSubmit={handleSubmit} noValidate>
                {feedback && (
                  <div
                    className={`register-alert register-alert--${feedback.type}`}
                    role="alert"
                  >
                    <AlertCircle size={18} />
                    <div>
                      <strong>{feedback.title}</strong>
                      <p>{feedback.message}</p>
                    </div>
                  </div>
                )}

                {/* Row 1: Full Name & Student ID */}
                <div className="register-grid-2">
                  <div className="register-field">
                    <label htmlFor="fullName">
                      Full Name <span className="required" aria-hidden="true">*</span>
                    </label>
                    <div className="register-input-wrap">
                      <User size={18} className="register-input-icon" aria-hidden="true" />
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="e.g. Alex Morgan"
                        value={values.fullName}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                        autoComplete="name"
                      />
                    </div>
                    {errors.fullName && (
                      <p id="fullName-error" className="register-error">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div className="register-field">
                    <label htmlFor="studentId">
                      Student ID <span className="required" aria-hidden="true">*</span>
                    </label>
                    <div className="register-input-wrap">
                      <IdCard size={18} className="register-input-icon" aria-hidden="true" />
                      <input
                        id="studentId"
                        name="studentId"
                        type="text"
                        placeholder="e.g. STU-2024-8842"
                        value={values.studentId}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.studentId)}
                        aria-describedby={errors.studentId ? 'studentId-error' : undefined}
                      />
                    </div>
                    {errors.studentId && (
                      <p id="studentId-error" className="register-error">
                        {errors.studentId}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 2: Email & Phone Number */}
                <div className="register-grid-2">
                  <div className="register-field">
                    <label htmlFor="email">
                      Email Address <span className="required" aria-hidden="true">*</span>
                    </label>
                    <div className="register-input-wrap">
                      <Mail size={18} className="register-input-icon" aria-hidden="true" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="e.g. alex@campus.edu"
                        value={values.email}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        autoComplete="email"
                      />
                    </div>
                    {errors.email && (
                      <p id="email-error" className="register-error">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="register-field">
                    <label htmlFor="phone">
                      Phone Number <span className="required" aria-hidden="true">*</span>
                    </label>
                    <div className="register-input-wrap">
                      <Phone size={18} className="register-input-icon" aria-hidden="true" />
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="e.g. +1 (555) 019-2834"
                        value={values.phone}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                        autoComplete="tel"
                      />
                    </div>
                    {errors.phone && (
                      <p id="phone-error" className="register-error">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 3: Department */}
                <div className="register-field">
                  <label htmlFor="department">
                    Department <span className="required" aria-hidden="true">*</span>
                  </label>
                  <div className="register-input-wrap">
                    <Building2 size={18} className="register-input-icon" aria-hidden="true" />
                    <select
                      id="department"
                      name="department"
                      value={values.department}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.department)}
                      aria-describedby={errors.department ? 'department-error' : undefined}
                    >
                      <option value="">Select your department...</option>
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.department && (
                    <p id="department-error" className="register-error">
                      {errors.department}
                    </p>
                  )}
                </div>

                {/* Row 4: Password & Confirm Password with Visibility Toggles */}
                <div className="register-grid-2">
                  <div className="register-field">
                    <label htmlFor="password">
                      Password <span className="required" aria-hidden="true">*</span>
                    </label>
                    <div className="register-input-wrap">
                      <Lock size={18} className="register-input-icon" aria-hidden="true" />
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Min. 8 characters"
                        value={values.password}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.password)}
                        aria-describedby={errors.password ? 'password-error' : undefined}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="register-password-toggle"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.password && (
                      <p id="password-error" className="register-error">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div className="register-field">
                    <label htmlFor="confirmPassword">
                      Confirm Password <span className="required" aria-hidden="true">*</span>
                    </label>
                    <div className="register-input-wrap">
                      <Lock size={18} className="register-input-icon" aria-hidden="true" />
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Re-enter password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.confirmPassword)}
                        aria-describedby={
                          errors.confirmPassword ? 'confirmPassword-error' : undefined
                        }
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="register-password-toggle"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        aria-label={
                          showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'
                        }
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p id="confirmPassword-error" className="register-error">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                {/* Terms and Conditions Checkbox */}
                <div className="register-terms-wrap">
                  <label className="register-terms">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={values.agreeTerms}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.agreeTerms)}
                      aria-describedby={errors.agreeTerms ? 'agreeTerms-error' : undefined}
                    />
                    <span>
                      I agree to the <a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a> and{' '}
                      <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>.
                    </span>
                  </label>
                  {errors.agreeTerms && (
                    <p id="agreeTerms-error" className="register-error">
                      {errors.agreeTerms}
                    </p>
                  )}
                </div>

                {/* Register Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg register-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="spinner" aria-hidden="true" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <span>Register Account</span>
                  )}
                </button>
              </form>

              {/* Link to Login for Existing Users */}
              <p className="register-login-prompt">
                Already have an account?{' '}
                <Link to="/login" className="register-link">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default Register
