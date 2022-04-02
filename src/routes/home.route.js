const HomeController = require('../controllers/home.controller')
const express = require('express')
const router = express.Router()

router.post('/register', HomeController.userRegister)
router.post('/login', HomeController.userLogin)
router.get('/login', HomeController.userLoginPage)
router.get('/', HomeController.index)

module.exports = router