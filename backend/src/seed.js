const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Create default admin user
    const adminUser = new User({
      email: 'admin@fitme.com',
      password: 'admin123', // Will be hashed by the User model's pre-save hook
      role: 'admin',
      profile: {
        firstName: 'Admin',
        lastName: 'User'
      }
    });

    await adminUser.save();
    console.log('Default admin user created');
    console.log('Email: admin@fitme.com');
    console.log('Password: admin123');

    mongoose.disconnect();
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
