const CommentModel = require('../models/comment.model')
const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
// var ObjectID = require('mongodb').ObjectID;

class CommentController {

    /**
     * @route [GET] /api/comment/get-all-comment/:id
     * @desc Get productId and get all comment in that product
     * @access public
     */
    getAllComment(req, res, next) {

        CommentModel.find({
            productId: req.params.id,
        }).sort({ time: 'descending' }).lean()
            .then(comment => {

                return res.status(200).json({
                    comment
                })
            })
            .catch(err => {
                return res.status(500).json({
                    message: err,
                })
            })
    }

    /**
     * @route [POST] /api/comment/add-comment/:id
     * @desc Add a comment to a product
     * @access public
     */
    addComment(req, res, next) {
        const newComment = new CommentModel(req.body)
        newComment.productId = req.body?.product_id;
        const decodedToken = jwt.verify(req.cookies.token, process.env.SECRET_KEY)

        UserModel.findById(decodedToken.userId)
            .then(author => {
                if (author) {
                    newComment.author = author.fullName;
                    newComment.save()
                        .then(() => {
                            console.log("comt", newComment);
                            return res.status(200).json({
                                message: 'Comment Successfully',
                            })
                        })
                        .catch(err => {
                            return res.status(500).json({
                                message: err,
                            })
                        })
                }
                else {
                    res.status(500).json({
                        message: "moi ban dang nhap"
                    })
                }

            })



    }

}

module.exports = new CommentController()