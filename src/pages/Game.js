import React, { Component } from 'react';
import Header from '../components/Header';

class Games extends Component {
  render() {
    return (
      <main className="App-header">
        <Header />
        <h1 data-testid="Games-title">Games</h1>
      </main>
    );
  }
}

export default Games;
