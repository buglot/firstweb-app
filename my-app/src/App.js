
import './App.css';
import Webbody from './web_component/webbody';
import LoginPage from './web_component/login_component/login_web';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { myIP_REACT,myIPv4,url_myAPI } from './default/config';
import CheckLogin from './CheckLogin';
import M_body from './m_component/mbody';

function App() {
  const [d,setd]= useState(false);
  useEffect(()=>{
    fetch(`${url_myAPI}${document.URL.split(myIP_REACT)[1]}`)
  .then(response => response.json())
  .then(data => {
  })
  .catch(error => {
    console.error('Error:', error);
    window.location.href = "/"
  });},[setd])
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<CheckLogin />} />

        <Route path="/web/app" element={<Webbody />} />
        <Route path="/web/login" element={<LoginPage  />} />
        <Route path="/m/login" element={<LoginPage  />} />
        <Route path="/m/app" element={<M_body/>} />
      </Routes>
    </Router>
  );
}

export default App;
