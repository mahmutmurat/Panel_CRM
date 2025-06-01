const mongoose = require('mongoose');

const invoiceItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: [true, "Miktar zorunludur"],
    min: [1, "Miktar en az 1 olmalıdır"]
  },
  price: {
    type: Number,
    required: [true, "Fiyat zorunludur"],
    min: [0, "Fiyat 0'dan küçük olamaz"]
  },
  total: {
    type: Number,
    required: true
  }
});

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: [true, "Fatura numarası zorunludur"],
    unique: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  items: [invoiceItemSchema],
  subtotal: {
    type: Number,
    required: true
  },
  tax: {
    type: Number,
    required: true,
    default: 0
  },
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Ödendi', 'Beklemede', 'İptal Edildi'],
    default: 'Beklemede'
  },
  dueDate: {
    type: Date,
    required: true
  },
  notes: String,
  splits: [
    {
      assignedToType: {
        type: String,
        enum: ['Client', 'Department', 'Employee', 'Project'],
        required: true
      },
      assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'splits.assignedToType'
      },
      splitType: {
        type: String,
        enum: ['Equal', 'Percentage', 'Fixed'],
        required: true
      },
      amountDue: {
        type: Number,
        required: true,
        min: 0
      },
      amountPaid: {
        type: Number,
        default: 0,
        min: 0
      },
      status: {
        type: String,
        enum: ['Unpaid', 'Partial', 'Paid'],
        default: 'Unpaid'
      },
      notes: String
    }
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

// Fatura ödendi mi kontrolü
invoiceSchema.virtual('isPaid').get(function() {
  return this.status === 'Ödendi';
});

// Fatura vadesi geçti mi kontrolü
invoiceSchema.virtual('isOverdue').get(function() {
  return !this.isPaid && this.dueDate < new Date();
});

module.exports = mongoose.model('Invoice', invoiceSchema);
