import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Home,
  KeyRound,
  Loader2,
  Mail,
  RefreshCw,
  Send,
  Wrench,
} from 'lucide-react'
import { requestPasswordResetDemo } from '../services/authDemo'
import './ForgotPassword.css'

const COOLDOWN_DURATION = 30 // seconds for resend cooldown

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [isResending, setIsResending] = useState(false)
  const [feedback, setFeedback] = useState(null)

  // Countdown timer for resend link cooldown
  useEffect(() => {
    if (cooldown <= 0) return

    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [cooldown])

  const validate = () => {
    const trimmed = email.trim()
    if (!trimmed) {
      return 'Email address is required.'
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return 'Please enter a valid email address.'
    }
    return ''
  }

  const handleChange = (event) => {
    setEmail(event.target.value)
    if (error) setError('')
    if (feedback) setFeedback(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationError = validate()

    if (validationError) {
      setError(validationError)
      return
    }

    setIsSubmitting(true)
    setError('')
    setFeedback(null)

    try {
      const cleanEmail = email.trim()
      const result = await requestPasswordResetDemo({ email: cleanEmail })

      if (result.success) {
        setSubmittedEmail(cleanEmail)
        setIsSubmitted(true)
        setCooldown(COOLDOWN_DURATION)
        setFeedback({
          type: 'success',
          message: 'Reset instructions have been generated.',
        })
      } else {
        setError('Unable to send reset instructions. Please try again.')
      }
    } catch {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResend = async () => {
    if (cooldown > 0 || isResending) return

    setIsResending(true)
    setFeedback(null)

    try {
      await requestPasswordResetDemo({ email: submittedEmail })
      setCooldown(COOLDOWN_DURATION)
      setFeedback({
        type: 'success',
        message: 'A fresh reset link has been dispatched to your email!',
      })
    } catch {
      setFeedback({
        type: 'error',
        message: 'Failed to resend the reset link. Please try again.',
      })
    } finally {
      setIsResending(false)
    }
  }

  const handleTryDifferentEmail = () => {
    setIsSubmitted(false)
    setError('')
    setFeedback(null)
  }

  return (
    <div className="forgot-page">
      {/* Top Branding */}
      <header className="forgot-header">
        <Link to="/" className="forgot-logo" title="FixIt - Back to Home">
          <span className="forgot-logo__icon" aria-hidden="true">
            <Wrench size={20} strokeWidth={2.4} />
          </span>
          <span>FixIt</span>
        </Link>
        <p className="forgot-header__tagline">
          Smart Complaint & Maintenance Management System
        </p>
      </header>

      {/* Main Centered Recovery Card */}
      <main className="forgot-card">
        {isSubmitted ? (
          /* ================================================================
             Success State View
             ================================================================ */
          <div className="forgot-success-content" role="status" aria-live="polite">
            <div className="forgot-success-badge" aria-hidden="true">
              <CheckCircle2 size={36} />
            </div>

            <h2>Reset Link Sent!</h2>

            <p className="forgot-success-text">
              We have sent password recovery instructions to:
              <br />
              <strong className="forgot-email-highlight">{submittedEmail}</strong>
            </p>

            {/* Notification alert if resend triggered */}
            {feedback && (
              <div
                className={`forgot-alert forgot-alert--${feedback.type}`}
                role="status"
              >
                <CheckCircle2 size={16} />
                <span>{feedback.message}</span>
              </div>
            )}

            {/* Demo Notice */}
            <div className="forgot-demo-note">
              <AlertCircle size={16} />
              <span>
                <strong>Frontend Demo:</strong> In a production environment, you would receive an
                email with an encrypted token valid for 60 minutes.
              </span>
            </div>

            {/* Resend Link with Cooldown */}
            <div className="forgot-resend-box">
              {cooldown > 0 ? (
                <div className="forgot-cooldown-text">
                  <Clock size={16} aria-hidden="true" />
                  <span>
                    Resend available in{' '}
                    <strong className="forgot-cooldown-timer">{cooldown}s</strong>
                  </span>
                </div>
              ) : (
                <>
                  <span>Didn&apos;t receive the email? Check spam or</span>
                  <button
                    type="button"
                    className="forgot-resend-btn"
                    onClick={handleResend}
                    disabled={isResending}
                  >
                    <RefreshCw
                      size={14}
                      className={isResending ? 'spinner' : ''}
                      aria-hidden="true"
                    />
                    <span>{isResending ? 'Sending link...' : 'Click here to resend'}</span>
                  </button>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="forgot-success-actions">
              <Link to="/login" className="btn btn-primary btn-lg">
                Return to Login
              </Link>
              <Link to="/" className="btn btn-secondary">
                Back to Home
              </Link>
              <button
                type="button"
                className="forgot-reset-btn"
                onClick={handleTryDifferentEmail}
              >
                Use a different email address
              </button>
            </div>
          </div>
        ) : (
          /* ================================================================
             Default Form View
             ================================================================ */
          <>
            <div className="forgot-icon-badge" aria-hidden="true">
              <KeyRound size={26} />
            </div>

            <h1 className="forgot-title">Forgot Your Password?</h1>
            <p className="forgot-description">
              Enter your registered email address to begin the password recovery process.
              We&apos;ll send you a secure link to reset your account credentials.
            </p>

            <form className="forgot-form" onSubmit={handleSubmit} noValidate>
              <div className="forgot-field">
                <label htmlFor="email">Registered Email Address</label>
                <div className="forgot-input-wrap">
                  <Mail size={18} className="forgot-input-icon" aria-hidden="true" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="e.g. yourname@campus.edu"
                    value={email}
                    onChange={handleChange}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? 'email-error' : undefined}
                    autoComplete="email"
                    autoFocus
                  />
                </div>
                {error && (
                  <p id="email-error" className="forgot-error" role="alert">
                    <AlertCircle size={15} />
                    <span>{error}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg forgot-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="spinner" aria-hidden="true" />
                    <span>Sending Reset Link...</span>
                  </>
                ) : (
                  <>
                    <Send size={17} aria-hidden="true" />
                    <span>Send Reset Link</span>
                  </>
                )}
              </button>
            </form>

            {/* Footer Navigation */}
            <footer className="forgot-footer">
              <Link to="/login" className="forgot-nav-link">
                <ArrowLeft size={16} />
                <span>Back to Login</span>
              </Link>
              <span className="forgot-divider" aria-hidden="true">
                •
              </span>
              <Link to="/" className="forgot-nav-link">
                <Home size={15} />
                <span>Back to Home</span>
              </Link>
            </footer>
          </>
        )}
      </main>
    </div>
  )
}

export default ForgotPassword
