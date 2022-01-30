const OrderController = require('../controllers/order.controller');
const express = require('express');
const router = express.Router();

router.get('/view', OrderController.viewAll);
router.get('/view-detail-order/:id', OrderController.viewDetailOrder);

/**
 * 1. Lấy danh sách đơn hàng #
 * 2. Chi tiết đơn hàng #
 * 3. Tạo đơn hàng
 */

module.exports = router;