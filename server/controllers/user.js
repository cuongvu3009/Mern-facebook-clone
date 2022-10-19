const User = require('../models/User');
const Post = require('../models/Post');

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id === req.user.id) {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } else {
      res.send('You can only update your account');
    }
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    if (req.params.id === req.user.id) {
      const deletedUser = await User.findByIdAndDelete(id);
      res.status(200).json(deletedUser);
    } else {
      res.send('You can only delete your account');
    }
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const subscribe = async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, {
    $push: { subscribedUsers: req.params.id },
  });
  await User.findByIdAndUpdate(req.params.id, {
    $push: { subscribers: req.user.id },
  });

  res.status(200).json('Subcribed!');
};

const unsubscribe = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $pull: { subscribers: req.user.id },
    });

    res.status(200).json('Unsubcribed!');
  } catch (error) {
    next(error);
  }
};

const like = async (req, res) => {
  const userId = await req.user.id;
  const postId = await req.params.postId;

  try {
    await Post.findByIdAndUpdate(postId, {
      $addToSet: { likes: userId },
      $pull: { dislikes: userId },
    });
    res.status(201).json('liked!');
  } catch (error) {
    next(error);
  }
};

const dislike = async (req, res) => {
  const userId = await req.user.id;
  const postId = await req.params.postId;

  try {
    await Post.findByIdAndUpdate(postId, {
      $addToSet: { likes: userId },
      $addToSet: { dislikes: userId },
      $pull: { likes: userId },
    });
    res.status(201).json('disliked!');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  update,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
  getAllUsers,
};
