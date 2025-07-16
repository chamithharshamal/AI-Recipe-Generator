const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const register = async (credentials) => {
  const { email, password } = credentials;
  const user = await User.create({ email, password });
  return user;
};

const login = async (credentials) => {
  const { email, password } = credentials;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    return token;
  }
  throw new Error('Invalid email or password');
};

module.exports = {
  register,
  login,
};