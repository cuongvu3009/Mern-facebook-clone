const express = require('express');
const router = express.Router();
const {
  getByTag,
  getPost,
  addPost,
  updatePost,
  deletePost,
  sub,
  search,
  getAllPosts,
} = require('../controllers/post');
const { verifyToken } = require('../utils/verifyToken');

//create a post
router.post('/', verifyToken, addPost);

//update a post
router.put('/:id', verifyToken, updatePost);

//delete a post, need token
router.delete('/:id', verifyToken, deletePost);

//get post
router.get('/find/:id', getVideo);

//add view
router.put('/view/:id', addView);

//get trend
router.get('/trend', trend);

//get random
router.get('/random', random);

//create a post, need token
router.get('/sub', verifyToken, sub);

//get by tag
router.get('/tags', getByTag);

//get by search
router.get('/search', search);

module.exports = router;
