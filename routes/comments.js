const router = require('express').Router();

const {
  addComment,
  deleteComment,
  getComments,
} = require('../controllers/comment.js');

const { verifyToken } = require('../utils/verifyToken');

router.post('/', verifyToken, addComment);

router.get('/:postId', getComments);

router.delete('/:id', verifyToken, deleteComment);

module.exports = router;
