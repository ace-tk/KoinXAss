import { formatCurrency, formatNumber } from '../utils/formatters';

const HoldingsTable = ({ holdings, selectedHoldings, onSelectRow, onSelectAll }) => {
  if (!holdings) {
    return <div className="table-skeleton">Loading holdings...</div>;
  }

  const allSelected = holdings.length > 0 && selectedHoldings.length === holdings.length;
  const someSelected = selectedHoldings.length > 0 && selectedHoldings.length < holdings.length;

  return (
    <div className="table-container">
      <table className="holdings-table">
        <thead>
          <tr>
            <th>
              <input 
                type="checkbox" 
                className="custom-checkbox"
                checked={allSelected}
                ref={input => { if (input) input.indeterminate = someSelected; }}
                onChange={onSelectAll} 
              />
            </th>
            <th>Asset</th>
            <th>Holdings & Avg. Price</th>
            <th>Current Price</th>
            <th>ST Gain/Loss</th>
            <th>LT Gain/Loss</th>
            <th>Amount to Sell</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((holding) => {
            const isSelected = selectedHoldings.includes(holding.id);
            
            return (
              <tr key={holding.id} className={isSelected ? 'selected-row' : ''}>
                <td>
                  <input 
                    type="checkbox" 
                    className="custom-checkbox"
                    checked={isSelected}
                    onChange={() => onSelectRow(holding.id)}
                  />
                </td>
                <td>
                  <div className="asset-cell">
                    <img src={holding.asset.logo} alt={holding.asset.name} className="asset-logo" />
                    <div className="asset-info">
                      <span className="asset-name">{holding.asset.name}</span>
                      <span className="asset-symbol">{holding.asset.symbol}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="stack-cell">
                    <span className="main-val">{formatNumber(holding.holdings)} {holding.asset.symbol}</span>
                    <span className="sub-val">@ {formatCurrency(holding.avgBuyPrice)}</span>
                  </div>
                </td>
                <td>
                  <span className="main-val">{formatCurrency(holding.currentPrice)}</span>
                </td>
                <td>
                  <span className={`gain-val ${holding.shortTermGain > 0 ? 'positive' : holding.shortTermGain < 0 ? 'negative' : ''}`}>
                    {holding.shortTermGain !== 0 ? formatCurrency(holding.shortTermGain) : '-'}
                  </span>
                </td>
                <td>
                  <span className={`gain-val ${holding.longTermGain > 0 ? 'positive' : holding.longTermGain < 0 ? 'negative' : ''}`}>
                    {holding.longTermGain !== 0 ? formatCurrency(holding.longTermGain) : '-'}
                  </span>
                </td>
                <td>
                  <span className="main-val">{isSelected ? formatNumber(holding.holdings) : '0'}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HoldingsTable;
