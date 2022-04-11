const ProductModel = require('../models/product.model')
const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const mailer = require('../configs/nodemailer.config')

class HomeController {

    // [GET] /
    index(req, res, next) {
        // Login status
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
    userLogInPage(req, res, next) {
        if (!req.cookies.token) {
            res.render('login')
        } else {
            const decodedToken = jwt.verify(req.cookies.token, process.env.SECRET_KEY)
            UserModel.findById(decodedToken.userId)
                .then(user => { user ? res.redirect('/') : res.render('login') })
                .catch(err => console.log(err))
        }
    }

    // [POST] /login
    userLogIn(req, res, next) {
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
                                res.cookie('logged', true)
                                res.cookie('fullName', user.fullName)
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
                    res.status(403).send({ message: 'User has already taken' })
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
                                    res.cookie('logged', true)
                                    res.cookie('fullName', newUser.fullName)
                                    res.cookie('token', newUser.token, { httpOnly: true })
                                    res.status(200).send({ message: 'Success' })

                                    // Nodemailer
                                    mailer.sendConfirmationEmail(
                                        newUser.fullName,
                                        newUser.email,
                                        newUser._id
                                    )
                                })
                        })
                    })
                }
            })
            .catch(err => res.status(400).send({ message: err }))
    }

    // [GET] /logout
    userLogOut(req, res, next) {
        if (req.cookies.token) {
            res.cookie('logged', false)
            res.cookie('fullName', '')
            res.clearCookie('token')
            res.redirect('/')
        } else {
            res.redirect('/')
        }
    }



}

module.exports = new HomeController()