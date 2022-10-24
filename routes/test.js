const router = require('express').Router();

const { verifyToken } = require('../utils/verifyToken');

router.get('/', verifyToken, (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
