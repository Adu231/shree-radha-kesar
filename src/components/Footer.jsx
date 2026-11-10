import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import BrandMark from './BrandMark'
import WhatsAppIcon from './WhatsAppIcon'
import { business, siteNavigation } from '../data/business'
import { openWhatsApp } from '../utils/whatsapp'

export default function Footer({ notify }) {
  const handleWhatsApp = () => openWhatsApp('Hello Shree Radha Kesar Supplier, I would like to enquire about your Kashmiri kesar collection.', notify)
  const handleNavigation = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <BrandMark light />
          <p>{business.description}</p>
          <button className="button button--gold" onClick={handleWhatsApp}><WhatsAppIcon size={17} /> Start an enquiry <ArrowUpRight size={16} /></button>
        </div>
        <div className="footer-column">
          <p className="footer-label">Explore</p>
          {siteNavigation.map((item) => <Link key={item.to} onClick={handleNavigation} to={item.to}>{item.label}</Link>)}
        </div>
        <div className="footer-column">
          <p className="footer-label">Reach us</p>
          {business.phoneNumbers.length > 0 ? business.phoneNumbers.map((phone) => <a key={phone} href={`tel:${phone}`}>{phone}</a>) : <span className="muted-on-dark">Phone details coming soon</span>}
          {business.email ? <a href={`mailto:${business.email}`}>{business.email}</a> : <span className="muted-on-dark">Email details coming soon</span>}
          {business.instagram ? <a href={business.instagram} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13} /></a> : null}
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {business.name}. All rights reserved.</span>
        <span>Frontend experience · Enquiries via WhatsApp</span>
      </div>
    </footer>
  )
}
