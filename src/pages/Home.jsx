import { useEffect, useRef } from 'react'
import { ArrowDownRight, ArrowUpRight, Check, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import WhatsAppIcon from '../components/WhatsAppIcon'
import { productHighlights, saffronProduct } from '../data/products'
import { openWhatsApp } from '../utils/whatsapp'

const landscapeImage = '/images/kashmir-landscape.jpg'

export default function Home({ notify }) {
  const heroVisualRef = useRef(null)

  useEffect(() => {
    const node = heroVisualRef.current
    if (!node) return undefined
    const move = (event) => {
      const rect = node.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
      node.style.setProperty('--tilt-x', `${x * 4}deg`)
      node.style.setProperty('--tilt-y', `${y * -4}deg`)
      node.style.setProperty('--shift-x', `${x * 8}px`)
      node.style.setProperty('--shift-y', `${y * 8}px`)
    }
    const reset = () => {
      node.style.setProperty('--tilt-x', '0deg')
      node.style.setProperty('--tilt-y', '0deg')
      node.style.setProperty('--shift-x', '0px')
      node.style.setProperty('--shift-y', '0px')
    }
    node.addEventListener('pointermove', move)
    node.addEventListener('pointerleave', reset)
    return () => { node.removeEventListener('pointermove', move); node.removeEventListener('pointerleave', reset) }
  }, [])

  return (
    <div className="page home-page">
      <section className="hero-section">
        <div className="container hero-grid">
          <Reveal className="hero-copy">
            <p className="eyebrow hero-eyebrow"><span className="eyebrow-dot" /> Pure · Natural · Premium</p>
            <h1>Experience the Richness of Authentic <em>Kashmiri Kesar</em></h1>
            <p className="hero-description">A quiet expression of Kashmir’s most treasured spice — selected for its colour, aroma and the little moments it makes feel extraordinary.</p>
            <div className="hero-actions">
              <Link to="/kesar" className="button button--burgundy">Explore our kesar <ArrowUpRight size={17} /></Link>
              <button className="button button--ghost" onClick={() => openWhatsApp('Hello Shree Radha Kesar Supplier, I would like to enquire about your Kashmiri kesar collection.', notify)}><WhatsAppIcon size={17} /> Order on WhatsApp</button>
            </div>
            <div className="hero-signature"><span className="signature-line" /> <span>From the valley, with care</span></div>
          </Reveal>
          <div className="hero-visual" ref={heroVisualRef}>
            <div className="hero-visual__halo" />
            <div className="hero-visual__image-frame"><img src={saffronProduct.image} alt={saffronProduct.imageAlt} /></div>
            <div className="hero-stamp"><span>SHREE RADHA</span><strong>KESAR</strong><small>Authentic · Aromatic · Considered</small></div>
            <div className="hero-orbit hero-orbit--one">✦</div><div className="hero-orbit hero-orbit--two">✦</div>
            <div className="hero-caption"><span>01 / 04</span><span className="hero-caption__line" /><span>Kashmiri kesar</span></div>
          </div>
        </div>
        <a className="scroll-cue" href="#highlights" aria-label="Scroll to highlights"><ArrowDownRight size={18} /> Scroll to discover</a>
      </section>

      <section className="highlights-section section-pad" id="highlights">
        <div className="container">
          <Reveal className="section-intro-row">
            <SectionHeading eyebrow="The Radha Kesar standard" title="A little luxury, steeped slowly." copy="Our approach is simple: let the ingredient speak, and give every detail around it the same attention." />
            <span className="section-index">01 — 04</span>
          </Reveal>
          <Reveal className="highlight-grid" delay={80}>
            {productHighlights.map((highlight) => <div className="highlight-item" key={highlight.number}><span className="highlight-number">{highlight.number}</span><h3>{highlight.title}</h3><p>{highlight.copy}</p></div>)}
          </Reveal>
        </div>
      </section>

      <section className="featured-section section-pad section-pad--cream">
        <div className="container">
          <Reveal className="section-intro-row section-intro-row--align-end"><SectionHeading eyebrow="The signature collection" title="Kesar, in its most considered form." copy="One exceptional product, available in flexible pack sizes for daily rituals and thoughtful gifting." /><Link to="/kesar" className="text-link">View all details <ArrowUpRight size={16} /></Link></Reveal>
          <Reveal delay={100}><ProductCard product={saffronProduct} notify={notify} /></Reveal>
        </div>
      </section>

      <section className="why-section section-pad">
        <div className="container why-layout">
          <div className="why-aside"><span className="vertical-label">Why choose us</span><span className="aside-rule" /></div>
          <Reveal className="why-content">
            <SectionHeading eyebrow="Care in every layer" title="Nothing extra. Nothing overlooked." copy="From the choice of kesar to the way it arrives at your door, the experience is designed to feel warm, honest and quietly special." />
            <div className="why-list"><div><span>01</span><div><h3>Ingredient-first thinking</h3><p>A clear, product-led point of view — without unnecessary noise.</p></div></div><div><span>02</span><div><h3>Careful presentation</h3><p>Thoughtful packaging that respects the value of what is inside.</p></div></div><div><span>03</span><div><h3>Personal service</h3><p>A direct line for questions, pack sizes and gifting conversations.</p></div></div></div>
          </Reveal>
        </div>
      </section>

      <section className="story-section">
        <div className="story-image"><img src={landscapeImage} alt="Misty Kashmir landscape at golden hour" loading="lazy" /></div>
        <Reveal className="story-copy"><p className="eyebrow eyebrow--light">A feeling, carried home</p><h2>The essence of Kashmir in every strand.</h2><p>Kashmiri kesar has a way of turning the everyday into a ritual. A pinch blooms in warm milk. A familiar dish takes on a new depth. This is the feeling we want every pack to hold: vivid, generous and distinctly of its place.</p><Link to="/about" className="button button--gold">Read our approach <ArrowUpRight size={17} /></Link></Reveal>
      </section>

      <section className="commitments-section section-pad section-pad--cream">
        <div className="container">
          <SectionHeading eyebrow="A promise in practice" title="The details that matter." align="center" />
          <Reveal className="commitment-grid" delay={100}>{['Quality first', 'Carefully packed', 'Customer satisfaction', 'Direct support'].map((item, index) => <div className="commitment" key={item}><span>0{index + 1}</span><Check size={17} /><h3>{item}</h3><p>Considered at every step of your kesar experience.</p></div>)}</Reveal>
        </div>
      </section>

      <section className="contact-banner"><div className="container contact-banner__inner"><div><p className="eyebrow eyebrow--light">A golden ritual awaits</p><h2>Bring home the richness of Kashmiri kesar.</h2></div><button className="button button--ivory" onClick={() => openWhatsApp('Hello Shree Radha Kesar Supplier, I would like to bring home your Kashmiri kesar collection.', notify)}><WhatsAppIcon size={17} /> Start an enquiry <ArrowUpRight size={17} /></button></div></section>
    </div>
  )
}
