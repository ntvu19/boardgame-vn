const CommentModel = require('../models/comment.model')

class CommentController {

    /**
     * @route [GET] /api/comment/get-all-comment/:id
     * @desc Get productId and get all comment in that product
     * @access public
     */
    getAllComment(req, res, next) {

        CommentModel.find({
            productId: req.params.id,
        }).lean()
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
        // const username = req.user.username;
        // console.log(req.user.username)
        const newComment = new CommentModel(req.body)
        newComment.productId = req.body?.product_id;
        newComment.author = '123123123';
        console.log("comt2", req.body);
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

}

module.exports = new CommentController()