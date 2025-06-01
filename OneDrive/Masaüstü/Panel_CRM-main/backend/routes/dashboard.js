const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getDashboardStats,
  getMonthlySalesChart
} = require('../controllers/dashboardController');

router.route('/stats')
  .all(protect)
  .get(getDashboardStats);

router.route('/sales-chart')
  .all(protect)
  .get(getMonthlySalesChart);

module.exports = router;
