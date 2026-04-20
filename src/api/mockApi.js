const mockCapitalGains = {
  shortTerm: { profits: 120000, losses: 40000 },
  longTerm: { profits: 300000, losses: 50000 }
};

const mockHoldings = [
  {
    id: 'h1',
    asset: { name: 'Bitcoin', symbol: 'BTC', logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png' },
    holdings: 0.5,
    avgBuyPrice: 3000000,
    currentPrice: 3200000,
    shortTermGain: 100000,
    longTermGain: 0,
  },
  {
    id: 'h2',
    asset: { name: 'Ethereum', symbol: 'ETH', logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png' },
    holdings: 5,
    avgBuyPrice: 200000,
    currentPrice: 150000,
    shortTermGain: 0,
    longTermGain: -250000,
  },
  {
    id: 'h3',
    asset: { name: 'Solana', symbol: 'SOL', logo: 'https://cryptologos.cc/logos/solana-sol-logo.png' },
    holdings: 100,
    avgBuyPrice: 10000,
    currentPrice: 8000,
    shortTermGain: -200000,
    longTermGain: 0,
  },
  {
    id: 'h4',
    asset: { name: 'Cardano', symbol: 'ADA', logo: 'https://cryptologos.cc/logos/cardano-ada-logo.png' },
    holdings: 5000,
    avgBuyPrice: 40,
    currentPrice: 35,
    shortTermGain: 0,
    longTermGain: -25000,
  },
  {
    id: 'h5',
    asset: { name: 'Ripple', symbol: 'XRP', logo: 'https://cryptologos.cc/logos/xrp-xrp-logo.png' },
    holdings: 2000,
    avgBuyPrice: 45,
    currentPrice: 60,
    shortTermGain: 30000,
    longTermGain: 0,
  }
];

export const getCapitalGains = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Return a deep copy to prevent mutation issues
      resolve(JSON.parse(JSON.stringify(mockCapitalGains)));
    }, 1200);
  });
};

export const getHoldings = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(JSON.parse(JSON.stringify(mockHoldings)));
    }, 1500);
  });
};
