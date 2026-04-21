import { useState, useRef, useEffect } from 'react';
import './HowItWorksTooltip.css';

const HowItWorksTooltip = () => {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="hiw-wrapper" ref={tooltipRef}>
      <a
        href="#"
        className="hiw-link"
        onClick={(e) => { e.preventDefault(); setIsOpen(prev => !prev); }}
      >
        How it works?
      </a>

      {isOpen && (
        <div className="hiw-tooltip">
          <div className="hiw-arrow" />
          <ul className="hiw-list">
            <li>See your capital gains for FY 2024-25 in the left card</li>
            <li>Check boxes for assets you plan on selling to reduce your tax liability</li>
            <li>Instantly see the updated tax liability in the right card</li>
          </ul>
          <div className="hiw-protip">
            <span className="hiw-protip-label">Pro tip:</span> Experiment with different combinations of your holdings to optimize your tax liability
          </div>
        </div>
      )}
    </div>
  );
};

export default HowItWorksTooltip;
