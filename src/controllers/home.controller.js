const ProductModel = require('../models/product.model')
const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { redirect } = require('express/lib/response')

class HomeController {

    // [GET] /
    index(req, res, next) {
        ProductModel.find({})
            .then(product => {
                res.render('home', {
                    layout: 'customer',
                    products: product.map(mongoose => mongoose.toObject())
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    // [GET] /login
    userLoginPage(req, res, next) {
        res.render('login')
    }

    // [POST] /login
    userLogin(req, res, next) {
        UserModel.findOne({ username: req.body.username })
            .then(user => {
                if (!user) {
                    res.redirect('back')
                    console.log('Incorrectly username or password')
                } else {
                    bcrypt.compare(req.body.password, user.password)
                        .then(success => {
                            let announcement = success ? 'Login successfully' : 'Incorrectly username or password'
                            console.log(announcement)

                            if (success) {
                                res.cookie('token', user.token, { httpOnly: true })
                                res.redirect('/')
                            } else {
                                redirect('back')
                            }
                        })
                }
            })
            .catch(err => console.log(err))
    }

    // [POST] /register
    userRegister(req, res, next) {
        UserModel.findOne({ username: req.body.username })
            .then(user => {
                if (user) {
                    res.redirect('back')
                    console.log('Username has already taken')
                } else {
                    // Create user
                    const newUser = new UserModel(req.body)

                    // Generating token
                    const token = jwt.sign({
                        userId: newUser._id,
                        role: 'user'
                    }, process.env.SECRET_KEY)
                    newUser.token = token

                    // Hashing password
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hashed) => {
                            newUser.password = hashed
                            newUser.save()
                                .then(() => {
                                    res.cookie('token', newUser.token, { httpOnly: true })
                                    res.redirect('/')
                                })
                                .catch(err => console.log(err))
                        })
                    })
                }
            })
            .catch(err => console.log(err))
    }

}

module.exports = new HomeController()