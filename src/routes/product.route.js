const ProductController = require('../controllers/product.controller')
const express = require('express')
const router = express.Router()

router.get('/view-related/:id', ProductController.viewRelated)

// Official
router.get('/:id', ProductController.details)
router.get('/', ProductController.index)
router.get('/descending', ProductController.descending);

module.exports = router