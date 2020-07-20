import React from 'react';
import './App.scss';
import { MoexBondsProvider } from './context/MoexBondsProvider';
import { Home } from './pages/Home';
//import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// const theme = createMuiTheme({
//   palette: {
//     type: 'dark',
//   },
// });

function App() {
  return (
    <MoexBondsProvider>
      {/* <MuiThemeProvider theme={theme}> */}
       <Home />
      {/* </MuiThemeProvider> */}
    </MoexBondsProvider>
  );
}

export default App;
