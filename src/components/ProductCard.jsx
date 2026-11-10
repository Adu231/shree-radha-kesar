import { useMemo, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatCurrency, openWhatsApp, buildProductMessage } from '../utils/whatsapp'
import WhatsAppIcon from './WhatsAppIcon'

export default function ProductCard({ product, notify }) {
  const [selectedId, setSelectedId] = useState(product.variants[0].id)
  const selectedVariant = useMemo(() => product.variants.find((variant) => variant.id === selectedId) || product.variants[0], [product.variants, selectedId])
  const handleOrder = () => openWhatsApp(buildProductMessage({ product, variant: selectedVariant, quantity: 1, total: selectedVariant.price }), notify)

  return (
    <article className="product-card">
      <div className="product-card__image-wrap">
        <img src={product.image} alt={product.imageAlt} loading="lazy" className="product-card__image" />
        <span className="product-card__tag">{product.availability}</span>
        <span className="product-card__image-note">Tap a pack size to personalise</span>
      </div>
      <div className="product-card__body">
        <p className="eyebrow">{product.eyebrow}</p>
        <h3>{product.name}</h3>
        <p>{product.shortDescription}</p>
        <div className="product-card__meta">
          <span>Selected pack <strong>{formatCurrency(selectedVariant.price)}</strong></span>
          <span className="sample-label">Sample prices</span>
        </div>
        <div className="weight-list" aria-label="Available pack sizes">
          {product.variants.map((variant) => (
            <button
              type="button"
              key={variant.id}
              className={selectedId === variant.id ? 'is-selected' : ''}
              onClick={() => setSelectedId(variant.id)}
              aria-pressed={selectedId === variant.id}
            >
              <span>{variant.weight}</span>
              <small>{formatCurrency(variant.price)}</small>
            </button>
          ))}
        </div>
        <div className="product-card__selection"><span className="selection-dot" /> {selectedVariant.weight} pack selected</div>
        <div className="product-card__actions">
          <button className="button button--burgundy" onClick={handleOrder}>
            <WhatsAppIcon size={17} /> Order on WhatsApp <ArrowUpRight size={15} />
          </button>
          <Link to={`/kesar/${product.id}`} className="button button--outline">
            View details
          </Link>
        </div>
      </div>
    </article>
  )
}
