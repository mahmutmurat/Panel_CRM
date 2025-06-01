const Product = require('../models/Product');

// Tüm ürünleri getir
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ createdBy: req.user._id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ürün detayını getir
const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    });
    
    if (!product) {
      return res.status(404).json({ message: 'Ürün bulunamadı' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Yeni ürün oluştur
const createProduct = async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      createdBy: req.user._id
    });
    
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Ürün bilgilerini güncelle
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({ message: 'Ürün bulunamadı' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Ürün sil
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id
    });
    
    if (!product) {
      return res.status(404).json({ message: 'Ürün bulunamadı' });
    }
    
    res.json({ message: 'Ürün başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Düşük stoklu ürünleri getir
const getLowStockProducts = async (req, res) => {
  try {
    const products = await Product.find({
      createdBy: req.user._id,
      $expr: { $lte: ['$stock', '$lowStockThreshold'] }
    });
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Stok güncelle
const updateStock = async (req, res) => {
  try {
    const { quantity } = req.body;
    
    if (typeof quantity !== 'number') {
      return res.status(400).json({ message: 'Geçerli bir miktar giriniz' });
    }
    
    const product = await Product.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    });
    
    if (!product) {
      return res.status(404).json({ message: 'Ürün bulunamadı' });
    }
    
    const newStock = product.stock + quantity;
    
    if (newStock < 0) {
      return res.status(400).json({ message: 'Stok miktarı 0\'dan küçük olamaz' });
    }
    
    product.stock = newStock;
    await product.save();
    
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getLowStockProducts,
  updateStock
};
