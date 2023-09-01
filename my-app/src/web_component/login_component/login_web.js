import React from 'react';
import "./login_web.css"
import { useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { url_myAPI } from '../../default/config';
function LoginPage(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [signin,setSignin] = useState(1);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);
  
    // ส่ง HTTP POST request
    fetch(`${url_myAPI}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString()
    })
    .then(response => response.json())
    .then(data => {
      // ตรวจสอบการเข้าสู่ระบบที่สำเร็จหรือไม่
      console.log(data.status)
      if (data.status) {
        // ทำสิ่งที่คุณต้องการหลังจากที่ได้รับการตอบรับเรียบร้อย

          Cookies.set('isLogin',"true"); 
          Cookies.set('linkprofile',data.linkprofile);
          navigate(data.redirect);
      } else {
        // แสดงข้อความแจ้งเตือนให้ผู้ใช้รับทราบถึงข้อผิดพลาด
        setErrorMessage(data.error);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // แสดงข้อความแจ้งเตือนให้ผู้ใช้รับทราบถึงข้อผิดพลาดในการส่งคำขอ
      setErrorMessage('An error occurred while processing your request.');
    });
  };
  const registorclick=(event)=>{
    event.preventDefault();
    if(password !== password1){
      setErrorMessage("Password is not sameting!!");
    }else{
      const formData = new URLSearchParams();
      formData.append('email', email);
      formData.append('password', password);
  
    // ส่ง HTTP POST request
    fetch(`${url_myAPI}/registor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString()
    })
    .then(response => response.json())
    .then(data => {
      // ตรวจสอบการเข้าสู่ระบบที่สำเร็จหรือไม่
      if (data.status) {
          setSignin(1);
          setErrorMessage("Seccesed!! can login");
      } else {
        // แสดงข้อความแจ้งเตือนให้ผู้ใช้รับทราบถึงข้อผิดพลาด
        setErrorMessage(data.error);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // แสดงข้อความแจ้งเตือนให้ผู้ใช้รับทราบถึงข้อผิดพลาดในการส่งคำขอ
      setErrorMessage('An error occurred while processing your request.');
    });
    }
  };
  return (
    <div className='login_web_inside'>
        <div className={`login_web_inside_right_in ${signin ? "":"close"}`}>
          <form className='login-web-form-section login_web_inside_right' onSubmit={handleSubmit}>
            <div className="login-web-input-container ">
              <label><h1>Login</h1></label>
              <label>Email</label>
              <input type="email" name="email" placeholder="Enter your email" value={email} onChange={(e) => {setEmail(e.target.value);setErrorMessage("");}} />
            </div>
            <div className="login-web-input-container">
              <label>Password</label>
              <input type="password" name="password" placeholder="Enter your password" value={password} onChange={(e) => {setPassword(e.target.value);setErrorMessage("");}} />
            </div>
            <div className="login-web-link-container">
              <a className="login-web-forgot-password" href="/web/forget">Forgot Password?</a>
            </div>
            <div className="login-web-link-container">
              <button type="submit">Login</button>
            </div>
            {signin && <p className="error-message">{errorMessage}</p>}
            <center><b><a className="login-web-signup-link aa"onClick={()=>setSignin(0)} href='#'>I don't have account yet</a></b></center>
          </form>
        </div>
        <div className={`login_web_inside_right_in ${signin ? "close":""}`}>
          <form className='login-web-form-section login_web_inside_right' onSubmit={registorclick}>
          <a className='login-web-signup-link aa' onClick={()=>{setSignin(1);setErrorMessage("")}}>&lt; Get back to Sign in</a>
          
            <div className="login-web-input-container ">
              <label><h1>Sign Up</h1></label>
              <label>Email</label>
              <input type="email" name="email" placeholder="Enter your email" value={email} onChange={(e) => {setEmail(e.target.value);setErrorMessage("");}} />
            </div>
            <div className="login-web-input-container">
              <label>Password</label>
              <input type="password" name="password" placeholder="Enter your password" value={password} onChange={(e) => {setPassword(e.target.value);setErrorMessage("");}} />
            </div>
            <div className="login-web-input-container">
              <label>re-Password</label>
              <input type="password" name="password" placeholder="Enter your re-password" value={password1} onChange={(e) => {setPassword1(e.target.value);setErrorMessage("");}} />
            </div>
            <div className="login-web-link-container">
              <button type="submit">Login</button>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>

          
        </div>
      </div>
  );
}

export default LoginPage;