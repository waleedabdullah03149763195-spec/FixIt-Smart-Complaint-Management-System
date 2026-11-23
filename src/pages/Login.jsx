import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Shield,
  Sparkles,
  User,
  Wrench,
} from 'lucide-react'
import { loginWithDemo } from '../services/authDemo'
import './Login.css'

const initialValues = {
  email: 'alex.morgan@campus.edu',
  password: 'password123',
  rememberMe: true,
}

function Login() {
  const navigate = useNavigate()
  const [selectedRole, setSelectedRole] = useState('user')
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState(null)

  const selectRole = (role) => {
    setSelectedRole(role)
    if (role === 'admin') {
      setValues({
        email: 'admin.ops@campus-facilities.edu',
        password: 'password123',
        rememberMe: true,
      })
    } else {
      setValues({
        email: 'alex.morgan@campus.edu',
        password: 'password123',
        rememberMe: true,
      })
    }
    setErrors({})
    setFeedback(null)
  }

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    const nextVal = type === 'checkbox' ? checked : value
    setValues((prev) => ({
      ...prev,
      [name]: nextVal,
    }))

    // Auto-detect admin role if email contains "admin"
    if (name === 'email' && typeof nextVal === 'string') {
      if (nextVal.toLowerCase().includes('admin')) {
        setSelectedRole('admin')
      } else {
        setSelectedRole('user')
      }
    }

    setErrors((prev) => ({ ...prev, [name]: '' }))
    setFeedback(null)
  }

  const validate = () => {
    const nextErrors = {}

    if (!values.email.trim()) {
      nextErrors.email = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (!values.password) {
      nextErrors.password = 'Password is required.'
    }

    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate()

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setFeedback(null)
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      const result = await loginWithDemo({
        email: values.email.trim(),
        password: values.password,
        rememberMe: values.rememberMe,
        role: selectedRole,
      })

      if (result.success) {
        // Navigate immediately — no setTimeout so React Strict Mode can't cancel it
        navigate(result.redirectTo, { replace: true })
      } else {
        setFeedback({
          type: 'error',
          title: 'Sign In Failed',
          message: result.message || 'Unable to sign in. Please try again.',
        })
      }
    } catch {
      setFeedback({
        type: 'error',
        title: 'Something went wrong',
        message: 'Unable to process the demo login request. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="login-page">
      <section className="login-branding" aria-label="FixIt branding">
        <Link to="/" className="login-logo">
          <span className="login-logo__icon" aria-hidden="true">
            <Wrench size={18} strokeWidth={2.4} />
          </span>
          <span>FixIt</span>
        </Link>

        <div className="login-branding__content">
          <p className="login-branding__eyebrow">Smart Maintenance Platform</p>
          <h1>Welcome Back!</h1>
          <p className="login-branding__description">
            Sign in to manage your complaints and maintenance requests.
          </p>

          <div className="login-visual" aria-hidden="true">
            <div className="login-visual__card">
              <div className="login-visual__header">
                <ClipboardList size={18} />
                <span>Maintenance Overview</span>
              </div>
              <div className="login-visual__rows">
                <div>
                  <strong>Open requests</strong>
                  <span>Ready for review</span>
                </div>
                <div>
                  <strong>Assigned jobs</strong>
                  <span>With technicians</span>
                </div>
                <div>
                  <strong>Resolved</strong>
                  <span>Tracked to completion</span>
                </div>
              </div>
            </div>
          </div>

          <p className="login-roles-note">
            Future roles: User/Student, Admin, Technician, and Manager. Public
            registration will only create User accounts. Admin, Technician, and
            Manager accounts will be created by authorized administration.
          </p>
        </div>
      </section>

      <section className="login-panel">
        <div className="login-panel__inner">
          <div className="login-panel__header">
            <h2>Sign in to FixIt</h2>
            <p>Enter your details to continue to your account.</p>
          </div>

          <div className="login-demo-roles" aria-label="Demo role selector">
            <div className="login-demo-roles__title">
              <span>
                <Sparkles size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                Quick Demo Accounts:
              </span>
              <small>Click to switch role</small>
            </div>
            <div className="login-demo-roles__grid">
              <button
                type="button"
                className={`login-demo-btn ${selectedRole === 'user' ? 'login-demo-btn--active' : ''}`}
                onClick={() => selectRole('user')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <User size={15} />
                  <strong>Student / User</strong>
                </div>
                <span>alex.morgan@campus.edu</span>
              </button>

              <button
                type="button"
                className={`login-demo-btn ${selectedRole === 'admin' ? 'login-demo-btn--active' : ''}`}
                onClick={() => selectRole('admin')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Shield size={15} />
                  <strong>Administrator</strong>
                </div>
                <span>admin.ops@campus-facilities.edu</span>
              </button>
            </div>
          </div>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            {feedback && (
              <div
                className={`login-alert login-alert--${feedback.type}`}
                role="status"
              >
                {feedback.type === 'success' ? (
                  <CheckCircle2 size={18} />
                ) : (
                  <AlertCircle size={18} />
                )}
                <div>
                  <strong>{feedback.title}</strong>
                  <p>{feedback.message}</p>
                </div>
              </div>
            )}

            <div className="login-field">
              <label htmlFor="email">Email Address</label>
              <div className="login-input-wrap">
                <Mail size={18} className="login-input-icon" aria-hidden="true" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={values.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <p id="email-error" className="login-error">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="login-field">
              <label htmlFor="password">Password</label>
              <div className="login-input-wrap">
                <Lock size={18} className="login-input-icon" aria-hidden="true" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="login-error">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="login-form__meta">
              <label className="login-remember">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={values.rememberMe}
                  onChange={handleChange}
                />
                <span>Remember Me</span>
              </label>

              <Link to="/forgot-password" className="login-link">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg login-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                'Signing In...'
              ) : (
                <>
                  <span>Sign In to {selectedRole === 'admin' ? 'Admin' : 'User'} Dashboard</span>
                  <ArrowRight size={18} style={{ marginLeft: 6 }} />
                </>
              )}
            </button>
          </form>

          <p className="login-register">
            New to FixIt?{' '}
            <Link to="/register" className="login-link">
              Create an account
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}

export default Login
