import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import AuthCallback from '../components/auth/AuthCallback';
import UserRoutes from './UserRoutes';
import Home from '../pages/Main/Home';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import VerifyEmail from '../pages/auth/VerifyEmail';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="user/*" element={<ProtectedRoute />}>
            <Route path="*" element={<UserRoutes />} />
          </Route>
          <Route path="/*" element={<MainRoutes />} />
        </Route>
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
