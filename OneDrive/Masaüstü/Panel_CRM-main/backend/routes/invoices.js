const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoiceStatus,
  getUnpaidInvoices,
  getOverdueInvoices
} = require('../controllers/invoiceController');

router.route('/')
  .all(protect)
  .get(getInvoices)
  .post(createInvoice);

router.route('/unpaid')
  .all(protect)
  .get(getUnpaidInvoices);

router.route('/overdue')
  .all(protect)
  .get(getOverdueInvoices);

router.route('/:id')
  .all(protect)
  .get(getInvoiceById);

router.route('/:id/status')
  .all(protect)
  .patch(updateInvoiceStatus);

module.exports = router;
