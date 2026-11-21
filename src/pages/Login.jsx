import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertCircle,
  ClipboardList,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Wrench,
} from 'lucide-react'
import { loginWithDemo } from '../services/authDemo'
import './Login.css'

const initialValues = {
  email: '',
  password: '',
  rememberMe: false,
}

function Login() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState(null)

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
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
      // Structured demo login call — swap for a real API later.
      const result = await loginWithDemo({
        email: values.email.trim(),
        password: values.password,
        rememberMe: values.rememberMe,
      })

      if (!result.success) {
        setFeedback({
          type: 'info',
          title: 'Demo login only',
          message: result.message,
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

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            {feedback && (
              <div
                className={`login-alert login-alert--${feedback.type}`}
                role="status"
              >
                <AlertCircle size={18} />
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
              {isSubmitting ? 'Checking...' : 'Login'}
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
