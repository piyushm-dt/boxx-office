import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Home from './pages/Home';
import Star from './pages/Starred';
import Show from './pages/Show';

const theme = {
  mainColors: {
    blue: '#2400ff',
    gray: '#c6c6c6',
    dark: '#353535',
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Switch>

      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/starred">
        <Star />
      </Route>

      <Route exact path="/shows/:id">
        <Show />
      </Route>
      
      <Route>
        <div>
          Not Found !
        </div>
      </Route>

    </Switch>
    </ThemeProvider>
  );
}

export default App;
