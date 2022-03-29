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
router.put('/update-product/:id', AdminController.updateProduct) // Auth.isAdmin
router.delete('/delete-product/:id', AdminController.deleteProduct) // Auth.isAdmin
router.post('/add-product', AdminController.addProduct) // Auth.isAdmin
router.get('/login', AdminController.login)
router.get('/', AdminController.index)


module.exports = router