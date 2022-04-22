const ProductController = require('../controllers/product.controller')
const express = require('express')
const router = express.Router()

router.get('/view-related/:id', ProductController.viewRelated)

// Official
router.get('/search', ProductController.searchProduct)
router.get('/:id', ProductController.details)
router.get('/', ProductController.index)

module.exports = router