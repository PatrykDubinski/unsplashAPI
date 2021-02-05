import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "../Home/Home";
import Results from "../../containers/Results/Results";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/results/:query">
            <Results />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
