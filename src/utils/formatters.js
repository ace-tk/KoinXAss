export const formatCurrency = (value) => {
  if (value === undefined || value === null) return '₹0';
  
  const absoluteValue = Math.abs(value);
  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(absoluteValue);

  return value < 0 ? `-${formatted}` : formatted;
};

export const formatNumber = (value) => {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 4,
  }).format(value);
};
