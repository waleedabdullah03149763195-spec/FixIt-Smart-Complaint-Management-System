import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, Wrench, X } from 'lucide-react'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          <span className="navbar__logo-icon" aria-hidden="true">
            <Wrench size={18} strokeWidth={2.4} />
          </span>
          <span className="navbar__logo-text">FixIt</span>
        </Link>

        <nav className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          <NavLink to="/" end className="navbar__link" onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/about" className="navbar__link" onClick={closeMenu}>
            About
          </NavLink>
          <NavLink to="/contact" className="navbar__link" onClick={closeMenu}>
            Contact
          </NavLink>

          <div className="navbar__mobile-actions">
            <Link to="/login" className="btn btn-ghost" onClick={closeMenu}>
              Login
            </Link>
            <Link to="/register" className="btn btn-primary" onClick={closeMenu}>
              Get Started
            </Link>
          </div>
        </nav>

        <div className="navbar__actions">
          <Link to="/login" className="btn btn-ghost navbar__desktop-only">
            Login
          </Link>
          <Link to="/register" className="btn btn-primary navbar__desktop-only">
            Get Started
          </Link>
          <button
            type="button"
            className="navbar__toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <button
          type="button"
          className="navbar__overlay"
          aria-label="Close menu"
          onClick={closeMenu}
        />
      )}
    </header>
  )
}

export default Navbar
