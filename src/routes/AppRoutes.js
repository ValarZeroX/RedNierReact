import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import AuthCallback from '../components/auth/AuthCallback';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/*" element={<MainRoutes />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
