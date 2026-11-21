import { Link } from 'react-router-dom'

function ForgotPassword() {
  return (
    <div className="placeholder-page">
      <h1>Forgot Password</h1>
      <p>This page will be built later.</p>
      <Link to="/login" className="btn btn-primary">
        Back to Login
      </Link>
    </div>
  )
}

export default ForgotPassword
