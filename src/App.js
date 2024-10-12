import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import LogoutPage from './pages/LogoutPage';
import OAuthCallback from './components/Auth/OAuthCallback';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/callback" element={<OAuthCallback />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </Router>
  );
}

export default App;