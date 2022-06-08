import React, { Component } from 'react';
import Footer from '../components/Footer';

class Settings extends Component {
  render() {
    return (
      <main className="App-header">
        <h1 data-testid="settings-title">Settings</h1>
        <Footer />
      </main>
    );
  }
}

export default Settings;
