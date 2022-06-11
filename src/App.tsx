import React from 'react';
import './App.scss';

import Game from './components/Game';

function App() {
  return (
    <div className="App" 
    // style={{height: "550px"}}
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
      <div className='header__right'>v1.11</div>
    
    </div>
  )
}