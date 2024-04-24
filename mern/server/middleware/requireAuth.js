const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

exports.requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1]

  try {
    const { _id } = jwt.verify(token, 'secretkey123')

    req.user = await User.findOne({ _id }).select('_id')
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(400).json({ message: "User access denied" });
  }
  next();
};

exports.cookMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    if (req.user.role !== "waiter") {
      return res.status(400).json({ message: "Cook access denied" });
    }
  }
  next();
};

exports.waiterMiddleware = (req, res, next) => {
  if (req.user.role !== "waiter") {
    return res.status(200).json({ message: "Waiter access denied" });
  }
  next();
};

