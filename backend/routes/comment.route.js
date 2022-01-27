const CommentController = require('../controllers/comment.controller');
const express = require('express');
const router = express.Router();

router.get('/get-all-comment/:id', CommentController.getAllComment);
router.post('/add-comment/:id', CommentController.addComment);

/**
 * Xong
 */

module.exports = router;