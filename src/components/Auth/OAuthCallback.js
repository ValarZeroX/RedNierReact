import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserData } from '../../services/authService';

function OAuthCallback() {
  const navigate = useNavigate();
  const [tokenProcessed, setTokenProcessed] = useState(false);
  const [userData, setUserData] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const getUserData = async (token) => {
        try {
          const user = await fetchUserData(token);  // 从 authService 中获取用户数据
          setUserData(user);
          navigate('/');  // 重定向到首页
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      
    if (!tokenProcessed) {
      // 從 URL 中獲取 token
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      console.log('URL 查詢參數: ', urlParams);
      console.log('Token: ', token);

      if (token) {
        // 將 token 保存到 localStorage
        localStorage.setItem('token', token);

        // 標記 token 已經處理
        setTokenProcessed(true);

        // 获取用户资料
        getUserData(token);

      } else {
        // 如果沒有 token，重定向到登錄頁面
        navigate('/login');
      }
    }
  }, [tokenProcessed, navigate]);



  return (
    <div>
      <h2>處理登錄中...</h2>
      {userData && (
        <div>
          <h3>會員資料：</h3>
          <p>名稱: {userData.name}</p>
          <p>電子郵件: {userData.email}</p>
          {/* 顯示其他會員資料 */}
        </div>
      )}
    </div>
  );
}

export default OAuthCallback;