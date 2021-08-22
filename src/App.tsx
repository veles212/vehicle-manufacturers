import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Manufacturers from 'features/makers/Manufactorers/Manufacturers';
import Makes from 'features/makers/Makes/Makes';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Manufacturers />
          </Route>
          <Route exact path="/manufacturer/:id">
            <Makes />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
