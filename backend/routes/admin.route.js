const AdminController = require('../controllers/admin.controller');
const UserController = require('../controllers/user.controller');
const OrderController = require('../controllers/order.controller');
const Auth = require('../middlewares/auth.middleware');
const express = require('express');
const router = express.Router();

router.get('/view-all-user', Auth.isAdmin, AdminController.viewAllUser);

/**
 * 1. Xem danh sách sản phẩm
 * 2. Thêm sản phẩm
 * 3. Cập nhật sản phẩm
 * 4. Xoá sản phẩm
 * 5. Đăng nhập admin
 * 6. Lấy danh sách người dùng
 * 7. Block người dùng
 * 8. Lấy đơn hàng
 * 9. Cập nhật trạng thái đơn hàng
 */

module.exports = router;