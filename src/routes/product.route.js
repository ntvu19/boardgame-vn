const ProductController = require('../controllers/product.controller')
const express = require('express')
const router = express.Router()

router.get('/view-related/:id', ProductController.viewRelated);


router.get('/:offset', ProductController.productSortPagination);
router.get('/api/product-size', ProductController.getProductSize);
// Official
router.get('/:id', ProductController.details);

router.get('/', ProductController.index);

module.exports = router