const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new Error('No token provided');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.user?.id) {
      throw new Error('Invalid token structure');
    }

    const user = await User.findById(decoded.user.id);
    if (!user) {
      throw new Error('User not found');
    }

    // Attach both user and token to request
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    res.status(401).json({ message: 'Please authenticate' });
  }
};

module.exports = auth;