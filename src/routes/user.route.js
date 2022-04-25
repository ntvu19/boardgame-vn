const UserController = require('../controllers/user.controller')
const Auth = require('../middlewares/auth.middleware')
const express = require('express')
const router = express.Router()
const multer = require('../configs/multer')
const imageUpload = multer.single('avatar')


// Official

router.get('/active/:id', UserController.activeUser)
router.put('/edit/:id', imageUpload, UserController.editUser)
router.get('/', UserController.userInformation)
router.post('/forgot-password', UserController.forgotPassword);

module.exports = router