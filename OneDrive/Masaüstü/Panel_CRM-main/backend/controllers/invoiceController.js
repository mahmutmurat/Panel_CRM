const Invoice = require('../models/Invoice');
const Product = require('../models/Product');

// Tüm faturaları getir
const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ createdBy: req.user._id })
      .populate('customer', 'name email phone')
      .populate('items.product', 'name price');
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fatura detayını getir
const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    })
      .populate('customer', 'name email phone')
      .populate('items.product', 'name price');
    
    if (!invoice) {
      return res.status(404).json({ message: 'Fatura bulunamadı' });
    }
    
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Yeni fatura oluştur
const createInvoice = async (req, res) => {
  try {
    // Fatura numarası oluştur (örnek: INV-2024-001)
    const date = new Date();
    const year = date.getFullYear();
    const count = await Invoice.countDocuments();
    const invoiceNumber = `INV-${year}-${String(count + 1).padStart(3, '0')}`;

    // Alt toplam ve toplam hesapla
    const subtotal = req.body.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.18; // %18 KDV
    const total = subtotal + tax;

    const invoice = new Invoice({
      ...req.body,
      invoiceNumber,
      subtotal,
      tax,
      total,
      createdBy: req.user._id
    });

    // Stok kontrolü ve güncelleme
    for (const item of invoice.items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Ürün bulunamadı: ${item.product}` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Yetersiz stok: ${product.name} (Mevcut: ${product.stock}, İstenen: ${item.quantity})`
        });
      }
      product.stock -= item.quantity;
      await product.save();
    }
    
    const newInvoice = await invoice.save();
    
    // Populate customer and product details
    await newInvoice.populate('customer', 'name email phone');
    await newInvoice.populate('items.product', 'name price');
    
    res.status(201).json(newInvoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fatura durumunu güncelle
const updateInvoiceStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['Ödendi', 'Beklemede', 'İptal Edildi'].includes(status)) {
      return res.status(400).json({ message: 'Geçersiz fatura durumu' });
    }
    
    const invoice = await Invoice.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      { status },
      { new: true, runValidators: true }
    )
      .populate('customer', 'name email phone')
      .populate('items.product', 'name price');
    
    if (!invoice) {
      return res.status(404).json({ message: 'Fatura bulunamadı' });
    }
    
    res.json(invoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Ödenmemiş faturaları getir
const getUnpaidInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({
      createdBy: req.user._id,
      status: 'Beklemede'
    })
      .populate('customer', 'name email phone')
      .populate('items.product', 'name price');
    
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Vadesi geçmiş faturaları getir
const getOverdueInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({
      createdBy: req.user._id,
      status: 'Beklemede',
      dueDate: { $lt: new Date() }
    })
      .populate('customer', 'name email phone')
      .populate('items.product', 'name price');
    
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoiceStatus,
  getUnpaidInvoices,
  getOverdueInvoices
};
