import { useState, useRef } from 'react';
import './ValueTooltip.css';

const ValueTooltip = ({ fullValue, children }) => {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMouseEnter = (e) => {
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
    setVisible(true);
  };

  return (
    <span
      ref={ref}
      className="value-tooltip-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span className="value-tooltip-box">
          {fullValue}
        </span>
      )}
    </span>
  );
};

export default ValueTooltip;
