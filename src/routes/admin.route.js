const AdminController = require('../controllers/admin.controller')
const Auth = require('../middlewares/auth.middleware')
const express = require('express')
const router = express.Router()

router.get('/view-all-user', Auth.isAdmin, AdminController.viewAllUser)
router.put('/block-user/:id', Auth.isAdmin, AdminController.blockOrUnblockUser)
router.put('/update-status-order/:id', Auth.isAdmin, AdminController.updateOrder)


// Official
// Product
router.get('/product', AdminController.productPage)
router.put('/product/update/:id', AdminController.updateProduct) // Auth.isAdmin
router.delete('/product/delete/:id', AdminController.deleteProduct) // Auth.isAdmin
router.post('/product/add', AdminController.addProduct) // Auth.isAdmin

router.get('/category', AdminController.categoryPage)
router.get('/revenue', AdminController.revenuePage)
router.get('/order', AdminController.orderPage)
router.get('/customer', AdminController.customerPage)
router.get('/feedback', AdminController.feedbackPage)

// Admin
router.get('/admin', AdminController.adminPage)
router.put('/admin/update/:id', AdminController.updateAdmin)
router.delete('/admin/delete/:id', AdminController.deleteAdmin)
router.post('/admin/add', AdminController.addAdmin)

// Login, register, logout
router.get('/logout', AdminController.logout)
router.post('/register', AdminController.adminRegister)
router.post('/login', AdminController.adminLogin)
router.get('/login', AdminController.loginPage)

// Index
router.get('/', AdminController.index)


module.exports = router