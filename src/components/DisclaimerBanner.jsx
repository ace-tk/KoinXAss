import { useState } from 'react';
import './DisclaimerBanner.css';

const DisclaimerBanner = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`disclaimer-accordion ${isOpen ? 'open' : ''}`}>
      <button className="disclaimer-header" onClick={() => setIsOpen(prev => !prev)}>
        <div className="disclaimer-header-left">
          <span className="disclaimer-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </span>
          <span className="disclaimer-title">Important Notes & Disclaimers</span>
        </div>
        <span className={`disclaimer-chevron ${isOpen ? 'rotated' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="disclaimer-body">
          <ul className="disclaimer-list">
            <li>Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.</li>
            <li>Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.</li>
            <li>Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.</li>
            <li>Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.</li>
            <li>Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted.</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DisclaimerBanner;
