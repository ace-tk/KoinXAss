import React, { createContext, useState, useEffect, useMemo, useContext } from 'react';
import { getCapitalGains, getHoldings } from '../api/mockApi';

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [holdings, setHoldings] = useState(null);
  const [capitalGainsBefore, setCapitalGainsBefore] = useState(null);
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

  const capitalGainsAfter = useMemo(() => {
    if (!capitalGainsBefore || !holdings) return null;
    return applyTaxHarvesting(capitalGainsBefore, selectedHoldings, holdings);
  }, [selectedHoldings, capitalGainsBefore, holdings]);

  const handleSelectRow = (id) => {
    setSelectedHoldings(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Calculate Net gains
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

  // Memoized savings logic
  const projectedSavings = useMemo(() => {
    if (!capitalGainsBefore || !capitalGainsAfter) return 0;
    
    const preGains = calculateNetGains(capitalGainsBefore);
    const postGains = calculateNetGains(capitalGainsAfter);

    const savings = preGains.total - postGains.total;
    return savings > 0 ? savings : 0;
  }, [capitalGainsBefore, capitalGainsAfter]);

  const contextValue = {
    holdings,
    capitalGainsBefore,
    capitalGainsAfter,
    selectedHoldings,
    projectedSavings,
    loading,
    error,
    handleSelectRow,
    handleSelectAll
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
