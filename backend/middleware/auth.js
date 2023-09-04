const jwt = require('jsonwebtoken');
const User = require('../models/UsersModel');
const {jwtTokenGenarate} = require('../config/secret')

const authenticate = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(accessToken, jwtTokenGenarate);
    req.user = { userId: decodedToken.userId, role: decodedToken.role };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

const authorize = (roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).json({ message: 'You are not allow to do this' });
    }
  };
};

module.exports = { authenticate, authorize };
