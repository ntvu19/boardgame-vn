const AdminModel = require('../models/admin.model')
const CategoryModel = require('../models/category.model')
const ProductModel = require('../models/product.model')
const OrderModel = require('../models/order.model')
const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const cloudinary = require('../configs/cloudinary.config')
const { send } = require('express/lib/response')
const { pagination } = require('../configs/pagination')
const { default: mongoose } = require('mongoose')


class AdminController {

    // [GET] /admin
    index(req, res, next) {
        res.render('admin/home', { layout: 'admin' })
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
                .catch(err => res.status(403).send({ message: err }))
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
            .catch(err => res.status(403).send({ message: err }))
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
        CategoryModel.find({})
            .then(category => {
                res.render('admin/product', {
                    layout: 'admin',
                    categories: category.map(mongoose => mongoose.toObject())
                })
            })
            .catch(err => res.status(400).send({ message: err }))
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

    userSearch(req, res, next) {
        const searchField = req.query.term;

        const page = Number(req.params.page) || 1;

        const ItemPerPage = 4;
        UserModel.find({
            $or: [{ fullName: { $regex: searchField, $options: '$i' } }, { email: { $regex: searchField, $options: '$i' } }]
        })
            .skip((ItemPerPage * page) - ItemPerPage)
            .limit(ItemPerPage)
            .then(user => {
                return user;
            })
            .then((user) => {
                UserModel.find({
                    $or: [{ fullName: { $regex: searchField, $options: '$i' } }, { email: { $regex: searchField, $options: '$i' } }]
                })
                    .then(t2 => {
                        const NumberOfUser = t2.length;
                        const pageCount = Math.ceil(NumberOfUser / ItemPerPage)
                        if (pageCount == 1) {
                            res.render('admin/searchResult', {
                                layout: 'admin',
                                Users: user.map(mongoose => mongoose.toObject())
                            })
                        }
                        else {
                            const pageArray = pagination(page, pageCount)
                            res.render('admin/searchResult', {
                                layout: 'admin',
                                pageArray,
                                keyword: searchField,
                                Users: user.map(mongoose => mongoose.toObject())
                            })
                        }

                    })

            })
            .catch(err => res.status(400).send({ message: err }))

    }
    // [GET] /admin/api/user-size
    getUserSize(req, res, next) {
        UserModel.count()
            .then(result => res.status(200).send({ userSize: result }))
            .catch(err => res.status(400).send({ message: err }))
    }

    // [GET] /admin/user/:offset
    userPagination(req, res, next) {
        const maxElement = 4
        const offset = Number.parseInt(req.params.offset)

        UserModel.find({})
            .then(user => {
                const userSize = user.length
                let userListReturn = []
                for (let i = offset * maxElement; i < (offset + 1) * maxElement; i++) {
                    if (i == userSize) {
                        break
                    }
                    userListReturn.push(user[i])
                }
                res.status(200).send(userListReturn)
            })
            .catch(err => res.status(400).send({ message: err }))
    }
    addProduct(req, res, next) {
        //check Exist chưa done check exist với name :V
        ProductModel.findOne({ name: req.body.name }).lean()
            .then(product => {
                if (!product) {
                    let pic1 = '';
                    let pic2 = '';
                    let pic3 = '';
                    let pic4 = '';
                    let pic5 = '';

                    const fd = 'product/' + req.body.name;
                    let newProduct = new ProductModel(req.body);

                    newProduct.name = req.body.name;
                    newProduct.price = req.body.price;
                    newProduct.description = req.body.description;
                    newProduct.categoryId = req.body.categoryId;
                    newProduct.stock = req.body.stock;
                    newProduct.conditions.numberOfPlayer = req.body.numberOfPlayer;
                    newProduct.conditions.playingTime = req.body.playingTime;
                    newProduct.conditions.age = req.body.age;
                    newProduct.conditions.genres.push(req.body.genres);
                    /*         
                    newProduct.conditions.mechanisms.push(req.body.mechanisms);
                    
            
            
                    newProduct.detail.keys.push(req.body.keys);
                    newProduct.detail.values.push(req.body.values);
            
            
                    newProduct.detail.rules = req.body.rules;
                     */


                    for (let i in req.files) {

                        if (req.files[i][0].fieldname == 'image1') {

                            pic1 = cloudinary.uploader.upload(req.files.image1[0].path, { folder: fd, public_id: 'p1' })
                                .then(pic1 => {

                                    return pic1.url;
                                })
                        } else if (req.files[i][0].fieldname == 'image2') {
                            pic2 = cloudinary.uploader.upload(req.files.image2[0].path, { folder: fd, public_id: 'p2' })
                                .then(pic2 => {
                                    return pic2.url;
                                })
                                .catch(err => console.log(err))
                        } else if (req.files[i][0].fieldname == 'image3') {
                            pic3 = cloudinary.uploader.upload(req.files.image3[0].path, { folder: fd, public_id: 'p3' })
                                .then(pic3 => {
                                    return pic3.url;
                                })
                                .catch(err => console.log(err))
                        } else if (req.files[i][0].fieldname == 'image4') {
                            pic4 = cloudinary.uploader.upload(req.files.image4[0].path, { folder: fd, public_id: 'p4' })
                                .then(pic4 => {
                                    return pic4.url;
                                })
                                .catch(err => console.log(err))

                        } else if (req.files[i][0].fieldname == 'image5') {
                            pic5 = cloudinary.uploader.upload(req.files.image5[0].path, { folder: fd, public_id: 'p5' })
                                .then(pic5 => {
                                    return pic5.url;
                                })
                                .catch(err => console.log(err))
                        }
                    }
                    Promise.all([pic1, pic2, pic3, pic4, pic5]).then(function (values) {
                        newProduct.photo = values;
                        newProduct.save()
                            .then(() => {
                                res.redirect('back')
                            })
                            .catch(err => console.log(err))
                    })
                }
                else {
                    // alert("Product name already exists");
                    res.status(400).send({ message: "Product name already exists" })
                    res.redirect('back')
                }
            })
    };

    // [DELETE] /admin/product/delete/:id
    deleteProduct(req, res, next) {
        ProductModel.findByIdAndDelete(req.params.id)
            .then(() => res.status(200).send({ message: 'success' }))
            .catch(err => res.status(400).send({ message: err }))
    }

    // [PUT] /admin/product/update/:id
    updateProduct(req, res, next) {
        console.log(req.body)
        console.log(req.files);
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
     * Category
     */
    // [GET] /admin/category
    categoryPage(req, res, next) {
        CategoryModel.find({})
            .then(category => {
                res.render('admin/category', {
                    layout: 'admin',
                    categories: category.map(mongoose => mongoose.toObject())
                })
            })
            .catch(err => res.status(400).send({ message: err }))
    }

    // [GET] /admin/category/detail/:id
    categoryDetail(req, res, next) {
        CategoryModel.findById(req.params.id)
            .then(category => res.status(200).send(category))
            .catch(err => res.status(400).send({ message: err }))
    }

    // [POST] /admin/category/add
    addCategory(req, res, next) {
        const newCategory = new CategoryModel(req.body)
        newCategory.save()
            .then(() => res.redirect('back'))
            .catch(err => res.status(400) > send({ message: err }))
    }

    // [PUT] /admin/category/update/:id
    updateCategory(req, res, next) {
        CategoryModel.findByIdAndUpdate(req.params.id, req.body)
            .then(() => res.redirect('back'))
            .catch(err => res.status(400).send({ message: err }))
    }

    // [DELETE] /admin/category/delete/:id
    deleteCategory(req, res, next) {
        const categoryId = req.params.id
        CategoryModel.findByIdAndDelete(categoryId)
            .then(() => res.status(200).send({ message: 'Success' }))
            .catch(err => res.status(400).send({ message: err }))
    }



    /**
     * Customer
     */
    customerPage(req, res, next) {
        const page = Number(req.params.page) || 1;
        const ItemPerPage = 4;

        UserModel.find()
            .skip((ItemPerPage * page) - ItemPerPage)
            .limit(ItemPerPage)
            .then(user => {
                return user;
            })
            .then((user) => {
                UserModel.count()
                    .then(size => {
                        const NumberOfUser = size;
                        const pageCount = Math.ceil(NumberOfUser / ItemPerPage)
                        const pageArray = pagination(page, pageCount)
                        res.render('admin/customer', {
                            layout: 'admin',
                            pageArray,
                            Users: user.map(mongoose => mongoose.toObject())
                        })
                    })
            })
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
            .catch(err => res.status(400).send({ message: err }))
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
                    .catch(err => res.status(400).send({ message: err }))
            })
        })
    }

    deleteAdmin(req, res, next) {
        AdminModel.findByIdAndDelete(req.params.id)
            .then(() => res.redirect('back'))
            .catch(err => res.status(400).send({ message: err }))
    }

    updateAdmin(req, res, next) {
        AdminModel.findByIdAndUpdate(req.params.id, req.body)
            .then(() => res.redirect('back'))
            .catch(err => res.status(400).send({ message: err }))
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
     * @route [GET] /api/admin/block-user/:id?block={true, false}
     * @desc Blocking or Unblocking an user
     * @access private
     */
    blockOrUnblockUser(req, res, next) {
        const userId = req.params.id
        const blockQuery = req.query.block
        if (['true', 'false'].includes(blockQuery)) {
            UserModel.findByIdAndUpdate(userId, { blocked: blockQuery })
                .then(() => {
                    return res.redirect('back');
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