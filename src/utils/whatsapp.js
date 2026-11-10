import { business } from '../data/business'

export function formatCurrency(value) {
  return `₹${value.toLocaleString('en-IN')}`
}

export function getWhatsAppUrl(message) {
  if (!business.whatsappNumber) return null
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export function openWhatsApp(message, onUnavailable) {
  const url = getWhatsAppUrl(message)
  if (!url) {
    onUnavailable?.('WhatsApp ordering is ready, but the business number has not been configured yet.')
    return false
  }
  window.open(url, '_blank', 'noopener,noreferrer')
  return true
}

export function buildProductMessage({ product, variant, quantity, total }) {
  return `Hello Shree Radha Kesar Supplier,\n\nI would like to order:\n\nProduct: ${product.name}\nWeight: ${variant.weight}\nQuantity: ${quantity}\nPrice: ${formatCurrency(variant.price)}\nTotal: ${formatCurrency(total)}\n\nPlease share the ordering and delivery details.`
}

export function buildEnquiryMessage({ name, phone, message }) {
  return `Hello Shree Radha Kesar Supplier,\n\nI have a business enquiry.\n\nName: ${name}\nPhone: ${phone}\nMessage: ${message}\n\nPlease share the next steps.`
}
