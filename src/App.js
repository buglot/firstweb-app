import logo from './logo.svg';
import './App.css';
import MenuLeft from './components-web/menuLeft';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Body_web_P from './components-web/body-web';
function App() {
  const [ smenuClick, setMenuClick] = useState(false);
  return (
    <div className='main'>
      <MenuLeft title="Home" Click={smenuClick} setMenuClick={setMenuClick}/>
      <Body_web_P menuClick={smenuClick} setMenuClick={setMenuClick}/>
    </div>
  );
}

export default App;
