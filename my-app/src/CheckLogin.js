import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
function CheckLogin(){
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = Cookies.get('');
    console.log(isLoggedIn)
    if (!isLoggedIn) {
      
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Welcome to the Protected Page</h1>
    </div>
  );
};

export default CheckLogin;