import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Main/Home';
import Register from '../pages/auth/Register';
import Login from '../components/auth/Login';
import RegisterSuccess from '../pages/auth/RegisterSuccess';
import VerifyEmail from '../pages/auth/VerifyEmail';
import NotFoundTitle from '../pages/errors/NotFoundTitle';
import AuthCallback from '../components/auth/AuthCallback';
import CommunityList from '../pages/CommunityList';

const MainRoutes = () => {
  return (
    <Routes>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="register-success" element={<RegisterSuccess />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="/communities/:subCategoryId" element={<CommunityList />} />

        {/* 單獨的路由 */}
        <Route path="/auth/callback" element={<AuthCallback />} />
        {/* 404 路由，確保放在所有路由的最末尾 */}
        <Route path="*" element={<NotFoundTitle />} />  
    </Routes>
  );
};

export default MainRoutes;
