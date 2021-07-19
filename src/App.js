import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"

import CommitsList from "./components/commits-list-component"
import CardsList from "./components/cards-component"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={CommitsList}/>
        <Route path="/cards" exact component={CardsList}/>
      </div>
    </Router>
  );
}

export default App;
