const ProductController = require('../controllers/product.controller');
const express = require('express');
const router = express.Router();

router.get('/view-detail/:id', ProductController.viewDetail);
router.get('/view-related/:id', ProductController.viewRelated);

module.exports = router;