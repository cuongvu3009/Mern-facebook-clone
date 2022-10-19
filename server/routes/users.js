const express = require('express');
const router = express.Router();
const {
  update,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
  getAllUsers,
} = require('../controllers/user');
const { verifyToken } = require('../utils/verifyToken');

//get all users
router.get('/', getAllUsers);

//update user
router.put('/:id', verifyToken, update);

//delete user
router.delete('/:id', verifyToken, deleteUser);

//get a user
router.get('/find/:id', getUser);

//subscribe a user
router.put('/sub/:id', verifyToken, subscribe);

//unsubscribe a user
router.put('/unsub/:id', verifyToken, unsubscribe);

//like a video
router.put('/like/:postId', verifyToken, like);

//dislike a video
router.put('/dislike/:postId', verifyToken, dislike);

module.exports = router;
