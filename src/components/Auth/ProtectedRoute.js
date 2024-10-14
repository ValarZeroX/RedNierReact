import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../services/authService';

const ProtectedRoute = () => {
  const [isAuth, setIsAuth] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await isAuthenticated();
      setIsAuth(authStatus);
      console.log('ProtectedRoute: isAuth:', authStatus);
    };
    checkAuth();
  }, []);

  console.log('ProtectedRoute: Current location:', location.pathname);

  if (isAuth === null) {
    return <div>Loading...</div>; // 或者其他加載指示器
  }

  if (!isAuth) {
    console.log('ProtectedRoute: User is not authenticated, redirecting to home');
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  console.log('ProtectedRoute: User is authenticated, rendering protected content');
  return <Outlet />;
};

export default ProtectedRoute;
