const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { isTrainer } = require('../middleware/roleCheck');
const User = require('../models/User');

// Get all clients for a trainer
router.get('/clients', auth, isTrainer, async (req, res) => {
  try {
    console.log('Fetching clients for trainer:', req.user.id);
    const clients = await User.find({
      role: 'client',
      trainer: req.user.id
    }).select('-password');
    
    console.log('Found clients:', clients.length);
    res.json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ message: 'Failed to fetch clients' });
  }
});

// Add client to trainer
router.post('/clients', auth, isTrainer, async (req, res) => {
  try {
    const { email, firstName, lastName, password } = req.body;

    // Check if client already exists
    let client = await User.findOne({ email });
    if (client) {
      return res.status(400).json({ message: 'Client already exists' });
    }

    // Create new client
    client = new User({
      email,
      password,
      role: 'client',
      trainer: req.user.id,
      profile: {
        firstName,
        lastName
      }
    });

    await client.save();
    res.status(201).json(client);
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({ message: 'Failed to create client' });
  }
});

module.exports = router;
