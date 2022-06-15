import React from 'react';
import './App.scss';

import Game from './components/Game/Game';

function App() {

  const height = window.innerHeight;

  return (
    <div className="App" 
    style={{height: height}}
    >
      <Header/>
      
      <Game />
    </div>
  );
}

export default App;


const Header = () => {
  return (
    <div className='header'>
      <div className='header__left'></div>
      <div className='header__center'><h1>Bachle</h1></div>
      <div className='header__right'>v1.16</div>
    
    </div>
  )
}