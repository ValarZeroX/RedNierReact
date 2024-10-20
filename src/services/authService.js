import axios from 'axios';
import { getCookie } from '../utils/cookie'; 
import { store } from '../store';
import { setUser, clearUser } from '../store/userSlice';

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
    await axios.post('http://localhost/api/logout', {}, {
      withCredentials: true,
      withXSRFToken: true,
      headers: {
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
      }
    });

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    store.dispatch(clearUser());
    window.location.href = '/';
  } catch (error) {
    console.error('登出失败:', error);
    store.dispatch(clearUser());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  }
};

// 获取用户数据函数
export const fetchUserData = async () => {
  try {
    const response = await axios.get('http://localhost/api/user', {
      withCredentials: true,
    });

    const user = {
      id: response.data.id,
      name: response.data.name,
      language: response.data.language,
      theme: response.data.theme,
    };

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('language', response.data.language);
    localStorage.setItem('mantine-color-scheme-value', response.data.theme);

    return user;
  } catch (error) {
    console.error('Error fetching user data:', error);
    if (error.response && (error.response.status === 401 || error.response.status === 409)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    throw error;
  }
};

export const isAuthenticated = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }
  
  try {
    const user = await fetchUserData();
    store.dispatch(setUser(user));
    return true;
  } catch (error) {
    console.error('Error verifying authentication:', error);
    // 如果是 401 或 403 錯誤，清除本地存儲的 token
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem('token');
      store.dispatch(clearUser());
    }
    return false;
  }
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
    await axios.get('http://localhost/sanctum/csrf-cookie', { withCredentials: true });

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

    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      const userData = await fetchUserData();
      store.dispatch(setUser(userData));
      return userData;
    }

    return null;
  } catch (error) {
    console.error('登录失败:', error);
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
