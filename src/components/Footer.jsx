import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone, Wrench } from 'lucide-react'

function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link to="/" className="navbar__logo">
            <span className="navbar__logo-icon" aria-hidden="true">
              <Wrench size={18} strokeWidth={2.4} />
            </span>
            <span className="navbar__logo-text">FixIt</span>
          </Link>
          <p>
            A smart complaint and maintenance management system built to keep
            campuses organized, responsive, and easy to maintain.
          </p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/#how-it-works">How It Works</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4>Useful Links</h4>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Report an Issue</Link>
            </li>
            <li>
              <Link to="/about">Learn More</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <ul className="footer__contact">
            <li>
              <Mail size={16} />
              support@fixit.demo
            </li>
            <li>
              <Phone size={16} />
              +1 (555) 010-0000
            </li>
            <li>
              <MapPin size={16} />
              University Campus, Maintenance Office
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} FixIt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
