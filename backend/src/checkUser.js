const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const checkUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const user = await User.findOne({ email: 'admin@fitme.com' });
    if (user) {
      console.log('User found:', {
        id: user._id,
        email: user.email,
        role: user.role,
        password: user.password.substring(0, 20) + '...',
        profile: user.profile
      });
    } else {
      console.log('User not found');
    }

    mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkUser();
