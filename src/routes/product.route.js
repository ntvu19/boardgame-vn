const ProductController = require('../controllers/product.controller')
const express = require('express')
const router = express.Router()

router.get('/view-all', ProductController.getListProduct)
router.get('/view-detail/:id', ProductController.viewDetail)
router.get('/view-related/:id', ProductController.viewRelated)

// Official
router.get('/:id', ProductController.details)
router.get('/', ProductController.index)

module.exports = router