const express = require('express');
const router = express.Router();
const {
  getByTag,
  getPost,
  addPost,
  updatePost,
  deletePost,
  getSubPosts,
  search,
  getAllPosts,
} = require('../controllers/post');
const { verifyToken, verifyAdmin } = require('../utils/verifyToken');

//create a post
router.post('/', verifyToken, addPost);

//update a post
router.put('/:id', verifyToken, updatePost);

//delete a post, need token
router.delete('/:id', verifyToken, deletePost);

//get post
router.get('/find/:id', getPost);

//create a post, need token
router.get('/sub', verifyToken, getSubPosts);

//get all posts
router.get('/', getAllPosts);

//get by search
router.get('/search', search);

//get by tags
router.get('/tags', getByTag);

module.exports = router;
