import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

export const stockService = {
    // Ürün listesini getir
    getProducts: async () => {
        try {
            const response = await axios.get(`${API_URL}/products`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Yeni ürün ekle
    addProduct: async (productData) => {
        try {
            const response = await axios.post(`${API_URL}/products`, productData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Ürün güncelle
    updateProduct: async (id, productData) => {
        try {
            const response = await axios.put(`${API_URL}/products/${id}`, productData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Ürün sil
    deleteProduct: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/products/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default stockService;
