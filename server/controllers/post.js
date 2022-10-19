const createError = require('../error');
const Post = require('../models/Post');
const User = require('../models/User');

const addPost = async (req, res, next) => {
  const newPost = new Video({ userId: req.user.id, ...req.body });

  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    next(err);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return next(createError(404, `No post with ${req.params.id} found!`));
    }
    if (req.user.id === Post.userId) {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedPost);
    } else {
      return next(createError(403, `You can only update your post!`));
    }
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return next(createError(404, `No post with ${req.params.id} found!`));
    if (req.user.id === req.params.userId) {
      const deletedPost = await Post.findByIdAndDelete(req.params.id);
      res.status(200).json(deletedPost);
    } else {
      return next(createError(403, `You can only delete your post!`));
    }
  } catch (error) {
    next(error);
  }
};

const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subcribedPeople = await user.followings;

    const list = await Promise.all(
      subcribedPeople.map((id) => {
        return Post.find({ userId: id });
      })
    );
    //	add .flat() to remove 1 layer array bracket
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    next(error);
  }
};

const getByTag = async (req, res, next) => {
  try {
    const tags = req.query.tags.split(',');
    //loop inside tags, and search inside ($in) of tags to see if tags exist
    const posts = await Post.find({ tags: { $in: tags } }).litmit(50);
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

const search = async (req, res, next) => {
  try {
    const { query } = req.query;
    const posts = await Post.find({
      title: { $regex: query, $options: 'i' },
    });
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getByTag,
  getPost,
  addPost,
  updatePost,
  deletePost,
  sub,
  search,
  getAllPosts,
};
