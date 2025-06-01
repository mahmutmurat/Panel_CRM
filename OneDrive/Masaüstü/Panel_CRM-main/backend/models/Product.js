const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Ürün adı zorunludur"]
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: [true, "Fiyat zorunludur"],
    min: [0, "Fiyat 0'dan küçük olamaz"]
  },
  stock: {
    type: Number,
    required: [true, "Stok miktarı zorunludur"],
    min: [0, "Stok miktarı 0'dan küçük olamaz"]
  },
  lowStockThreshold: {
    type: Number,
    default: 10,
    min: [0, "Düşük stok eşiği 0'dan küçük olamaz"]
  },
  category: {
    type: String,
    required: [true, "Kategori zorunludur"]
  },
  sku: {
    type: String,
    required: [true, "Stok kodu zorunludur"],
    unique: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

// Stok durumu düşük mü kontrolü
productSchema.virtual('isLowStock').get(function() {
  return this.stock <= this.lowStockThreshold;
});

module.exports = mongoose.model('Product', productSchema);
