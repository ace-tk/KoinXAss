import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import GainsCard from './components/GainsCard';
import HoldingsTable from './components/HoldingsTable';
import Header from './components/Header';
import './App.css';

const Dashboard = () => {
  const { capitalGainsBefore, capitalGainsAfter, projectedSavings, loading, error } = useAppContext();

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Analyzing your portfolio...</p>
      </div>
    );
  }

  return (
    <main className="dashboard value-update">
      <section className="gains-section">
        <GainsCard 
          title="Pre Harvesting" 
          data={capitalGainsBefore} 
        />
        <GainsCard 
          title="After Harvesting" 
          data={capitalGainsAfter} 
          isAfterHarvesting={true}
          projectedSavings={projectedSavings}
        />
      </section>

      <HoldingsTable />
    </main>
  );
};

function App() {
  return (
    <AppProvider>
      <div className="app-container">
        <Header />
        <Dashboard />
      </div>
    </AppProvider>
  );
}

export default App;
