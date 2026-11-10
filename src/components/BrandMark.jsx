export default function BrandMark({ light = false }) {
  return (
    <span className={`brand-mark ${light ? 'brand-mark--light' : ''}`} aria-label="Shree Radha Kesar Supplier">
      <span className="brand-mark__image-wrap">
        <img className="brand-mark__image" src="/shree-radha-kesar-logo.png" alt="Shree Radha Kesar Supplier" />
      </span>
    </span>
  )
}
