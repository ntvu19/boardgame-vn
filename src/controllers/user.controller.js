const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const cloudinary = require('../configs/cloudinary.config')
const mailer = require('../configs/nodemailer.config')

class UserController {

    // [GET] /user
    userInformation(req, res, next) {
        if (!req.cookies.token) {
            res.redirect('/login')
        } else {
            const decodedToken = jwt.verify(req.cookies.token, process.env.SECRET_KEY)
            UserModel.findById(decodedToken.userId)
                .then(user => {
                    if (!user) {
                        res.redirect('/login')
                    } else {
                        res.render('info', {
                            layout: 'customer',
                            user: user ? user.toObject() : user
                        })
                    }
                })
                .catch(err => res.status(400).send({ message: err }))
        }
    }

    // [PUT] /user/edit/:id
    editUser(req, res, next) {
        const oldPassword = req.body.password || '';
        // console.log("re", req.body);
        // if(oldPassword == '')

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(oldPassword, salt, (err, hashed) => {

                UserModel.findById(req.params.id)
                    .then(check => {

                        if (check.password.trim != hashed.trim) {
                            res.render('Old password is wrong');
                        } else {
                            if (req.body.newPassword == '') {
                                const decodedToken = jwt.verify(req.cookies.token, process.env.SECRET_KEY)

                                const fd = 'user/' + req.params.id;
                                if (req.file != undefined) {
                                    cloudinary.uploader.upload(req.file.path, { folder: fd, public_id: 'ava' })
                                        .then(ava => {

                                            const update = {
                                                fullName: req.body.fullName,
                                                address: req.body.address,
                                                avatar: ava.url
                                            }
                                            UserModel.findByIdAndUpdate(decodedToken.userId, update)
                                                .then(() => {
                                                    res.redirect('/user');
                                                })
                                                .catch(err => console.log(err))

                                        })
                                } else {
                                    const update = {
                                        fullName: req.body.fullName,
                                        address: req.body.address,
                                    }
                                    UserModel.findByIdAndUpdate(decodedToken.userId, update)
                                        .then(() => {
                                            res.redirect('/user');
                                        })
                                        .catch(err => console.log(err))
                                }
                            } else {
                                const newPassword = req.body.newPassword
                                delete req.body.newPassword
                                delete req.body.confirmNewPassword

                                // Hashing password
                                bcrypt.genSalt(10, (err, salt) => {
                                    bcrypt.hash(newPassword, salt, (err, hashed) => {
                                        req.body.password = hashed
                                        if (!req.cookies.token) {
                                            res.redirect('/user')
                                        } else {
                                            const decodedToken = jwt.verify(req.cookies.token, process.env.SECRET_KEY)

                                            const fd = 'user/' + req.params.id;
                                            if (req.file != undefined) {
                                                cloudinary.uploader.upload(req.file.path, { folder: fd, public_id: 'ava' })
                                                    .then(ava => {

                                                        const update = {
                                                            fullName: req.body.fullName,
                                                            password: req.body.password,
                                                            address: req.body.address,
                                                            avatar: ava.url
                                                        }

                                                        UserModel.findByIdAndUpdate(decodedToken.userId, update)
                                                            .then(() => {


                                                                res.redirect('/user');

                                                            })
                                                            .catch(err => console.log(err))

                                                    })
                                            } else {
                                                const update = {
                                                    fullName: req.body.fullName,
                                                    password: req.body.password,
                                                    address: req.body.address,

                                                }
                                                UserModel.findByIdAndUpdate(decodedToken.userId, update)
                                                    .then(() => {
                                                        res.redirect('/user');
                                                    })
                                                    .catch(err => console.log(err))
                                            }
                                        }
                                    })
                                })
                            }

                        }

                    })
                    .catch(err => console.log(err))
            })
        })

    }

    // [PUT] /user/active/:id
    activeUser(req, res, next) {
        if (!req.cookies.token) {
            res.redirect('/')
        } else {
            const decodedToken = jwt.verify(req.cookies.token, process.env.SECRET_KEY)
            if (decodedToken.userId == req.params.id) {
                const active = { active: true }
                UserModel.findByIdAndUpdate(req.params.id, active)
                    .then(() => res.redirect('/'))
                    .catch(err => res.status(400).send({ message: err }))
            }
        }
    }

    //POST /user/forgot-password
    forgotPassword(req, res, next) {
        var max = 16
        var min = 8
        var passwordChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        var randPwLen = Math.floor(Math.random() * (max - min + 1)) + min
        var randPassword = Array(randPwLen).fill(passwordChars).map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('')

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(randPassword, salt, (err, hashed) => {
                UserModel.findOne({ email: req.body.email })
                    .then(user => {
                        user.password = hashed
                        user.save()
                        mailer.forgotPassword(user.fullName, user.email, randPassword)
                        res.redirect('back')
                    })
                    .catch(err => res.status(400).send({ message: err }))
            })
        })

    }

}

module.exports = new UserController()