const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');

// Category
router.get('/view', CategoryController.view);
router.get('/view/:id', CategoryController.viewDetails);
router.post('/create', AuthMiddleware.isAdmin, CategoryController.create); // Test
router.put('/add-product/:id', AuthMiddleware.isAdmin, CategoryController.addProduct); // Test
router.put('/edit/:id', AuthMiddleware.isAdmin, CategoryController.editCategory); // Test
router.delete('/delete/:id', AuthMiddleware.isAdmin, CategoryController.removeCategory); // Test

module.exports = router;