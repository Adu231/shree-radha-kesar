import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowUpRight, Minus, Plus } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { saffronProduct } from '../data/products'
import { buildProductMessage, formatCurrency, openWhatsApp } from '../utils/whatsapp'
import WhatsAppIcon from '../components/WhatsAppIcon'

export default function ProductDetails({ notify }) {
  const { productId } = useParams()
  const product = saffronProduct
  const isValidProduct = productId === product.id
  const [selectedImage, setSelectedImage] = useState(product.image)
  const [variantId, setVariantId] = useState(product.variants[0].id)
  const [quantity, setQuantity] = useState(1)
  const variant = product.variants.find((item) => item.id === variantId) || product.variants[0]
  const total = useMemo(() => variant.price * quantity, [variant, quantity])
  const handleOrder = () => openWhatsApp(buildProductMessage({ product, variant, quantity, total }), notify)

  if (!isValidProduct) {
    return (
      <div className="page inner-page">
        <section className="section-pad not-found-page">
          <div className="container not-found-page__inner">
            <p className="eyebrow">That page has moved</p>
            <h1>We couldn’t find that kesar pack.</h1>
            <p>The collection is small and considered. Return to Our Kesar to explore the current product details.</p>
            <Link to="/kesar" className="button button--burgundy">Back to our kesar <ArrowUpRight size={16} /></Link>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="page inner-page product-detail-page">
      <div className="container breadcrumb-row"><Link to="/kesar"><ArrowLeft size={16} /> Back to our kesar</Link><span>Product details</span></div>
      <section className="section-pad product-detail">
        <div className="container product-detail__grid">
          <div className="product-detail__visual-wrap">
            <div className="product-detail__visual">
              <img src={selectedImage} alt={product.imageAlt} />
              <span className="product-detail__seal">SR<br /><small>Pure<br />Kesar</small></span>
            </div>
            {product.images && product.images.length > 1 && (
              <div className="product-detail__gallery">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`product-detail__thumb ${selectedImage === img ? 'is-active' : ''}`}
                    onClick={() => setSelectedImage(img)}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <img src={img} alt={`${product.name} preview ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="product-detail__copy">
            <p className="eyebrow">{product.eyebrow}</p>
            <h1>{product.name}</h1>
            <p className="product-detail__lead">{product.description}</p>
            <div className="availability"><span className="availability__dot" /> {product.availability}</div>
            <div className="selector-block">
              <div className="selector-label"><span>Choose your pack</span><span className="sample-label">Sample prices</span></div>
              <div className="variant-selector">
                {product.variants.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    className={item.id === variant.id ? 'is-selected' : ''}
                    aria-pressed={item.id === variant.id}
                    onClick={() => setVariantId(item.id)}
                  >
                    <strong>{item.weight}</strong>
                    <span>{formatCurrency(item.price)}</span>
                  </button>
                ))}
              </div>
              <p className="sample-note">{product.samplePriceNote}</p>
            </div>
            <div className="quantity-row">
              <span className="selector-label">Quantity</span>
              <div className="quantity-control">
                <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Minus size={16} /></button>
                <span aria-live="polite">{quantity}</span>
                <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((value) => value + 1)}><Plus size={16} /></button>
              </div>
            </div>
            <div className="total-row"><span>Total</span><strong>{formatCurrency(total)}</strong></div>
            <button className="button button--burgundy button--wide" onClick={handleOrder}>
              <WhatsAppIcon size={17} /> Order this pack on WhatsApp <ArrowUpRight size={16} />
            </button>
            <p className="direct-note">Your order opens as a pre-filled WhatsApp message. No payment is collected on this website.</p>
          </div>
        </div>
      </section>
      <section className="detail-note section-pad section-pad--cream">
        <div className="container detail-note__grid">
          <div><p className="eyebrow">A thoughtful ingredient</p><h2>Let the colour do the talking.</h2></div>
          <p>Use a few strands in warm milk, rice, desserts or festive dishes. Keep your kesar sealed, dry and away from direct light for the best experience.</p>
        </div>
      </section>
    </div>
  )
}
