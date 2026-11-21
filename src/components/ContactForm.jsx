import { useState } from 'react'
import { CheckCircle2, Send } from 'lucide-react'

const initialValues = {
  fullName: '',
  email: '',
  subject: '',
  message: '',
}

function ContactForm() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
    setSuccess(false)
  }

  const validate = () => {
    const nextErrors = {}

    if (!values.fullName.trim()) {
      nextErrors.fullName = 'Full name is required.'
    }

    if (!values.email.trim()) {
      nextErrors.email = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (!values.subject.trim()) {
      nextErrors.subject = 'Subject is required.'
    }

    if (!values.message.trim()) {
      nextErrors.message = 'Message is required.'
    }

    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate()

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setSuccess(false)
      return
    }

    setErrors({})
    setValues(initialValues)
    setSuccess(true)
  }

  return (
    <section className="section contact-form-section">
      <div className="container contact-form-layout">
        <div className="contact-form-intro">
          <p className="section-eyebrow">Send a Message</p>
          <h2 className="section-title">Tell us how we can help</h2>
          <p className="section-subtitle">
            Fill out the form below. This is a frontend demo only—your message
            will not be emailed or stored on a server.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          {success && (
            <div className="contact-form__success" role="status">
              <CheckCircle2 size={20} />
              <div>
                <strong>Message ready</strong>
                <p>
                  Your form was validated successfully. No message was sent or
                  saved—this is a demo submission only.
                </p>
              </div>
            </div>
          )}

          <div className="form-field">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              value={values.fullName}
              onChange={handleChange}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            />
            {errors.fullName && (
              <p id="fullName-error" className="form-error">
                {errors.fullName}
              </p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={values.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="form-error">
                {errors.email}
              </p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="What is this about?"
              value={values.subject}
              onChange={handleChange}
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={errors.subject ? 'subject-error' : undefined}
            />
            {errors.subject && (
              <p id="subject-error" className="form-error">
                {errors.subject}
              </p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Write your message here..."
              value={values.message}
              onChange={handleChange}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && (
              <p id="message-error" className="form-error">
                {errors.message}
              </p>
            )}
          </div>

          <button type="submit" className="btn btn-primary btn-lg contact-form__submit">
            Submit Message
            <Send size={18} />
          </button>
        </form>
      </div>
    </section>
  )
}

export default ContactForm
