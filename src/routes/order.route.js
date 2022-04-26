const OrderController = require('../controllers/order.controller')
const express = require('express')
const router = express.Router()

router.get('/api/get-order', OrderController.getOrderList)
router.put('/api/update-method', OrderController.updateMethod)
router.post('/api/new-order', OrderController.createNewOrder)
router.get('/', OrderController.index)


module.exports = router