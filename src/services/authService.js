import axios from 'axios';
import { getCookie } from '../utils/cookie'; 

// authService.js
export const loginWithGoogle = async () => {
  try {
    // 先获取 CSRF Cookie
    await axios.get('http://localhost/sanctum/csrf-cookie', { withCredentials: true });

    // 跳转到后端 Google 登录的 OAuth 路径
    window.location.href = 'http://localhost/login/google';
  } catch (error) {
    console.error('获取 CSRF Cookie 失败:', error);
  }
};

export const processTokenFromURL = () => {
  // 从 URL 获取 token 并存储到 localStorage
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  if (token) {
    localStorage.setItem('token', token);
  }
};

// 获取 CSRF Cookie 和进行登出
export const logout = async (token) => {
  try {
    // 先获取 CSRF Token，设置 CSRF Cookie
    await axios.get('http://localhost/sanctum/csrf-cookie', { withCredentials: true });
console.log(getCookie('XSRF-TOKEN'))
//_token: getCookie('XSRF-TOKEN')
    // 发送登出请求
    await axios.post(
      'http://localhost/api/logout',
      {  },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
        },
        withCredentials: true,
      }
    );
    // 清除本地的 token 和用户信息
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login'; // 登出后重定向
  } catch (error) {
    throw new Error('Logout failed');
  }
};

// 获取用户数据函数
export const fetchUserData = async (token) => {
  try {
    const response = await axios.get('http://localhost/api/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    const user = {
      id: response.data.id,
      name: response.data.name,
    };

    // 存储用户信息到 localStorage
    localStorage.setItem('user', JSON.stringify(user));

    return user;  // 返回用户数据
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;  // 将错误抛出，以便在组件中处理
  }
};
