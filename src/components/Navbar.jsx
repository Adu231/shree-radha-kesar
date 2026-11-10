import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import BrandMark from './BrandMark'
import WhatsAppIcon from './WhatsAppIcon'
import { siteNavigation } from '../data/business'
import { openWhatsApp } from '../utils/whatsapp'

export default function Navbar({ notify }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => setMenuOpen(false), [location.pathname])

  const handleWhatsApp = () => {
    openWhatsApp('Hello Shree Radha Kesar Supplier, I would like to enquire about your Kashmiri kesar collection.', notify)
  }
  const handleNavigation = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      <header className="site-header">
        <div className="container nav-shell">
          <Link to="/" className="brand-link" aria-label="Go to the home page"><BrandMark /></Link>
          <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <nav className={`main-nav ${menuOpen ? 'main-nav--open' : ''}`} aria-label="Main navigation">
            <div className="main-nav__links">
              {siteNavigation.map((item) => <Link key={item.to} onClick={handleNavigation} className={location.pathname === item.to ? 'is-active' : ''} to={item.to}>{item.label}</Link>)}
            </div>
            <button className="button button--burgundy button--small nav-order" onClick={handleWhatsApp}>
              <WhatsAppIcon size={16} /> Order on WhatsApp <ArrowUpRight size={16} />
            </button>
          </nav>
        </div>
      </header>
    </>
  )
}
