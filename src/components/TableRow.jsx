import React from 'react';
import ValueTooltip from './ValueTooltip';
import Checkbox from './Checkbox';
import { formatCurrencyDetailed, formatNumber, abbreviateCurrency } from '../utils/formatters';
import btcLogo from '../assets/coins/btc.png';
import ethLogo from '../assets/coins/eth.png';
import xrpLogo from '../assets/coins/xrp.png';
import adaLogo from '../assets/coins/ada.png';
import solLogo from '../assets/coins/sol.png';

const coinLogos = {
  BTC: btcLogo,
  ETH: ethLogo,
  XRP: xrpLogo,
  ADA: adaLogo,
  SOL: solLogo
};

const TableRow = ({ holding, isSelected, onToggle }) => {
  const totalValue = holding.holdings * holding.currentPrice;

  return (
    <tr className={isSelected ? 'selected-row' : ''}>
      <td style={{ paddingRight: '0' }}>
        <Checkbox 
          checked={isSelected}
          onChange={() => onToggle(holding.id)}
        />
      </td>
      <td>
        <div className="asset-cell">
          <img 
            src={coinLogos[holding.asset.symbol]} 
            alt={holding.asset.name} 
            className="asset-logo"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/default-coin.png';
            }}
          />
          <div className="asset-info">
            <span className="asset-name">{holding.asset.name}</span>
            <span className="asset-symbol">{holding.asset.symbol}</span>
          </div>
        </div>
      </td>
      <td style={{ textAlign: 'center' }}>
        <div className="stack-cell" style={{ alignItems: 'center' }}>
          <span className="main-val bold">{formatNumber(holding.holdings)} {holding.asset.symbol}</span>
          <span className="sub-val">{formatCurrencyDetailed(holding.currentPrice)}/{holding.asset.symbol}</span>
        </div>
      </td>
      <td style={{ textAlign: 'center' }}>
        <ValueTooltip fullValue={formatCurrencyDetailed(totalValue)}>
          <span className="main-val bold">{abbreviateCurrency(totalValue)}</span>
        </ValueTooltip>
      </td>
      <td style={{ textAlign: 'center' }}>
        <div className="stack-cell" style={{ alignItems: 'center' }}>
          <ValueTooltip fullValue={formatCurrencyDetailed(holding.shortTermGain)}>
            <span className={`gain-val ${holding.shortTermGain >= 0 ? 'profit' : 'loss'}`}>
              {holding.shortTermGain > 0 ? '+' : ''}{abbreviateCurrency(holding.shortTermGain)}
            </span>
          </ValueTooltip>
          {holding.shortTermGain !== 0 && (
            <span className="sub-val" style={{ color: holding.shortTermGain >= 0 ? '#16C784' : '#EA3943', opacity: 0.8 }}>
              {formatNumber(Math.abs(holding.shortTermGain) / holding.currentPrice)} {holding.asset.symbol}
            </span>
          )}
        </div>
      </td>
      <td style={{ textAlign: 'center' }}>
        <div className="stack-cell" style={{ alignItems: 'center' }}>
          <ValueTooltip fullValue={formatCurrencyDetailed(holding.longTermGain)}>
            <span className={`gain-val ${holding.longTermGain >= 0 ? 'profit' : 'loss'}`}>
              {holding.longTermGain > 0 ? '+' : ''}{abbreviateCurrency(holding.longTermGain)}
            </span>
          </ValueTooltip>
          {holding.longTermGain !== 0 && (
            <span className="sub-val" style={{ color: holding.longTermGain >= 0 ? '#16C784' : '#EA3943', opacity: 0.8 }}>
              {formatNumber(Math.abs(holding.longTermGain) / holding.currentPrice)} {holding.asset.symbol}
            </span>
          )}
        </div>
      </td>
      <td style={{ textAlign: 'right' }}>
        <span className="main-val value-update" style={{ color: isSelected ? 'inherit' : '#9CA3AF' }}>
          {isSelected ? `${formatNumber(holding.holdings)} ${holding.asset.symbol}` : '-'}
        </span>
      </td>
    </tr>
  );
};

export default TableRow;
