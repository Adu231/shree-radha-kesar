import { useState } from 'react'
import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { business } from '../data/business'
import { buildEnquiryMessage, openWhatsApp } from '../utils/whatsapp'
import WhatsAppIcon from '../components/WhatsAppIcon'

export default function Contact({ notify }) {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [errors, setErrors] = useState({})
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  const submit = (event) => {
    event.preventDefault()
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Please share your name.'
    if (!form.phone.trim()) nextErrors.phone = 'Please share a phone number.'
    else if (!/^\+?[0-9\s()-]{7,}$/.test(form.phone.trim())) nextErrors.phone = 'Please enter a valid phone number.'
    if (!form.message.trim()) nextErrors.message = 'Please tell us a little about your enquiry.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) openWhatsApp(buildEnquiryMessage(form), notify)
  }
  return (
    <div className="page inner-page">
      <section className="page-hero page-hero--burgundy"><div className="container page-hero__inner"><p className="eyebrow eyebrow--light">Get in touch</p><h1>Let’s make something <em>golden.</em></h1><p>Questions about a pack, a gift or an order? Send a direct enquiry and we’ll continue the conversation on WhatsApp.</p></div></section>
      <section className="section-pad contact-section"><div className="container contact-grid"><div className="contact-details"><SectionHeading eyebrow="Direct support" title="A real conversation, not a contact ticket." copy="Share a few details and your message will open in WhatsApp, ready for us to respond personally." /><div className="contact-detail-list"><div><span className="contact-icon"><WhatsAppIcon size={18} /></span><div><small>WhatsApp</small><strong>{business.whatsappNumber ? '+91 84829 14463' : 'Number to be configured'}</strong></div></div><div><span className="contact-icon"><Phone size={18} /></span><div><small>Phone</small><strong>{business.phoneNumbers.length ? business.phoneNumbers.join(' · ') : 'Details to be configured'}</strong></div></div><div><span className="contact-icon"><Mail size={18} /></span><div><small>Email</small><strong>{business.email || 'Details to be configured'}</strong></div></div></div></div><form className="enquiry-form" onSubmit={submit} noValidate><div className="form-heading"><span>01</span><h2>Tell us what you need.</h2></div><label>Name<input name="name" value={form.name} onChange={update} placeholder="Your name" />{errors.name && <small className="form-error">{errors.name}</small>}</label><label>Phone number<input type="tel" inputMode="tel" name="phone" value={form.phone} onChange={update} placeholder="Your phone number" aria-invalid={Boolean(errors.phone)} />{errors.phone && <small className="form-error">{errors.phone}</small>}</label><label>Your enquiry<textarea name="message" value={form.message} onChange={update} rows="5" placeholder="How can we help?" />{errors.message && <small className="form-error">{errors.message}</small>}</label><button className="button button--burgundy button--wide" type="submit"><WhatsAppIcon size={17} /> Continue to WhatsApp <ArrowUpRight size={16} /></button><p className="form-note">This form does not submit to a server. It prepares a message for WhatsApp so you stay in control.</p></form></div></section>
      <section className="contact-bottom"><div className="container contact-bottom__inner"><p className="eyebrow eyebrow--light">For thoughtful gifting</p><h2>We’re happy to help you find the right pack.</h2></div></section>
    </div>
  )
}
