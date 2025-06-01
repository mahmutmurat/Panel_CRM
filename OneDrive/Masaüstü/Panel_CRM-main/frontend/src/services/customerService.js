import axios from 'axios';

const API_URL = 'http://localhost:5001/api/customers';

// Token'ı header'a ekleyen yardımcı fonksiyon
const authHeader = () => {
  const token = localStorage.getItem('kolayPanelToken');
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

// Tüm müşterileri getir
const getCustomers = async () => {
  try {
    const response = await axios.get(API_URL, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Müşteriler getirilirken bir hata oluştu';
  }
};

// Müşteri detayını getir
const getCustomerById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Müşteri detayı getirilirken bir hata oluştu';
  }
};

// Yeni müşteri oluştur
const createCustomer = async (customerData) => {
  try {
    const response = await axios.post(API_URL, customerData, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Müşteri oluşturulurken bir hata oluştu';
  }
};

// Müşteri bilgilerini güncelle
const updateCustomer = async (id, customerData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, customerData, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Müşteri güncellenirken bir hata oluştu';
  }
};

// Müşteri sil
const deleteCustomer = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Müşteri silinirken bir hata oluştu';
  }
};

const customerService = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
};

export default customerService;
