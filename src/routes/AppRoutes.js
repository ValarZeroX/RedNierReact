import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainRoutes from './MainRoutes';

import UserRoutes from './UserRoutes';
import Home from '../pages/Main/Home';
import ProtectedRoute from '../components/auth/ProtectedRoute';


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

      </Routes>
    </Router>
  );
};

export default AppRoutes;
