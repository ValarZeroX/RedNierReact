import axios from 'axios';
import { getCookie } from '../utils/cookie'; 

const API_URL = 'http://localhost/api'; // 確保這是正確的 API URL

const getCommunities = async (subCategoryId, page) => {
  try {
    console.log(`Fetching communities for subCategoryId: ${subCategoryId}, page: ${page}`);
    const response = await axios.get(`${API_URL}/communities/sub-category/${subCategoryId}/page/${page}`);
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching communities:', error);
    throw error;
  }
};

const createCommunity = async (communityData) => {
  try {
    await axios.get('http://localhost/sanctum/csrf-cookie', { withCredentials: true });
    const response = await axios.post(`${API_URL}/communities`, communityData,
        {
            withCredentials: true,
            withXSRFToken: true,
            headers: {
              'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
            }
        }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating community:', error);
    throw error;
  }
};

const getCommunityById = async (communityId) => {
  try {
      const response = await axios.get(`${API_URL}/communities/${communityId}`, {
          withCredentials: true,
      });
      return response.data;
  } catch (error) {
      throw new Error(error.response?.data?.message || '無法獲取社群資料');
  }
};


export const communityService = {
  getCommunities,
  createCommunity,
  getCommunityById
};
