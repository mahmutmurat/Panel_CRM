const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Müşteri adı zorunludur"]
  },
  email: {
    type: String,
    required: [true, "Email zorunludur"],
    unique: true
  },
  phone: {
    type: String,
    required: [true, "Telefon numarası zorunludur"]
  },
  address: {
    type: String,
    required: [true, "Adres zorunludur"]
  },
  notes: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
