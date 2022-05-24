import React from 'react';
import logo from './trivia.png';
import Login from './pages/Login';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <section className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <Login />
      </section>
    </div>
  );
}
