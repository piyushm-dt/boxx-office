import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Star from './pages/Star';
import Show from './pages/Show';

function App() {
  return (
    <div>
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
    </div>
  );
}

export default App;
