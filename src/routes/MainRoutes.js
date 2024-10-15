import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Main/Home';
import Register from '../pages/auth/Register';
import Login from '../components/auth/Login';
import RegisterSuccess from '../pages/auth/RegisterSuccess';
import VerifyEmail from '../pages/auth/VerifyEmail';
const MainRoutes = () => {
  return (
    <Routes>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="register-success" element={<RegisterSuccess />} />
        <Route path="verify-email" element={<VerifyEmail />} />
    </Routes>
  );
};

export default MainRoutes;
