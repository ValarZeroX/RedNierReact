import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchUserData } from '../../services/authService';

function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    const handleUserAuthentication = async (token) => {
        try {
          // 儲存 token 到 localStorage
          localStorage.setItem('token', token);
          
          // 調用 fetchUserData 函數來獲取用戶數據
          const user = await fetchUserData(token);
          
          if (user) {
            // 獲取用戶數據成功，導航到首頁
            navigate('/');
          }
        } catch (error) {
          console.error('Error during user authentication:', error);
          // 如果出現錯誤，導航到登錄頁面並顯示錯誤消息
        //   navigate('/login?error=auth_failed');
        }
      };


    if (token) {
      // 儲存 token 到 localStorage 或 state management
    //   localStorage.setItem('token', token);
        handleUserAuthentication(token);
      // 導航到首頁
    //   navigate('/');
    } else {
      // 處理錯誤情況
      navigate('/login?error=auth_failed');
    }
  }, [navigate, location]);

  return <div>處理認證中...</div>;
}

export default AuthCallback;
