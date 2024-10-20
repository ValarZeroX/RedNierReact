import axios from 'axios';

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

export const communityService = {
  getCommunities,
};
