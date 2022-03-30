const AdminModel = require('../models/admin.model')
const ProductModel = require('../models/product.model')
const OrderModel = require('../models/order.model')
const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

class AdminController {

    index(req, res, next) {
        res.render('admin/home', { layout: 'admin' })
    }

    categoryPage(req, res, next) {
        res.render('admin/category', { layout: 'admin' })
    }

    revenuePage(req, res, next) {
        res.render('admin/revenue', { layout: 'admin' })
    }

    orderPage(req, res, next) {
        res.render('admin/order', { layout: 'admin' })
    }

    customerPage(req, res, next) {
        res.render('admin/customer', { layout: 'admin' })
    }

    adminPage(req, res, next) {
        res.render('admin/admin', { layout: 'admin' })
    }

    feedbackPage(req, res, next) {
        res.render('admin/feedback', { layout: 'admin' })
    }

    login(req, res, next) {
        res.render('admin/login')
    }

    productPage(req, res, next) {
        ProductModel.find({})
            .then(product => {
                res.render('admin/product', {
                    layout: 'admin',
                    products: product.map(mongoose => mongoose.toObject())
                })
            })
    }

    addProduct(req, res, next) {
        const newProduct = new ProductModel(req.body)
        newProduct.save()
            .then(() => res.redirect('back'))
            .catch(err => console.log(err))
    }

    deleteProduct(req, res, next) {
        ProductModel.findByIdAndDelete(req.params.id)
            .then(() => res.redirect('back'))
            .catch(err => console.log(err))
    }

    updateProduct(req, res, next) {
        ProductModel.findByIdAndUpdate(req.params.id, req.body)
            .then(() => res.redirect('back'))
            .catch(err => console.log(err))
    }



    /**
     * @route [POST] /api/admin/login
     * @desc Login as administrator role
     * @access public
     */
    loginAsAdmin(req, res, next) {
        AdminModel.findOne({
                username: req.body.username,
            })
            .then(admin => {
                if (!admin) {
                    return res.status(401).json({
                        message: 'Incorrectly username or password',
                    })
                }
                bcrypt.compare(req.body.password, admin.password)
                    .then(success => {
                        if (!success) {
                            return res.status(401).json({
                                message: 'Incorrectly username or password',
                            })
                        }
                        return res.status(200).json({
                            userId: admin._id,
                            username: admin.username,
                            role: 'admin',
                            token: admin.token,
                        })
                    })
            })
            .catch(err => {
                return res.status(500).json({
                    message: err,
                })
            })
    }

    /**
     * @route [POST] /api/admin/register
     * @desc Sign up an administrator account
     * @access public
     */
    registerAdminAccount(req, res, next) {
        AdminModel.findOne({
                username: req.body.username,
            })
            .then(admin => {
                if (admin) {
                    return res.status(400).json({
                        message: 'Account Has Already Existed',
                    })
                }
                const newAdmin = new AdminModel(req.body)

                // Generating a token
                const token = jwt.sign({
                    userId: newAdmin._id,
                    username: newAdmin.username,
                    role: 'admin',
                }, process.env.SECRET_KEY)
                newAdmin.token = token

                // Hashing password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newAdmin.password, salt, (err, hashedPassword) => {
                        newAdmin.password = hashedPassword
                            // Save the new account to the database
                        newAdmin.save()
                            .then(() => {
                                return res.status(200).json({
                                    message: 'Sign Up Successfully',
                                })
                            })
                            .catch(err => {
                                return res.status(500).json({
                                    message: err,
                                })
                            })
                    })
                })
            })
            .catch(err => {
                return res.status(500).json({
                    message: err,
                })
            })
    }

    /**
     * @route [GET] /api/admin/view-all-user
     * @desc View all user information
     * @access private
     */
    viewAllUser(req, res, next) {
        UserModel.find({})
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        message: 'User Not Found',
                    })
                }
                let userList = []
                user.forEach(el => {
                    userList.push({
                        username: el.username,
                        email: el.email,
                        fullName: el.fullName,
                        birthday: el.birthday,
                        gender: el.gender,
                        blocked: el.blocked,
                        active: el.active,
                        createAt: el.createAt
                    })
                })
                return res.status(200).json(userList)
            })
            .catch(err => {
                return res.status(500).json({
                    message: err,
                })
            })
    }

    /**
     * @route [PUT] /api/admin/block-user/:id?block={true, false}
     * @desc Blocking or Unblocking an user
     * @access private
     */
    blockOrUnblockUser(req, res, next) {
        const userId = req.params.id
        const blockQuery = req.query.block
        if (['true', 'false'].includes(blockQuery)) {
            UserModel.findByIdAndUpdate(userId, { blocked: blockQuery })
                .then(() => {
                    return res.status(200).json({
                        message: 'Blocking / Unblocking Successfully',
                    })
                })
                .catch(err => {
                    return res.status(500).json({
                        message: err,
                    })
                })
        } else {
            return res.status(400).json({
                message: 'Wrong Query',
            })
        }
    }

    /** 
     * @route [PUT] /api/admin/update-status-order/:id
     * @desc Update status order to database
     * @access private
     */

    updateOrder(req, res, next) {
        OrderModel.findByIdAndUpdate(req.params.id, req.body)
            .then(() => {
                return res.status(200).json({
                    message: 'Updating Order Successfully',
                })
            })
            .catch(err => {
                return res.status(500).json({
                    message: err,
                })
            })
    }
}

module.exports = new AdminController()