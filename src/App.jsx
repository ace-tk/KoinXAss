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

  useEffect(() => {
    if (!capitalGainsBefore || !holdings) return;

    // Deep copy to prevent mutating the original state
    const newGains = JSON.parse(JSON.stringify(capitalGainsBefore));

    selectedHoldings.forEach(id => {
      const holding = holdings.find(h => h.id === id);
      if (holding) {
        // Add ST gains/losses
        if (holding.shortTermGain > 0) {
          newGains.shortTerm.profits += holding.shortTermGain;
        } else if (holding.shortTermGain < 0) {
          newGains.shortTerm.losses += Math.abs(holding.shortTermGain);
        }

        // Add LT gains/losses
        if (holding.longTermGain > 0) {
          newGains.longTerm.profits += holding.longTermGain;
        } else if (holding.longTermGain < 0) {
          newGains.longTerm.losses += Math.abs(holding.longTermGain);
        }
      }
    });

    setCapitalGainsAfter(newGains);
  }, [selectedHoldings, capitalGainsBefore, holdings]);

  const handleSelectRow = (id) => {
    setSelectedHoldings(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
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
    
    const preStcg = capitalGainsBefore.shortTerm.profits - capitalGainsBefore.shortTerm.losses;
    const preLtcg = capitalGainsBefore.longTerm.profits - capitalGainsBefore.longTerm.losses;
    const preTotal = preStcg + preLtcg;

    const postStcg = capitalGainsAfter.shortTerm.profits - capitalGainsAfter.shortTerm.losses;
    const postLtcg = capitalGainsAfter.longTerm.profits - capitalGainsAfter.longTerm.losses;
    const postTotal = postStcg + postLtcg;

    // If total gains are reduced, calculate 30% of the reduced amount as tax saved
    if (postTotal < preTotal) {
      return (preTotal - postTotal) * 0.30;
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
