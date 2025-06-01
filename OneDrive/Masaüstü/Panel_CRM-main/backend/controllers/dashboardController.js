const Customer = require('../models/Customer');
const Product = require('../models/Product');
const Invoice = require('../models/Invoice');

// Dashboard istatistiklerini getir
const getDashboardStats = async (req, res) => {
  try {
    // Toplam müşteri sayısı
    const totalCustomers = await Customer.countDocuments({ createdBy: req.user._id });

    // Düşük stoklu ürün sayısı
    const lowStockProducts = await Product.countDocuments({
      createdBy: req.user._id,
      $expr: { $lte: ['$stock', '$lowStockThreshold'] }
    });

    // Ödenmemiş fatura sayısı
    const unpaidInvoices = await Invoice.countDocuments({
      createdBy: req.user._id,
      status: 'Beklemede'
    });

    // Toplam ürün sayısı
    const totalProducts = await Product.countDocuments({ createdBy: req.user._id });

    // Bu ayki toplam satış
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const monthlySales = await Invoice.aggregate([
      {
        $match: {
          createdBy: req.user._id,
          status: 'Ödendi',
          createdAt: { $gte: startOfMonth }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$total' }
        }
      }
    ]);

    // Vadesi geçmiş fatura sayısı
    const overdueInvoices = await Invoice.countDocuments({
      createdBy: req.user._id,
      status: 'Beklemede',
      dueDate: { $lt: new Date() }
    });

    // Son 5 fatura
    const recentInvoices = await Invoice.find({ createdBy: req.user._id })
      .populate('customer', 'name')
      .sort({ createdAt: -1 })
      .limit(5)
      .select('invoiceNumber customer total status createdAt');

    // Son 5 müşteri
    const recentCustomers = await Customer.find({ createdBy: req.user._id })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email phone createdAt');

    // Düşük stoklu ürünler
    const lowStockProductsList = await Product.find({
      createdBy: req.user._id,
      $expr: { $lte: ['$stock', '$lowStockThreshold'] }
    })
      .sort({ stock: 1 })
      .limit(5)
      .select('name stock lowStockThreshold');

    const stats = {
      totalCustomers,
      lowStockProducts,
      unpaidInvoices,
      totalProducts,
      monthlySales: monthlySales.length > 0 ? monthlySales[0].total : 0,
      overdueInvoices,
      recentInvoices,
      recentCustomers,
      lowStockProductsList
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Aylık satış grafiği verisi
const getMonthlySalesChart = async (req, res) => {
  try {
    const startOfYear = new Date();
    startOfYear.setMonth(0, 1);
    startOfYear.setHours(0, 0, 0, 0);

    const monthlySales = await Invoice.aggregate([
      {
        $match: {
          createdBy: req.user._id,
          status: 'Ödendi',
          createdAt: { $gte: startOfYear }
        }
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          total: { $sum: '$total' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id': 1 }
      }
    ]);

    // 12 aylık veri oluştur (eksik aylar için 0 değeri)
    const months = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];

    const chartData = months.map((month, index) => {
      const monthData = monthlySales.find(item => item._id === index + 1);
      return {
        month,
        sales: monthData ? monthData.total : 0,
        invoiceCount: monthData ? monthData.count : 0
      };
    });

    res.json(chartData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getMonthlySalesChart
};
