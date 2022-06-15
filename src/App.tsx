import React from 'react';
import './App.scss';
import Header from './components/Header';
import Game from './components/Game/Game';

function App() {
  const height = window.innerHeight;

  return (
    <div className="App" style={{ height: height }}>
      <Header />
      <Game />
    </div>
  );
}

export default App;
