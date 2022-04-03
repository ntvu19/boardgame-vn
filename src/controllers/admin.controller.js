const AdminModel = require('../models/admin.model')
const ProductModel = require('../models/product.model')
const OrderModel = require('../models/order.model')
const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

class AdminController {

    // [GET] /admin
    index(req, res, next) {
        if (!req.cookies.token) {
            res.redirect('/admin/login')
        } else {
            const decodedToken = jwt.verify(req.cookies.token, process.env.SECRET_KEY)
            AdminModel.findById(decodedToken.userId)
                .then(admin => {
                    admin ? res.render('admin/home', { layout: 'admin' }) : res.redirect('/admin/login')
                })
                .catch(err => console.log(err))
        }
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

    feedbackPage(req, res, next) {
        res.render('admin/feedback', { layout: 'admin' })
    }

    /**
     * Login, register, logout
     */
    // [GET] /admin/login
    loginPage(req, res, next) {
        if (!req.cookies.token) {
            res.render('admin/login')
        } else {
            const decodedToken = jwt.verify(req.cookies.token, process.env.SECRET_KEY)
            AdminModel.findById(decodedToken.userId)
                .then(admin => {
                    admin ? res.redirect('/admin') : res.render('admin/login')
                })
                .catch(err => console.log(err))
        }
    }

    // [POST] /admin/login
    adminLogin(req, res, next) {
        AdminModel.findOne({ username: req.body.username })
            .then(admin => {
                if (!admin) {
                    res.redirect('back')
                    console.log('Incorrectly username or password')
                } else {
                    bcrypt.compare(req.body.password, admin.password)
                        .then(success => {
                            let announcement = success ? 'Login successfully' : 'Incorrectly username or password'
                            console.log(announcement)

                            if (success) {
                                res.cookie('token', admin.token, { httpOnly: true })
                                res.redirect('/admin')
                            } else {
                                redirect('back')
                            }
                        })
                }
            })
            .catch(err => console.log(err))
    }

    // [POST] /admin/register
    adminRegister(req, res, next) {
        AdminModel.findOne({ username: req.body.username })
            .then(admin => {
                if (admin) {
                    res.redirect('back')
                    console.log('Username has already taken')
                } else {
                    // Create admin
                    const newAdmin = new AdminModel(req.body)

                    // Generating token
                    const token = jwt.sign({
                        userId: newAdmin._id,
                        role: 'admin'
                    }, process.env.SECRET_KEY)
                    newAdmin.token = token

                    // Hashing password
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newAdmin.password, salt, (err, hashed) => {
                            newAdmin.password = hashed
                            newAdmin.save()
                                .then(() => {
                                    res.cookie('token', newAdmin.token, { httpOnly: true })
                                    res.redirect('/admin')
                                })
                        })
                    })
                }
            })
            .catch(err => console.log(err))
    }

    // [GET] /admin/logout
    logout(req, res, next) {
        if (req.cookies.token) {
            res.clearCookie('token')
            res.redirect('/admin/login')
        } else {
            res.redirect('/admin/login')
        }
    }

    /**
     * Product
     */
    productPage(req, res, next) {
        ProductModel.find({})
            .then(product => {
                res.render('admin/product', {
                    layout: 'admin',
                    products: product.map(mongoose => mongoose.toObject())
                })
            })
            .catch(err => console.log(err))
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
     * Customer
     */
    customerPage(req, res, next) {
        res.render('admin/customer', { layout: 'admin' })
    }

    /**
     * Admin
     */
    adminPage(req, res, next) {
        AdminModel.find({})
            .then(admin => {
                res.render('admin/admin', {
                    layout: 'admin',
                    admins: admin.map(mongoose => mongoose.toObject())
                })
            })
            .catch(err => console.log(err))
    }

    addAdmin(req, res, next) {
        // Haven't hashed password yet
        const newAdmin = new AdminModel(req.body)

        // Generating a token
        const token = jwt.sign({
            userId: newAdmin._id,
            role: 'admin'
        }, process.env.SECRET_KEY)
        newAdmin.token = token

        // Hashing password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newAdmin.password, salt, (err, hashed) => {
                newAdmin.password = hashed
                newAdmin.save()
                    .then(() => { res.redirect('back') })
                    .catch(err => console.log(err))
            })
        })
    }

    deleteAdmin(req, res, next) {
        AdminModel.findByIdAndDelete(req.params.id)
            .then(() => res.redirect('back'))
            .catch(err => console.log(err))
    }

    updateAdmin(req, res, next) {
        AdminModel.findByIdAndUpdate(req.params.id, req.body)
            .then(() => res.redirect('back'))
            .catch(err => console.log(err))
    }


    // /**
    //  * @route [POST] /api/admin/login
    //  * @desc Login as administrator role
    //  * @access public
    //  */
    // loginAsAdmin(req, res, next) {
    //     AdminModel.findOne({
    //             username: req.body.username,
    //         })
    //         .then(admin => {
    //             if (!admin) {
    //                 return res.status(401).json({
    //                     message: 'Incorrectly username or password',
    //                 })
    //             }
    //             bcrypt.compare(req.body.password, admin.password)
    //                 .then(success => {
    //                     if (!success) {
    //                         return res.status(401).json({
    //                             message: 'Incorrectly username or password',
    //                         })
    //                     }
    //                     return res.status(200).json({
    //                         userId: admin._id,
    //                         username: admin.username,
    //                         role: 'admin',
    //                         token: admin.token,
    //                     })
    //                 })
    //         })
    //         .catch(err => {
    //             return res.status(500).json({
    //                 message: err,
    //             })
    //         })
    // }

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