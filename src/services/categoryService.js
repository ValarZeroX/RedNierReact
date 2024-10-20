import axios from 'axios';

export const createCategory = async (categoryData) => {
  try {
    const response = await axios.post('http://localhost/api/categories', categoryData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost/api/categories', {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
