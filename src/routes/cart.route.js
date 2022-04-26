const CartController = require('../controllers/cart.controller')
const express = require('express')
const router = express.Router()


router.get('/api/cart-data', CartController.getCartData)
router.post('/add', CartController.addToCart)
router.get('/', CartController.index)

module.exports = router