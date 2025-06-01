import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

export const invoiceService = {
    // Fatura listesini getir
    getInvoices: async () => {
        try {
            const response = await axios.get(`${API_URL}/invoices`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Yeni fatura oluştur
    createInvoice: async (invoiceData) => {
        try {
            const response = await axios.post(`${API_URL}/invoices`, invoiceData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Fatura detayını getir
    getInvoiceById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/invoices/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Fatura güncelle
    updateInvoice: async (id, invoiceData) => {
        try {
            const response = await axios.put(`${API_URL}/invoices/${id}`, invoiceData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Fatura sil
    deleteInvoice: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/invoices/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // PDF olarak dışa aktar
    exportInvoicePDF: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/invoices/${id}/pdf`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                responseType: 'blob'
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default invoiceService;
