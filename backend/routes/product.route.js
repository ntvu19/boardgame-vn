const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');

// Product


/**
 * 1. View all product and its details
 * 2. Search any product
 * 3. Edit information of product
 * 4. Add a product
 * 5. Remove a product
 * 6. Buy a product
 * 7. View all comment
 * 8. Manage all categories and products (pagination*)
 * 9. Check product binding
 * 10. Statistic and Analysis (Sales and products)
 */

module.exports = router;