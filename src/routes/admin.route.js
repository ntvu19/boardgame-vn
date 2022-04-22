const AdminController = require('../controllers/admin.controller')
const Auth = require('../middlewares/auth.middleware')
const express = require('express')
const router = express.Router()

// router.get('/view-all-user', Auth.isAdmin, AdminController.viewAllUser)
// router.put('/block-user/:id', Auth.isAdmin, AdminController.blockOrUnblockUser)
// router.put('/update-status-order/:id', Auth.isAdmin, AdminController.updateOrder)


// Official
// Product
router.get('/product', Auth.isAdmin, AdminController.productPage)
router.get('/api/product-size', Auth.isAdmin, AdminController.getProductSize)
router.get('/product/:offset', Auth.isAdmin, AdminController.productPagination)
router.get('/product/detail/:id', Auth.isAdmin, AdminController.getProductDetail)
router.put('/product/update/:id', Auth.isAdmin, AdminController.updateProduct)
router.delete('/product/delete/:id', Auth.isAdmin, AdminController.deleteProduct)
router.post('/product/add', Auth.isAdmin, AdminController.addProduct)

router.get('/category', Auth.isAdmin, AdminController.categoryPage)
router.get('/revenue', Auth.isAdmin, AdminController.revenuePage)
router.get('/order', Auth.isAdmin, AdminController.orderPage)
router.get('/customer', Auth.isAdmin, AdminController.customerPage)
router.get('/feedback', Auth.isAdmin, AdminController.feedbackPage)

// Admin
router.get('/admin', Auth.isAdmin, AdminController.adminPage)
router.put('/admin/update/:id', Auth.isAdmin, AdminController.updateAdmin)
router.delete('/admin/delete/:id', Auth.isAdmin, AdminController.deleteAdmin)
router.post('/admin/add', Auth.isAdmin, AdminController.addAdmin)

// Login, register, logout
router.get('/logout', AdminController.logout)
router.post('/register', AdminController.adminRegister)
router.post('/login', AdminController.adminLogin)
router.get('/login', AdminController.loginPage)

// Index
router.get('/', Auth.isAdmin, AdminController.index)


module.exports = router