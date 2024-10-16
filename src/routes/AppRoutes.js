import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import AuthCallback from '../components/auth/AuthCallback';
import UserRoutes from './UserRoutes';
import Home from '../pages/Main/Home';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import NotFoundTitle from '../pages/errors/NotFoundTitle';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* 頁面主路由 */}
        <Route path="/" element={<Home />}>
          <Route path="user/*" element={<ProtectedRoute />}>
            <Route path="*" element={<UserRoutes />} />  {/* 子路由 */}
          </Route>
          <Route path="/*" element={<MainRoutes />} />  {/* 子路由 */}
        </Route>

        {/* 單獨的路由 */}
        <Route path="/auth/callback" element={<AuthCallback />} />

      </Routes>
    </Router>
  );
};

export default AppRoutes;
