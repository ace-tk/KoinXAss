import React, { useState, useEffect } from 'react';
import { getCapitalGains, getHoldings } from './api/mockApi';
import GainsCard from './components/GainsCard';
import HoldingsTable from './components/HoldingsTable';
import './App.css';

function App() {
  const [holdings, setHoldings] = useState(null);
  const [capitalGainsBefore, setCapitalGainsBefore] = useState(null);
  const [capitalGainsAfter, setCapitalGainsAfter] = useState(null);
  const [selectedHoldings, setSelectedHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [gainsData, holdingsData] = await Promise.all([
          getCapitalGains(),
          getHoldings()
        ]);
        
        setCapitalGainsBefore(gainsData);
        setCapitalGainsAfter(gainsData);
        setHoldings(holdingsData);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const applyTaxHarvesting = (baseGains, selectedHoldingIds, allHoldings) => {
    const calculatedGains = JSON.parse(JSON.stringify(baseGains));

    selectedHoldingIds.forEach(id => {
      const holding = allHoldings.find(h => h.id === id);
      if (holding) {
        // Short-Term Gain Logic
        if (holding.shortTermGain > 0) {
          calculatedGains.shortTerm.profits += holding.shortTermGain;
        } else if (holding.shortTermGain < 0) {
          calculatedGains.shortTerm.losses += Math.abs(holding.shortTermGain);
        }

        // Long-Term Gain Logic
        if (holding.longTermGain > 0) {
          calculatedGains.longTerm.profits += holding.longTermGain;
        } else if (holding.longTermGain < 0) {
          calculatedGains.longTerm.losses += Math.abs(holding.longTermGain);
        }
      }
    });

    return calculatedGains;
  };

  useEffect(() => {
    if (!capitalGainsBefore || !holdings) return;
    
    const newGains = applyTaxHarvesting(capitalGainsBefore, selectedHoldings, holdings);
    setCapitalGainsAfter(newGains);
  }, [selectedHoldings, capitalGainsBefore, holdings]);

  const handleSelectRow = (id) => {
    setSelectedHoldings(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Calculate Net gains (Stage 2)
  const calculateNetGains = (gainsData) => {
    if (!gainsData) return { stcg: 0, ltcg: 0, total: 0 };
    
    const stcg = gainsData.shortTerm.profits - gainsData.shortTerm.losses;
    const ltcg = gainsData.longTerm.profits - gainsData.longTerm.losses;
    
    return {
      stcg,
      ltcg,
      total: stcg + ltcg
    };
  };

  const handleSelectAll = (e) => {
    if (e.target.checked && holdings) {
      setSelectedHoldings(holdings.map(h => h.id));
    } else {
      setSelectedHoldings([]);
    }
  };

  // Calculate projected savings based on a 30% tax rate assumption
  const calculateSavings = () => {
    if (!capitalGainsBefore || !capitalGainsAfter) return 0;
    
    const preGains = calculateNetGains(capitalGainsBefore);
    const postGains = calculateNetGains(capitalGainsAfter);

    // If total gains are reduced, calculate 30% of the reduced amount as tax saved
    if (postGains.total < preGains.total) {
      return (preGains.total - postGains.total) * 0.30;
    }
    
    return 0;
  };

  const projectedSavings = calculateSavings();

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Tax Loss Harvesting Tool</h1>
        <p>Optimize your tax liabilities by strategically realizing losses to offset capital gains.</p>
      </header>

      {error && <div className="error-message">{error}</div>}

      {loading && !error ? (
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Analyzing your portfolio...</p>
        </div>
      ) : (
        <main className="dashboard">
          <section className="gains-section">
            <GainsCard 
              title="Pre-Harvesting Status" 
              data={capitalGainsBefore} 
            />
            <div className="arrow-indicator">➔</div>
            <GainsCard 
              title="Post-Harvesting Projection" 
              data={capitalGainsAfter} 
              isAfterHarvesting={true}
              projectedSavings={projectedSavings}
            />
          </section>

          <section className="holdings-section">
            <div className="section-header">
              <h2>Actionable Holdings</h2>
              <p>Select assets with unrealized losses to offset your current gains.</p>
            </div>
            
            <HoldingsTable 
              holdings={holdings}
              selectedHoldings={selectedHoldings}
              onSelectRow={handleSelectRow}
              onSelectAll={handleSelectAll}
            />
          </section>
        </main>
      )}
    </div>
  );
}

export default App;
