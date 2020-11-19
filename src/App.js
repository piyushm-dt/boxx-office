import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navs from './components/Navs';
import Home from './pages/Home';
import Star from './pages/Star';

function App() {
  return (
    <div>
    <Navs />
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/starred">
        <Star />
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
