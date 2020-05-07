import React from 'react';
import './App.scss';
import { MoexBondsProvider } from './context/MoexBondsProvider';
import { BondsCalculator } from './pages/BondsCalculator';

function App() {
  return (
    <MoexBondsProvider>
      <BondsCalculator />
    </MoexBondsProvider>
  );
}

export default App;
