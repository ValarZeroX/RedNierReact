import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
console.log("token"+token)
    if (token) {
      // 儲存 token 到 localStorage 或 state management
      localStorage.setItem('token', token);
      
      // 導航到首頁
      navigate('/');
    } else {
      // 處理錯誤情況
      navigate('/login?error=auth_failed');
    }
  }, [navigate, location]);

  return <div>處理認證中...</div>;
}

export default AuthCallback;
