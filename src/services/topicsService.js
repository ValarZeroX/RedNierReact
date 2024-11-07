import axios from 'axios';
const API_URL = 'http://localhost/api'; // 確保這是正確的 API URL

export const fetchTopics = async (communityId, page = 1, perPage = 15) => {
    try {
        const response = await axios.get(`${API_URL}/topics`, {
            params: {
                community_id: communityId,
                per_page: perPage,
                page: page,
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const fetchTopicDetails = async (topicId, page = 1, perPage = 5) => {
    try {
        const response = await axios.get(`${API_URL}/topics/${topicId}`, {
            params: {
                per_page: perPage,
                page: page,
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};