export const formatCurrency = (num) => {
  if (num === undefined || num === null) return '$ 0';
  return `$ ${Math.abs(num).toLocaleString("en-US")}`;
};

export const formatSignedCurrency = (num) => {
  if (num === undefined || num === null) return '$ 0';
  const formatted = Math.abs(num).toLocaleString("en-US");
  return num < 0 ? `- $ ${formatted}` : `$ ${formatted}`;
};

export const formatCurrencyDetailed = (value) => {
  if (value === undefined || value === null) return '$0.00';
  
  const absoluteValue = Math.abs(value);
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(absoluteValue);

  return value < 0 ? `- ${formatted}` : formatted;
};

export const formatNumber = (value) => {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 5,
  }).format(value);
};

// Abbreviate large numbers for table display: 104385 → $104.39K
export const abbreviateCurrency = (value) => {
  if (value === undefined || value === null) return '$0';
  const abs = Math.abs(value);
  const sign = value < 0 ? '-' : '';

  if (abs >= 1_000_000) {
    return `${sign}$${(abs / 1_000_000).toFixed(2)}M`;
  } else if (abs >= 1_000) {
    return `${sign}$${(abs / 1_000).toFixed(2)}K`;
  }
  return `${sign}$${abs.toFixed(2)}`;
};

