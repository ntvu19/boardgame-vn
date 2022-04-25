const AdminController = require('../controllers/admin.controller')
const Auth = require('../middlewares/auth.middleware')
const express = require('express')
const router = express.Router()
const multer = require('../configs/multer')
const imageUpload = multer.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }, { name: 'image5', maxCount: 1 }])

// router.get('/view-all-user', Auth.isAdmin, AdminController.viewAllUser)
// router.put('/block-user/:id', Auth.isAdmin, AdminController.blockOrUnblockUser)
// router.put('/update-status-order/:id', Auth.isAdmin, AdminController.updateOrder)

//User
router.get('/api/user-size',Auth.isAdmin, AdminController.getUserSize)
router.get('/user/list/:offset',Auth.isAdmin,  AdminController.userPagination)
router.get('/user/search', AdminController.userSearch);

// router.get('/customer', Auth.isAdmin, AdminController.userIndex);

// Official
router.get('/view-all-user', Auth.isAdmin, AdminController.viewAllUser)
router.put('/block-user/:id', Auth.isAdmin, AdminController.blockOrUnblockUser)
router.put('/update-status-order/:id', Auth.isAdmin, AdminController.updateOrder)


// Product
router.get('/api/product-size', Auth.isAdmin, AdminController.getProductSize)
router.get('/product/detail/:id', Auth.isAdmin, AdminController.getProductDetail)
router.put('/product/update/:id', Auth.isAdmin, AdminController.updateProduct)
router.delete('/product/delete/:id', Auth.isAdmin, AdminController.deleteProduct)
router.post('/product/add', imageUpload, Auth.isAdmin, AdminController.addProduct)
router.get('/product/:offset', Auth.isAdmin, AdminController.productPagination)
router.get('/product', Auth.isAdmin, AdminController.productPage)

// Category
router.delete('/category/delete/:id', Auth.isAdmin, AdminController.deleteCategory)
router.put('/category/update/:id', Auth.isAdmin, AdminController.updateCategory)
router.post('/category/add', Auth.isAdmin, AdminController.addCategory)
router.get('/category/detail/:id', Auth.isAdmin, AdminController.categoryDetail)
router.get('/category', Auth.isAdmin, AdminController.categoryPage)

// Other
router.get('/revenue', Auth.isAdmin, AdminController.revenuePage)
router.get('/order', Auth.isAdmin, AdminController.orderPage)
router.get('/customer', Auth.isAdmin, AdminController.customerPage)
router.get('/feedback', Auth.isAdmin, AdminController.feedbackPage)

// Admin
router.put('/admin/update/:id', Auth.isAdmin, AdminController.updateAdmin)
router.delete('/admin/delete/:id', Auth.isAdmin, AdminController.deleteAdmin)
router.post('/admin/add', Auth.isAdmin, AdminController.addAdmin)
router.get('/admin', Auth.isAdmin, AdminController.adminPage)

// Login, register, logout
router.get('/logout', AdminController.logout)
router.post('/register', AdminController.adminRegister)
router.post('/login', AdminController.adminLogin)
router.get('/login', AdminController.loginPage)

// Index
router.get('/', Auth.isAdmin, AdminController.index)


module.exports = router