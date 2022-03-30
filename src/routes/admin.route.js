const AdminController = require('../controllers/admin.controller')
const Auth = require('../middlewares/auth.middleware')
const express = require('express')
const router = express.Router()

// router.post('/login', AdminController.loginAsAdmin)
router.post('/register', AdminController.registerAdminAccount)
router.get('/view-all-user', Auth.isAdmin, AdminController.viewAllUser)
router.put('/block-user/:id', Auth.isAdmin, AdminController.blockOrUnblockUser)
router.put('/update-status-order/:id', Auth.isAdmin, AdminController.updateOrder)


// Official
router.get('/product', AdminController.productPage)
router.put('/product/update/:id', AdminController.updateProduct) // Auth.isAdmin
router.delete('/product/delete/:id', AdminController.deleteProduct) // Auth.isAdmin
router.post('/product/add', AdminController.addProduct) // Auth.isAdmin

router.get('/category', AdminController.categoryPage)
router.get('/revenue', AdminController.revenuePage)
router.get('/order', AdminController.orderPage)
router.get('/customer', AdminController.customerPage)
router.get('/admin', AdminController.adminPage)
router.get('/feedback', AdminController.feedbackPage)

router.get('/login', AdminController.login)
router.get('/', AdminController.index)


module.exports = router