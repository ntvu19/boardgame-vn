const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');
const OrderModel = require('../models/order.model');

class UserController {

    /**
     * @route [GET] /api/user/view-info
     * @desc View all user's information
     * @access private
     */
    view(req, res, next) {
        UserModel.find({})
            .then(data => {
                return res.status(200).json(data);
            })
            .catch(err => {
                return res.status(500).json({ message: err });
            });
    }

    /**
     * @route [GET] /api/user/view-info/:id
     * @desc View detail information of an user
     * @access private
     */
    viewDetails(req, res, next) {
        const userId = req.params.id;
        const token = req.header('Authorization').replace('Bearer ', '');

        UserModel.findById({ _id: userId })
            .then(data => {
                if (!data) {
                    return res.status(404).json({ message: 'User does not exist' });
                } else {
                    // Users is only view themselves information
                    if (req.body.role !== 'Administrator') {
                        const decoded = jwt.verify(token, process.env.SECRET_KEY);
                        if (data.username !== decoded.username) {
                            return res.status(403).json({ message: 'Required Administrator role' });
                        } else {
                            return res.status(200).json(data);
                        }
                    }
                    return res.status(200).json(data);
                }
            })
            .catch(err => {
                return res.status(500).json({ message: err });
            });
    }

    /**
     * @route [POST] /api/user/register 
     * @desc Register user 
     * @access public 
     */
    register(req, res, next) {
        req.body.information = JSON.parse(req.body.information);
        const newUser = new UserModel(req.body);
        const token = jwt.sign({
            userId: newUser._id.toString(),
            username: req.body.username,
            role: req.body.role || 'User'
        }, process.env.SECRET_KEY);
        newUser.token = token;

        // Check exist
        UserModel.findOne({ username: req.body.username })
            .then(data => {
                if (data) {
                    return res.status(403).json({ message: 'Username has already taken' });
                }

                // Store hash in the database
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        newUser.password = hash;
                        newUser.save()
                            .then(() => {
                                return res.status(200).json({ message: 'User was registered successfully!' });
                            })
                            .catch(err => {
                                return res.status(500).json({ message: err });
                            });
                    });
                });
            })
            .catch(err => {
                return res.status(500).json({ message: err });
            });
    }

    /**
     * @route [POST] /api/user/login 
     * @desc Log in user 
     * @access public 
     */
    login(req, res, next) {
        UserModel.findOne({
                username: req.body.username
            })
            .populate('orders')
            .then(data => {
                if (!data) {
                    return res.status(404).json({ message: 'Incorrectly username or password!' });
                }

                // Exist
                bcrypt.compare(req.body.password, data.password)
                    .then(result => {
                        if (result === false) {
                            return res.status(404).json({ message: 'Incorrectly username or password!' });
                        }
                        return res.status(200).json({
                            userId: data._id,
                            username: req.body.username,
                            role: data.role,
                            token: data.token
                        });
                    })
                    .catch(err => {
                        return res.status(500).json({ message: err });
                    });
            })
            .catch(err => {
                return res.status(500).json({ message: err });
            });
    }

    /**
     * @route [PUT] /api/user/block/:id?blocked=${[true, false]}
     * @desc Block/Unblock an user, if blocked is not true, it is set to false
     * @access private
     */
    blockOrUnblockUser(req, res, next) {
        const blockValue = (!['true', 'false'].includes(req.query.blocked)) ? true : req.query.blocked === 'true';
        UserModel.findOneAndUpdate({ _id: req.params.id }, { blocked: blockValue })
            .then(() => {
                return res.status(200).json({ message: 'Block/Unblock successfully' });
            })
            .catch(err => {
                return res.status(404).json({ message: 'Could not find the user by id' });
            });
    }

    /**
     * @route [PUT] /api/user/edit/:id
     * @desc The users/administrators can change themselves information
     * @access private
     */
    edit(req, res, next) {
        const userId = req.params.id;
        const token = req.header('Authorization').replace('Bearer ', '');

        UserModel.findById({ _id: userId })
            .then(data => {
                if (!data) {
                    return res.status(404).json({ message: 'User does not exist' });
                } else {
                    const decoded = jwt.verify(token, process.env.SECRET_KEY);
                    if (data.username !== decoded.username) {
                        return res.status(401).json({ message: 'The token was not accepted' });
                    }
                    UserModel.updateOne({ _id: userId }, req.body)
                        .then(() => {
                            return res.status(200).json({ message: 'Update successfully' });
                        })
                        .catch(err => {
                            return res.status(500).json({ message: err });
                        })
                }
            }).catch(err => {
                return res.status(500).json({ message: err });
            });
    }



};

module.exports = new UserController();