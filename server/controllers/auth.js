const User = require('../models/User');
const createError = require('../utils/error');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    //	check if user typed
    if (!username || !email || !password) {
      return next(
        createError(404, 'Please provide username, email and password')
      );
    }

    //	hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ ...req.body, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    //check if user exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(createError(404, 'User not found!'));
    }

    //check password correct
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return next(createError(400, 'Wrong credential, try again!'));
    }

    //create token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    const { password, ...other } = user._doc;
    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(201)
      .json(other);
  } catch (error) {
    next(error);
  }
};

module.exports = { login, register };
