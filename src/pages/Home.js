import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUserData } from '../services/authService';

function Home() {
  const [user, setUser] = useState(null);

  // 在组件加载时，从 localStorage 获取用户数据
  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    const getUserData = async () => {
      const token = localStorage.getItem('token');
      console.log(token);
      if (token) {
        // 调用 getUserData 函数获取用户数据
        const userData = await fetchUserData(token);
        if (userData) {
          setUser(userData); // 设置用户数据到 state
        }
      }
    };

    getUserData(); 
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // 将用户数据转换为对象
    }
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      
      {/* 如果存在用户数据，显示用户已登录 */}
      {user ? (
        <div>
          <p>Logged in as: {user.name}</p>
          <p>User ID: {user.id}</p>
          <Link to="/logout">Logout</Link>
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <Link to="/login">Go to Login</Link>
        </div>
      )}
    </div>
  );
}

export default Home;