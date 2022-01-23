const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/order.controller');
const UserController = require('../controllers/user.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');

// Order
router.post('/create', AuthMiddleware.verifyToken, OrderController.create);
router.put('/update/:id', AuthMiddleware.isAdmin, OrderController.updateOrder);
router.delete('/remove/:id', AuthMiddleware.verifyToken, OrderController.removeOrder);

/**
 * 
 */

module.exports = router;