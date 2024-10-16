import axios from 'axios';
import { getCookie } from '../utils/cookie'; 

// authService.js
export const loginWithGoogle = async () => {
  try {
    // 先获取 CSRF Cookie
    await axios.get('http://localhost/sanctum/csrf-cookie', { withCredentials: true });

    // 跳转到后端 Google 登录的 OAuth 路径
    window.location.href = 'http://localhost/api/auth/google';
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
export const logout = async () => {
  try {
    await axios.get('http://localhost/sanctum/csrf-cookie', { withCredentials: true });
    // 调用后端登出接口
    await axios.post('http://localhost/api/logout', {}, {
      withCredentials: true,
      withXSRFToken: true,
      headers: {
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
      }
    });

    // 清除本地存储中的令牌和用户信息
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // 可能还需要重定向到登录页面或首页
    window.location.href = '/';
  } catch (error) {
    console.error('登出失败:', error);
    // 即使后端请求失败，也清除本地存储
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  }
};

// 获取用户数据函数
export const fetchUserData = async (token) => {
  try {
    const response = await axios.get('http://localhost/api/user', {
      headers: {
        // Authorization: `Bearer ${token}`,
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
    if (error.response && (error.response.status === 401 || error.response.status === 409)) {
      console.error('error.respons:', error.respons);
      // 如果认证失败，清空 localStorage 并跳转到首页
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    // throw error;  // 将错误抛出，以便在组件中处理
  }
};

export const isAuthenticated = async () => {
  const token = localStorage.getItem('token');
  console.log('Checking authentication, token exists:', !!token); // 添加这行
  if (!token) {
    return false;
  }
  
  // 这里可以添加向后端验证令牌有效性的逻辑
  // 例如，发送一个请求到后端的验证端点
  
  return true; // 如果令牌有效
};

export const register = async (email, password) => {
  await axios.get('http://localhost/sanctum/csrf-cookie', { withCredentials: true });
  const response = await axios.post('http://localhost/api/register', {
    email,
    password
  },
  {
    withCredentials: true,
    withXSRFToken: true,
    headers: {
      'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
      'Accept-Language': 'zhHant',
    }
  });
  return response.data; // 返回響應數據
};

export const login = async (email, password) => {
  try {
    // 获取 CSRF Cookie
    await axios.get('http://localhost/sanctum/csrf-cookie', { withCredentials: true });

    // 调用后端登录接口
    const response = await axios.post('http://localhost/api/login', {
      email,
      password
    }, {
      withCredentials: true,
      withXSRFToken: true,
      headers: {
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
        'Accept-Language': 'zhHant',
      }
    });

    // 如果登录成功，存储 access_token
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      // return true;
      window.location.href = '/';
    }

    return false;
  } catch (error) {
    // console.error('登录失败:', error);
    // return response.data;
    throw error;
  }
};

export const resendVerificationEmail = async () => {
  await axios.get('http://localhost/sanctum/csrf-cookie', { withCredentials: true });
  const response = await axios.post('http://localhost/api/email/verification-notification', {
  }, {
    withCredentials: true,
    withXSRFToken: true,
    headers: {
      'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
    }
  });
  return response.data;
};
