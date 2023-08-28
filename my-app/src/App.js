
import './App.css';
import Webbody from './web_component/webbody';
import LoginPage from './web_component/login_component/login_web';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import CheckLogin from './CheckLogin';
import M_body from './m_component/mbody';
function App() {
  useEffect(()=>{
    fetch(`http://192.168.189.194:1235/${document.URL.split("http://192.168.189.194:3000/")[1]}`)
  .then(response => response.json())
  .then(data => {
  })
  .catch(error => {
    console.error('Error:', error);
    window.location.href = "/"
  });},[])
  
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<CheckLogin />} />

        <Route path="/web/app" element={<Webbody  />} />
        <Route path="/web/login" element={<LoginPage  />} />
        <Route path="/m/login" element={<LoginPage  />} />
        <Route path="/m/app" element={<M_body  />} />
      </Routes>
    </Router>
  );
}

export default App;
