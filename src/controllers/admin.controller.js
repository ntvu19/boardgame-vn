const AdminModel = require('../models/admin.model')
const ProductModel = require('../models/product.model')
const OrderModel = require('../models/order.model')
const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const productServices = require('../util/producetServices')

const cloudinary = require('../configs/cloudinary.config')


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
                .then(admin => { admin ? res.redirect('/admin') : res.render('admin/login') })
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
                                res.cookie('logged', true)
                                res.cookie('fullName', admin.fullName)
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
                    res.status(403).send({ message: 'Username has already taken' })
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
                                    res.cookie('logged', true)
                                    res.cookie('fullName', newAdmin.fullName)
                                    res.cookie('token', newAdmin.token, { httpOnly: true })
                                    res.status(200).send({ message: 'Success' })
                                })
                        })
                    })
                }
            })
            .catch(err => res.status(400).send({ message: err }))
    }

    // [GET] /admin/logout
    logout(req, res, next) {
        if (req.cookies.token) {
            res.cookie('logged', false)
            res.cookie('fullName', '')
            res.clearCookie('token')
            res.redirect('/admin/login')
        } else {
            res.redirect('/admin/login')
        }
    }

    /**
     * Product
     */
    // [GET] /admin/product
    productPage(req, res, next) {
        res.render('admin/product', { layout: 'admin' })
    }

    // [GET] /admin/api/product-size
    getProductSize(req, res, next) {
        ProductModel.count()
            .then(result => res.status(200).send({ productSize: result }))
            .catch(err => res.status(400).send({ message: err }))
    }

    // [GET] /admin/product/:offset
    productPagination(req, res, next) {
        const maxElement = 4
        const offset = Number.parseInt(req.params.offset)
        ProductModel.find({})
            .then(product => {
                const productSize = product.length
                let productListReturn = []
                for (let i = offset * maxElement; i < (offset + 1) * maxElement; i++) {
                    if (i == productSize) {
                        break
                    }
                    productListReturn.push(product[i])
                }
                res.status(200).send(productListReturn)
            })
            .catch(err => res.status(400).send({ message: err }))
    }

    addProduct(req, res, next) {
        //console.log("pklss");
        //console.log("red:", req.body);
        //console.log("x", req.files);
        if (productServices.checkExist(req.body.name)) {

            let pic1 = '';
            let pic2 = '';
            let pic3 = '';
            let pic4 = '';
            let pic5 = '';

            const fd = 'product/' + req.body.name;
            let newProduct = new ProductModel();

            newProduct.name = req.body.name;
            newProduct.price = req.body.price;
            newProduct.description = req.body.description;
            // req.body
            // console.log(req.body);

            console.log("file", req.files);

            newProduct.save()
                .then(() => res.redirect('back'))
                .catch(err => console.log(err))

                // for (let i in req.files) {

                //     if (req.files[i][0].fieldname == 'image1') {
    
                //         cloudinary.uploader.upload(req.files.image1[0].path, { folder: fd, public_id: 'p1' })
                //             .then(pic1 => {
                //                 newProduct.photo.push(pic1.url);
                //                 newProduct.updateOne({photo: newProduct.photo})
                //                     .then(() => res.redirect('back'))
                //                     .catch(err => console.log(err))
    
                //             })
                //             .catch(err => console.log(err))
                //     }
            for (let i in req.files) {

                if (req.files[i][0].fieldname == 'image1') {

                    cloudinary.uploader.upload(req.files.image1[0].path, { folder: fd, public_id: 'p1' })
                        .then(pic1 => {
                            newProduct.photo.push(pic1.url);
                            newProduct.updateOne({photo: newProduct.photo})
                                .then(() => res.redirect('back'))
                                .catch(err => console.log(err))

                        })
                        .catch(err => console.log(err))
                }
                // else if (req.files[i][0].fieldname == 'image2') {
                //     // console.log(req.files[i], "okddi2", i);
                //     cloudinary.uploader.upload(req.files.image2[0].path, { folder: fd, public_id: 'p2' })
                //         .then(pic2 => {
                //             newProduct.photo.push(pic2.url);
                //         })
                //         .catch(err => console.log(err))
                // }
                // else if (req.files[i][0].fieldname == 'image3') {
                //     cloudinary.uploader.upload(req.files.image3[0].path, { folder: fd, public_id: 'p3' })
                //         .then(pic3 => {
                //             newProduct.photo.push(pic3.url);
                //         })
                //         .catch(err => console.log(err))
                // }
                // else if (req.files[i][0].fieldname == 'image4') {
                //     cloudinary.uploader.upload(req.files.image4[0].path, { folder: fd, public_id: 'p4' })
                //         .then(pic4 => {
                //             newProduct.photo.push(pic4.url);
                //         })
                //         .catch(err => console.log(err))

                // }
                // else if (req.files[i][0].fieldname == 'image5') {
                //     cloudinary.uploader.upload(req.files.image5[0].path, { folder: fd, public_id: 'p5' })
                //         .then(pic5 => {
                //             newProduct.photo.push(pic5.url);
                //         })
                //         .catch(err => console.log(err))
                // }
            }

            /*
            newProduct.discount = req.body.discount;
            newProduct.productType = req.body.type;
            newProduct.stock = req.body.stock;
            newProduct.sold = req.body.sold;
            newProduct.conditions.numberOfPlayer = req.body.numberOfPlayer;
            newProduct.conditions.idealNumberOfPlayer = req.body.idealNumberOfPlayer;
            newProduct.conditions.playingTime = req.body.playingTime;
            newProduct.conditions.age = req.body.age;
            newProduct.conditions.genres.push(req.body.genres);
            newProduct.conditions.mechanisms.push(req.body.mechanisms);
            
    
    
            newProduct.detail.keys.push(req.body.keys);
            newProduct.detail.values.push(req.body.values);
    
    
            newProduct.detail.rules = req.body.rules;
             */


            newProduct.save()
                .then(() => res.redirect('back'))
                .catch(err => console.log(err))
        } else {
            // const rp = 'Product name already exists'
            res.status(400).send("errr")
        }



    };

    // [DELETE] /admin/product/delete/:id
    deleteProduct(req, res, next) {
        ProductModel.findByIdAndDelete(req.params.id)
            .then(() => res.status(200).send({ message: 'success' }))
            .catch(err => res.status(400).send({ message: err }))
    }

    // [PUT] /admin/product/update/:id
    updateProduct(req, res, next) {
        ProductModel.findByIdAndUpdate(req.params.id, req.body)
            .then(() => res.redirect('back'))
            .catch(err => console.log(err))
    }

    // [GET] /admin/product/detail/:id
    getProductDetail(req, res, next) {
        ProductModel.findById(req.params.id)
            .then(product => res.status(200).send(product))
            .catch(err => res.status(400).send({ message: err }))
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
        const newAdmin = new AdminModel(req.body)

        // Generating a token
        const token = jwt.sign({
            userId: newAdmin._id,
            role: 'admin'
        }, process.env.SECRET_KEY)
        newAdmin.token = token
        newAdmin.active = true

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