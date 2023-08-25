import { useNavigate } from 'react-router-dom';
import React, { useEffect,useState } from 'react';
import Cookies from 'js-cookie';
function CheckLogin(){
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [webUse, setWebUse] = useState(0);
  const formData = new URLSearchParams();
  const [errorMessage,setErrorMessage] = useState("");
  useEffect(() => {
    const apiUrl = 'http://192.168.1.45:1235/os'; // แทนที่ localhost:8080/full เป็น URL ของ API ที่คุณใช้

    fetch(apiUrl)
      .then((response) => response.json())
      .then((jsonData) => {
        const valueFromJson = jsonData["os"];
        setData(valueFromJson);
      })
      .catch((error) => console.error('Error fetching data:', error.message));
  }, [navigate]);

  const web_f = (data) => {
    switch (data) {
      case "Windows":
      case "Linux":
        if (webUse !== 1) {
          setWebUse(1);
        }
        break;
      case "Android":
      case "Ios":
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
  let d ;
  if (webUse == 1){
    d='web'
  }else{
    d='m'
  }
  useEffect(() => {
    const isLoggedIn = Cookies.get('isLogin');
    console.log(isLoggedIn);
    
    if (isLoggedIn!=="true") {
      
      navigate(`${d}/login`);
    }else{
      const linkprofile = Cookies.get('linkprofile');
      navigate(`${d}/app?m=${linkprofile}`);
    }
  }, [navigate]);

  return (
    <div>
      <h1>Welcome to the Protected Page</h1>
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
};

export default CheckLogin;