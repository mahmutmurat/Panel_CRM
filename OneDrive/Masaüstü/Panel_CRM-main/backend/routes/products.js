const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getLowStockProducts,
  updateStock
} = require('../controllers/productController');

router.route('/')
  .all(protect)
  .get(getProducts)
  .post(createProduct);

router.route('/low-stock')
  .all(protect)
  .get(getLowStockProducts);

router.route('/:id')
  .all(protect)
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

router.route('/:id/stock')
  .all(protect)
  .patch(updateStock);

module.exports = router;
