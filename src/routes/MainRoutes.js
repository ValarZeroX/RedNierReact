import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Main/Home';
import Register from '../pages/auth/Register';
import Login from '../components/auth/Login';
import VerifyEmail from '../pages/auth/VerifyEmail';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
      <Route path="verify-email" element={<VerifyEmail />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
