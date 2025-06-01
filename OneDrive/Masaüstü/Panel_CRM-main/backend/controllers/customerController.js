const Customer = require('../models/Customer');

// Tüm müşterileri getir
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ createdBy: req.user.id })
      .sort({ createdAt: -1 });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Müşteri detayını getir
const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      _id: req.params.id,
      createdBy: req.user.id
    });
    
    if (!customer) {
      return res.status(404).json({ message: 'Müşteri bulunamadı' });
    }
    
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Yeni müşteri oluştur
const createCustomer = async (req, res) => {
  try {
    const { name, email, phone, address, notes } = req.body;

    // Email kontrolü
    const existingCustomer = await Customer.findOne({ 
      email, 
      createdBy: req.user.id 
    });
    
    if (existingCustomer) {
      return res.status(400).json({ 
        message: 'Bu email adresi ile kayıtlı bir müşteri zaten var' 
      });
    }

    const customer = new Customer({
      name,
      email,
      phone,
      address,
      notes,
      createdBy: req.user.id
    });

    const savedCustomer = await customer.save();
    res.status(201).json(savedCustomer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Müşteri güncelle
const updateCustomer = async (req, res) => {
  try {
    const { name, email, phone, address, notes } = req.body;

    // Email değiştiyse, yeni email'in başka müşteride kullanılmadığından emin ol
    if (email) {
      const existingCustomer = await Customer.findOne({
        email,
        createdBy: req.user.id,
        _id: { $ne: req.params.id }
      });

      if (existingCustomer) {
        return res.status(400).json({
          message: 'Bu email adresi ile kayıtlı başka bir müşteri zaten var'
        });
      }
    }

    const customer = await Customer.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      { name, email, phone, address, notes },
      { new: true, runValidators: true }
    );

    if (!customer) {
      return res.status(404).json({ message: 'Müşteri bulunamadı' });
    }

    res.json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Müşteri sil
const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id
    });

    if (!customer) {
      return res.status(404).json({ message: 'Müşteri bulunamadı' });
    }

    res.json({ message: 'Müşteri başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
};
