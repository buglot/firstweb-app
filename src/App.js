import logo from './logo.svg';
import './App.css';
import MenuLeft from './components-web/menuLeft';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Body_web_P from './components-web/body-web';
import MobileMenu from './components-mobile/mobile-menu';
function App() {
  const [smenuClick, setMenuClick] = useState(false);

  const [data, setData] = useState([]);
  const [webUse, setWebUse] = useState(0);
  useEffect(() => {
    const apiUrl = 'http://192.168.1.45:8080/os'; // แทนที่ localhost:8080/full เป็น URL ของ API ที่คุณใช้

    fetch(apiUrl)
      .then((response) => response.json())
      .then((jsonData) => {
        const valueFromJson = jsonData["os"];
        setData(valueFromJson);
      })
      .catch((error) => console.error('Error fetching data:', error.message));
  }, []);

  const web_f = (data) => {
    switch (data) {
      case "Windows":
      case "Linux":
        if (webUse !== 1) {
          setWebUse(1);
        }
        break;
      case "Android":
      case "iso":
        if (webUse !== 2) {
          setWebUse(2);
        }
        break;
      default:
        if (webUse !== 1) {
          setWebUse(1);
        }
        break;
    }
  };
  web_f(data);
  
  return (
    <div className=''>
      {webUse===1 &&
      <div>
        <MenuLeft title={data} Click={smenuClick} setMenuClick={setMenuClick} />
        <Body_web_P menuClick={smenuClick} setMenuClick={setMenuClick} />
      </div>
      }
      {webUse ===2 &&
          <MobileMenu/>
      }
    </div>
  );
}



export default App;
