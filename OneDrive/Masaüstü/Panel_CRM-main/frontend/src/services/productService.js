import axios from 'axios';

const API_URL = 'http://localhost:5001/api/products';

// Token'ı header'a ekleyen yardımcı fonksiyon
const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
};

// Tüm ürünleri getir
const getProducts = async () => {
  try {
    const response = await axios.get(API_URL, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Ürünler getirilirken bir hata oluştu';
  }
};

// Ürün detayını getir
const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Ürün detayı getirilirken bir hata oluştu';
  }
};

// Yeni ürün oluştur
const createProduct = async (productData) => {
  try {
    const response = await axios.post(API_URL, productData, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Ürün oluşturulurken bir hata oluştu';
  }
};

// Ürün bilgilerini güncelle
const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, productData, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Ürün güncellenirken bir hata oluştu';
  }
};

// Ürün sil
const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Ürün silinirken bir hata oluştu';
  }
};

// Düşük stoklu ürünleri getir
const getLowStockProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/low-stock`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Düşük stoklu ürünler getirilirken bir hata oluştu';
  }
};

// Stok güncelle
const updateStock = async (id, stockData) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}/stock`, stockData, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Stok güncellenirken bir hata oluştu';
  }
};

const productService = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getLowStockProducts,
  updateStock
};

export default productService;
