import axios from 'axios';

const API_URL = 'http://localhost:5001/api/dashboard';

// Token'ı header'a ekleyen yardımcı fonksiyon
const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
};

// Dashboard istatistiklerini getir
const getDashboardStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/stats`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Dashboard istatistikleri getirilirken bir hata oluştu';
  }
};

// Aylık satış grafiği verilerini getir
const getMonthlySalesChart = async () => {
  try {
    const response = await axios.get(`${API_URL}/sales-chart`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Satış grafiği verileri getirilirken bir hata oluştu';
  }
};

const dashboardService = {
  getDashboardStats,
  getMonthlySalesChart
};

export default dashboardService;
