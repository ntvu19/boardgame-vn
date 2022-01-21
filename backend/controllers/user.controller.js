const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

class UserController {

    /**
     * @route [GET] /api/user/view
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
     * @route [GET] /api/user/view/:id
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
        // Access token
        const token = jwt.sign({
            username: req.body.username,
            role: req.body.role || 'User'
        }, process.env.SECRET_KEY);
        req.body.token = token;
        req.body.information = JSON.parse(req.body.information);
        const newUser = new UserModel(req.body);

        // Check exist
        UserModel.findOne({ username: req.body.username })
            .then(data => {
                if (data) {
                    return res.status(404).json({ message: 'Username is already taken' });
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
            }) // Missing populate orders--------------------------------------Note-------------------------------------------
            .then(data => {
                if (!data) {
                    return res.status(404).json({ message: 'Incorrectly username or password!' });
                }

                // Exist
                const hashedPassword = data.password;
                bcrypt.compare(req.body.password, hashedPassword)
                    .then(result => {
                        if (result === false) {
                            return res.status(404).json({ message: 'Incorrectly username or password!' });
                        }
                        return res.status(200).json({
                            username: req.body.username,
                            role: data.role,
                            token: data.token
                        });
                    })
                    .catch(err => {
                        return res.status(400).json({ message: err });
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
            .then(data => {
                return res.status(200).json({ message: 'Block/Unblock successfully' });
            })
            .catch(err => {
                return res.status(404).json({ message: 'Could not find user by id' });
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
                        console.log(data.username);
                        console.log(decoded.username);
                        return res.status(403).json({ message: 'Token is not accepted' });
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