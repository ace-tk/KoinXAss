import React from 'react';
import HowItWorksTooltip from './HowItWorksTooltip';
import DisclaimerBanner from './DisclaimerBanner';

const Header = () => {
  return (
    <header className="app-header">
      <div className="logo-placeholder" style={{ marginBottom: '32px' }}>
        <h2 style={{ color: '#2F80ED', fontWeight: '800', margin: '0', fontSize: '32px', letterSpacing: '-1px' }}>
          KoinX<span style={{ color: '#F5A623', fontSize: '14px', verticalAlign: 'super' }}>®</span>
        </h2>
      </div>
      <div className="title-row" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#111827' }}>Tax Harvesting</h1>
        <HowItWorksTooltip />
      </div>
      <DisclaimerBanner />
    </header>
  );
};

export default Header;
