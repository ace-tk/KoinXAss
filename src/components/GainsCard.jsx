import { formatCurrency } from '../utils/formatters';

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
    <div className={`gains-card ${isAfterHarvesting ? 'highlight' : ''}`}>
      <h2 className="gains-title">{title}</h2>
      
      <div className="gains-grid">
        <div className="gain-row">
          <span className="gain-label">Short-Term Gains (STCG)</span>
          <div className="gain-values">
            <span className="profit">{formatCurrency(shortTerm.profits)}</span>
            <span className="loss"> - {formatCurrency(shortTerm.losses)}</span>
          </div>
          <span className={`net-gain ${stcg >= 0 ? 'positive' : 'negative'}`}>
            = {formatCurrency(stcg)}
          </span>
        </div>

        <div className="gain-row">
          <span className="gain-label">Long-Term Gains (LTCG)</span>
          <div className="gain-values">
            <span className="profit">{formatCurrency(longTerm.profits)}</span>
            <span className="loss"> - {formatCurrency(longTerm.losses)}</span>
          </div>
          <span className={`net-gain ${ltcg >= 0 ? 'positive' : 'negative'}`}>
            = {formatCurrency(ltcg)}
          </span>
        </div>
      </div>

      <div className="gains-divider"></div>

      <div className="gains-total">
        <span>Total Realised Gains</span>
        <span className={`total-value ${totalGains >= 0 ? 'positive' : 'negative'}`}>
          {formatCurrency(totalGains)}
        </span>
      </div>

      {isAfterHarvesting && projectedSavings > 0 && (
        <div className="savings-badge">
          🎉 You're going to save <strong>{formatCurrency(projectedSavings)}</strong>!
        </div>
      )}
    </div>
  );
};

export default GainsCard;
