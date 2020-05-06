import React from 'react';
import './App.scss';
import { MoexBondsState } from './context/MoexBondsState';
import { BondsCalculator } from './pages/BondsCalculator';

function App() {
  return (
    <MoexBondsState>
      <BondsCalculator />
    </MoexBondsState>
  );
}

export default App;
