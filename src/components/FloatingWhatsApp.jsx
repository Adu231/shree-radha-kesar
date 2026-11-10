import { openWhatsApp } from '../utils/whatsapp'
import WhatsAppIcon from './WhatsAppIcon'

export default function FloatingWhatsApp({ notify }) {
  return (
    <button className="floating-whatsapp" aria-label="Order on WhatsApp" onClick={() => openWhatsApp('Namaste Shree Radha Kesar Supplier, I would like to enquire about your authentic Kashmiri Kesar collection.', notify)}>
      <WhatsAppIcon size={21} /> <span>WhatsApp</span>
    </button>
  )
}
