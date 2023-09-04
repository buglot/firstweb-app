import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { url_myAPI } from './default/config';
function CheckLogin() {
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [webUse, setWebUse] = useState(0);
  const formData = new URLSearchParams();
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const apiUrl = `${url_myAPI}/os`; // แทนที่ localhost:8080/full เป็น URL ของ API ที่คุณใช้

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        let datas = data.os;
        let s = 0;
        switch (datas) {
          case "Windows":
          case "Linux":
            s = 1;
            break;
          case "Android":
          case "Ios":
            s = 2;
            break;
          default:
            s = 1;
            break;
        }
        let d;
        if (s == 1) {
          d = 'web'
        } else {
          d = 'm'
        }
        const isLoggedIn = Cookies.get('isLogin');
        console.log(isLoggedIn);

        if (isLoggedIn !== "true") {
          navigate(`${d}/login`);
        } else {
          const linkprofile = Cookies.get('linkprofile');
          navigate(`${d}/app?m=${linkprofile}&&page=0`);
        }
      })
      .catch((error) => console.error('Error fetching data:', error.message));
  }, [navigate, setData]);


  return (
    <div>
      <h1>Welcome to the Protected Page</h1>
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
};

export default CheckLogin;