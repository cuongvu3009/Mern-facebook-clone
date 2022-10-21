const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');
const { createError } = require('../utils/error');

const addComment = async (req, res, next) => {
  const newComment = new Comment({
    userId: req.user.id,
    ...req.body,
  });
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const post = await Post.findById(req.params.id);
    if (req.user.id === comment.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json('The comment has been deleted.');
    } else {
      return next(createError(403, 'You can delete only your comment!'));
    }
  } catch (error) {
    next(error);
  }
};

const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

module.exports = { addComment, deleteComment, getComments };
