import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          component={ Login }
        />
        <Route
          exact
          path="/settings"
          component={ Settings }
        />
        <Route
          exact
          path="/game"
          component={ Game }
        />
        <Route
          exact
          path="/feedback"
          component={ Feedback }
        />
        <Route
          exact
          path="/ranking"
          component={ Ranking }
        />
      </Switch>
    </div>
  );
}
