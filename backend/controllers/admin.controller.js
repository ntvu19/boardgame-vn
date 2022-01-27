const AdminModel = require('../models/admin.model');
const ProductModel = require('../models/product.model');
const OrderModel = require('../models/order.model');
const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs/dist/bcrypt');

class AdminController {

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
                    });
                }
                bcrypt.compare(req.body.password, admin.password)
                    .then(success => {
                        if (!success) {
                            return res.status(401).json({
                                message: 'Incorrectly username or password',
                            });
                        }
                        return res.status(200).json({
                            userId: admin._id,
                            username: admin.username,
                            role: 'admin',
                            active: admin.active,
                            token: admin.token,
                        });
                    })
            })
            .catch(err => {
                return res.status(500).json({
                    message: err,
                });
            });
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
                    });
                }
                const newAdmin = new AdminModel(req.body);

                // Generating a token
                const token = jwt.sign({
                    userId: newAdmin._id,
                    username: newAdmin.username,
                    role: 'admin',
                    active: newAdmin.active,
                }, process.env.SECRET_KEY);
                newAdmin.token = token;

                // Hashing password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newAdmin.password, salt, (err, hashedPassword) => {
                        newAdmin.password = hashedPassword;
                        // Save the new account to the database
                        newAdmin.save()
                            .then(() => {
                                return res.status(200).json({
                                    message: 'Sign Up Successfully',
                                });
                            })
                            .catch(err => {
                                return res.status(500).json({
                                    message: err,
                                });
                            });
                    });
                });
            })
            .catch(err => {
                return res.status(500).json({
                    message: err,
                });
            });
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
                    });
                }
                let userList = [];
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
                    });
                });
                return res.status(200).json(userList);
            })
            .catch(err => {
                return res.status(500).json({
                    message: err,
                })
            });
    }

}

module.exports = new AdminController();