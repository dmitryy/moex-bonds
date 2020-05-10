import React from 'react';
import './App.scss';
import { MoexBondsProvider } from './context/MoexBondsProvider';
import { Home } from './pages/Home';

function App() {
  return (
    <MoexBondsProvider>
       <Home />
    </MoexBondsProvider>
  );
}

export default App;
