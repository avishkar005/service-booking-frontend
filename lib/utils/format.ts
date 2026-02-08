// =========================
// Currency (INR)
// =========================
export const formatCurrency = (amount: number) => {
  if (typeof amount !== 'number') return '₹0'
  return `₹${amount.toLocaleString('en-IN')}`
}

// =========================
// Date formatter
// =========================
export const formatDate = (date: string | Date) => {
  if (!date) return ''
  const d = typeof date === 'string' ? new Date(date) : date

  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

// =========================
// Capitalize
// =========================
export const capitalize = (value: string) => {
  if (!value) return ''
  return value.charAt(0).toUpperCase() + value.slice(1)
}
