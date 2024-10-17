import axios from 'axios';
import { getCookie } from '../utils/cookie'; 
// ... 其他現有的函數 ...

export const updateUserSettings = async (settings) => {
  try {
    await axios.get('http://localhost/sanctum/csrf-cookie', { withCredentials: true });
    const response = await axios.post('http://localhost/api/user/settings', settings, {
        withCredentials: true,
        withXSRFToken: true,
        headers: {
            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
            'Accept-Language': 'zhHant',
        }
    });
    return response.data;
  } catch (error) {
    // 你可以根據需要處理錯誤
    console.error('Error updating user settings:', error);
    throw error;
  }
};
