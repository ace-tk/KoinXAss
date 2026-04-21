import { formatCurrency, formatSignedCurrency } from '../utils/formatters';

const GainsCard = ({ title, data, projectedSavings, isAfterHarvesting }) => {
  if (!data) {
    return (
      <div className="gains-card skeleton">
        <div className="skeleton-line title"></div>
        <div className="skeleton-box"></div>
      </div>
    );
  }

  const { shortTerm, longTerm } = data;
  const stcg = shortTerm.profits - shortTerm.losses;
  const ltcg = longTerm.profits - longTerm.losses;
  const totalGains = stcg + ltcg;

  return (
    <div className={`card gains-card ${isAfterHarvesting ? 'highlight' : ''}`}>
      <h2 className="gains-title">{title}</h2>
      
      <div className="header-row">
        <span></span>
        <span className="value">Short-term</span>
        <span className="value">Long-term</span>
      </div>
      
      <div className="row">
        <span className="label">Profits</span>
        <span className="value profit value-update" key={`stp-${shortTerm.profits}`}>{formatCurrency(shortTerm.profits)}</span>
        <span className="value profit value-update" key={`ltp-${longTerm.profits}`}>{formatCurrency(longTerm.profits)}</span>
      </div>
      
      <div className="row">
        <span className="label">Losses</span>
        <span className="value loss value-update" key={`stl-${shortTerm.losses}`}>{formatSignedCurrency(-shortTerm.losses)}</span>
        <span className="value loss value-update" key={`ltl-${longTerm.losses}`}>{formatSignedCurrency(-longTerm.losses)}</span>
      </div>
      
      <div className="gains-divider"></div>
      
      <div className="row net-row">
        <span className="label">Net Capital Gains</span>
        <span className={`value value-update ${stcg >= 0 ? 'net-positive' : 'net-negative'}`} key={`stcg-${stcg}`}>
          {formatSignedCurrency(stcg)}
        </span>
        <span className={`value value-update ${ltcg >= 0 ? 'net-positive' : 'net-negative'}`} key={`ltcg-${ltcg}`}>
          {formatSignedCurrency(ltcg)}
        </span>
      </div>

      {isAfterHarvesting ? (
        <div className="gains-total">
          <span className="total-label">Effective Capital Gains:</span>
          <span key={totalGains} className="total-value value-update">
            {formatSignedCurrency(totalGains)}
          </span>
        </div>
      ) : (
        <div className="gains-total">
          <span className="total-label">Realised Capital Gains:</span>
          <span key={totalGains} className="total-value value-update">
            {formatSignedCurrency(totalGains)}
          </span>
        </div>
      )}

      {isAfterHarvesting && projectedSavings > 0 && (
        <div className="savings-badge">
          🎉 You are going to save upto <strong>{formatCurrency(projectedSavings)}</strong>
        </div>
      )}
    </div>
  );
};

export default GainsCard;
