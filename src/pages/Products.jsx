import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import SectionHeading from '../components/SectionHeading'
import { saffronProduct } from '../data/products'
import { openWhatsApp } from '../utils/whatsapp'
import WhatsAppIcon from '../components/WhatsAppIcon'

export default function Products({ notify }) {
  return (
    <div className="page inner-page">
      <section className="page-hero page-hero--burgundy">
        <div className="container page-hero__inner">
          <p className="eyebrow eyebrow--light">Our kesar</p>
          <h1>A pantry essential, <em>made precious.</em></h1>
          <p>Meet the signature collection: aromatic Kashmiri kesar, presented in considered pack sizes for the rituals that matter.</p>
        </div>
      </section>
      <section className="section-pad product-list-section">
        <div className="container">
          <div className="section-intro-row">
            <SectionHeading eyebrow="The signature collection" title="One product. Many rituals." copy="Explore the collection, choose your pack size, and speak to us directly for ordering and delivery details." />
            <span className="section-index">01 / 01</span>
          </div>
          <ProductCard product={saffronProduct} notify={notify} />
          <div className="catalogue-note">
            <WhatsAppIcon size={18} />
            <span>Need a different quantity or gifting conversation? <button className="inline-button" onClick={() => openWhatsApp('Hello Shree Radha Kesar Supplier, I would like to enquire about a custom kesar quantity or gifting requirement.', notify)}>Message us directly <ArrowUpRight size={15} /></button></span>
          </div>
        </div>
      </section>
      <section className="ritual-strip">
        <div className="container ritual-strip__inner">
          <span className="ritual-strip__mark">✦</span>
          <p>“A pinch of kesar can turn a familiar recipe into a memory.”</p>
          <Link to="/about" className="text-link text-link--light">Our approach <ArrowUpRight size={16} /></Link>
        </div>
      </section>
    </div>
  )
}
