import { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import TableRow from './TableRow';
import Checkbox from './Checkbox';

const HoldingsTable = () => {
  const { holdings, selectedHoldings, handleSelectRow, handleSelectAll } = useAppContext();
  
  const [showAll, setShowAll] = useState(false);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <span className="sort-icon inactive">↕</span>;
    return <span className="sort-icon active">{sortOrder === 'asc' ? '↑' : '↓'}</span>;
  };

  if (!holdings) {
    return <div className="table-skeleton">Loading holdings...</div>;
  }

  const allSelected = holdings.length > 0 && selectedHoldings.length === holdings.length;
  const someSelected = selectedHoldings.length > 0 && selectedHoldings.length < holdings.length;
  
  const selectedCount = selectedHoldings.length;

  const sortedHoldings = useMemo(() => {
    if (!sortField) return holdings;
    return [...holdings].sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    });
  }, [holdings, sortField, sortOrder]);

  // Changed initial show count from 4 to 5 based on requirements
  const visibleHoldings = showAll ? sortedHoldings : sortedHoldings.slice(0, 4);

  return (
    <div className="holdings-section">
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Actionable Holdings</h2>
          <p>Select assets with unrealized losses to offset your current gains.</p>
        </div>
        {selectedCount > 0 && (
          <span className="selection-count value-update" style={{ fontSize: '14px', color: '#2F80ED', fontWeight: '600', backgroundColor: '#E8F0FE', padding: '6px 12px', borderRadius: '20px' }}>
            {selectedCount} asset{selectedCount !== 1 ? 's' : ''} selected
          </span>
        )}
      </div>
      
      <div className="table-container">
        <table className="holdings-table">
          <thead>
            <tr>
              <th style={{ width: '40px', paddingRight: '0' }}>
                <Checkbox 
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={handleSelectAll} 
                />
              </th>
              <th>Asset</th>
              <th style={{ textAlign: 'center' }}>
                Holdings
                <div style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: '400', marginTop: '2px', textTransform: 'none', letterSpacing: '0' }}>Current Market Rate</div>
              </th>
              <th style={{ textAlign: 'center' }}>Total Current Value</th>
              <th style={{ textAlign: 'center', cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap' }}
                onClick={() => handleSort('shortTermGain')}>
                Short-term {getSortIcon('shortTermGain')}
              </th>
              <th style={{ textAlign: 'center', cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap' }}
                onClick={() => handleSort('longTermGain')}>
                Long-Term {getSortIcon('longTermGain')}
              </th>
              <th style={{ textAlign: 'right' }}>Amount to Sell</th>
            </tr>
          </thead>
          <tbody>
            {visibleHoldings.map((holding) => (
              <TableRow 
                key={holding.id}
                holding={holding}
                isSelected={selectedHoldings.includes(holding.id)}
                onToggle={handleSelectRow}
              />
            ))}
          </tbody>
        </table>
      </div>

      {sortedHoldings.length > 4 && (
        <div className="view-all-row">
          <button className="view-all-btn" onClick={() => setShowAll(prev => !prev)}>
            {showAll ? 'Show less' : 'View all'}
          </button>
        </div>
      )}
    </div>
  );
};

export default HoldingsTable;
