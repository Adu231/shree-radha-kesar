import { business } from '../data/business'

export function formatCurrency(value) {
  return `₹${value.toLocaleString('en-IN')}`
}

export function sanitizeWhatsAppNumber(number) {
  if (!number) return ''
  const digits = String(number).replace(/\D/g, '')
  if (digits.length === 10) {
    return `91${digits}`
  }
  return digits
}

export function getWhatsAppUrl(message) {
  const phone = sanitizeWhatsAppNumber(business.whatsappNumber)
  if (!phone) return null
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
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
  const isMulti = quantity > 1
  return [
    `Namaste Shree Radha Kesar Supplier,`,
    ``,
    `I would like to place an order for authentic Kashmiri Kesar:`,
    ``,
    `• Product: ${product.name}`,
    `• Pack Size: ${variant.weight}`,
    `• Quantity: ${quantity} pack${isMulti ? 's' : ''}`,
    `• Price: ${formatCurrency(variant.price)}${isMulti ? ' per pack' : ''}`,
    `• Total Amount: ${formatCurrency(total)}`,
    ``,
    `Please confirm my order and share payment and delivery details.`,
    `Thank you!`
  ].join('\n')
}

export function buildEnquiryMessage({ name, phone, message }) {
  return [
    `Namaste Shree Radha Kesar Supplier,`,
    ``,
    `I have an enquiry from your website:`,
    ``,
    `• Name: ${name}`,
    `• Phone: ${phone}`,
    `• Enquiry: ${message}`,
    ``,
    `Please share details with me at your convenience.`,
    `Thank you!`
  ].join('\n')
}
