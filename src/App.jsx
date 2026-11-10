import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import About from './pages/About'
import Contact from './pages/Contact'
import './styles.css'
import './premium-overrides.css'

const metadata = {
  '/': { title: 'Shree Radha Kesar Supplier | Authentic Kashmiri Kesar', description: 'Experience the richness of authentic Kashmiri kesar with Shree Radha Kesar Supplier.' },
  '/kesar': { title: 'Our Kesar | Shree Radha Kesar Supplier', description: 'Explore the signature Kashmiri kesar collection from Shree Radha Kesar Supplier.' },
  '/saffron': { title: 'Our Kesar | Shree Radha Kesar Supplier', description: 'Explore the signature Kashmiri kesar collection from Shree Radha Kesar Supplier.' },
  '/about': { title: 'About Us | Shree Radha Kesar Supplier', description: 'Discover the considered approach behind Shree Radha Kesar Supplier.' },
  '/contact': { title: 'Contact | Shree Radha Kesar Supplier', description: 'Speak directly with Shree Radha Kesar Supplier about kesar orders and enquiries.' },
}

function ScrollAndMetadata() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    const pageMeta = metadata[pathname] || (pathname.startsWith('/kesar/') || pathname.startsWith('/saffron/') ? { title: 'Product Details | Shree Radha Kesar Supplier', description: 'Choose a Kashmiri kesar pack size and enquire directly with Shree Radha Kesar Supplier.' } : metadata['/kesar'])
    document.title = pageMeta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', pageMeta.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', pageMeta.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', pageMeta.description)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', window.location.href)
    const canonical = document.querySelector('link[rel="canonical"]') || document.head.appendChild(Object.assign(document.createElement('link'), { rel: 'canonical' }))
    canonical.setAttribute('href', window.location.href)
  }, [pathname])
  return null
}

function AppShell() {
  const [toast, setToast] = useState('')
  const [scrollProgress, setScrollProgress] = useState(0)
  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0)
    }
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => { window.removeEventListener('scroll', updateProgress); window.removeEventListener('resize', updateProgress) }
  }, [])
  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(() => setToast(''), 4500)
    return () => clearTimeout(timer)
  }, [toast])
  return (
    <>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />
      <ScrollAndMetadata />
      <Navbar notify={setToast} />
      <main><Routes><Route path="/" element={<Home notify={setToast} />} /><Route path="/kesar" element={<Products notify={setToast} />} /><Route path="/kesar/:productId" element={<ProductDetails notify={setToast} />} /><Route path="/saffron" element={<Products notify={setToast} />} /><Route path="/saffron/:productId" element={<ProductDetails notify={setToast} />} /><Route path="/about" element={<About />} /><Route path="/contact" element={<Contact notify={setToast} />} /></Routes></main>
      <Footer notify={setToast} />
      <FloatingWhatsApp notify={setToast} />
      {toast && <div className="toast" role="status">{toast}</div>}
    </>
  )
}

export default function App() {
  return <BrowserRouter><AppShell /></BrowserRouter>
}
