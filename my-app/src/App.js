
import './App.css';
import Menu_web from './web_compronemt/menu_web';
import Body_Web from './web_compronemt/body_web';
import LoginPage from './web_compronemt/login_web';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CheckLogin from './CheckLogin';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<CheckLogin />} />
        {/* อื่น ๆ ... */}
      </Routes>
    </Router>
  );
}

export default App;
