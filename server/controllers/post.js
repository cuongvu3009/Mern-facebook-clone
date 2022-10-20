const createError = require('../utils/error');
const Post = require('../models/Post');
const User = require('../models/User');

const addPost = async (req, res, next) => {
  const newPost = new Post({ userId: req.user.id, ...req.body });

  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    next(err);
  }
};

const updatePost = async (req, res, next) => {
  try {
    //	check if post exist
    const post = await Post.findById(req.params.id);
    if (!post) {
      return next(createError(404, `No post with ${req.params.id} found!`));
    }

    //	authorization
    if (req.user.id === post.userId) {
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
    //	check if post exist
    const post = await Post.findById(req.params.id);
    if (!post)
      return next(createError(404, `No post with ${req.params.id} found!`));

    //	authorization
    if (req.user.id === post.userId) {
      await Post.findByIdAndDelete(req.params.id);
      res.status(200).json('Post has been deleted!');
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

//	get posts from followings
const getSubPosts = async (req, res, next) => {
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
    const posts = await Post.find({ tags: { $in: tags } });
    res.status(200).send(posts);
  } catch (error) {
    next(error);
  }
};

//	note: customer can only search 1 word, will update many word search soon
const search = async (req, res, next) => {
  try {
    const query = req.query.query;

    const posts = await Post.find({
      desc: { $regex: query, $options: 'i' },
    });
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
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
  getSubPosts,
  search,
  getAllPosts,
};
