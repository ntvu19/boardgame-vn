const AdminController = require('../controllers/admin.controller');
const Auth = require('../middlewares/auth.middleware');
const express = require('express');
const router = express.Router();

router.post('/login', AdminController.loginAsAdmin);
router.post('/register', AdminController.registerAdminAccount);
router.get('/view-all-user', Auth.isAdmin, AdminController.viewAllUser);
router.put('/block-user/:id', Auth.isAdmin, AdminController.blockOrUnblockUser);
router.post('/add-product', Auth.isAdmin, AdminController.addProduct);


/**
 * 1. Cập nhật sản phẩm
 * 2. Xoá sản phẩm
 * 3. Lấy đơn hàng
 * 4. Cập nhật trạng thái đơn hàng
 */

module.exports = router;