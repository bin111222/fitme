require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const seedUsers = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing users
        await User.deleteMany({});
        console.log('Cleared existing users');

        // Create a trainer
        const trainer = new User({
            email: 'trainer@example.com',
            password: 'password123',
            role: 'trainer',
            name: 'John Trainer',
            profile: {
                firstName: 'John',
                lastName: 'Trainer',
                specialties: ['Weight Training', 'HIIT', 'Nutrition'],
                certifications: ['ACE', 'NASM']
            }
        });
        await trainer.save();
        console.log('Created trainer:', trainer._id);

        // Create some clients
        const clients = [
            {
                email: 'client1@example.com',
                password: 'password123',
                role: 'client',
                name: 'Alice Client',
                profile: {
                    firstName: 'Alice',
                    lastName: 'Client',
                    goals: ['Weight Loss', 'Strength'],
                    trainerId: trainer._id
                }
            },
            {
                email: 'client2@example.com',
                password: 'password123',
                role: 'client',
                name: 'Bob Client',
                profile: {
                    firstName: 'Bob',
                    lastName: 'Client',
                    goals: ['Muscle Gain', 'Endurance'],
                    trainerId: trainer._id
                }
            }
        ];

        for (const clientData of clients) {
            const client = new User(clientData);
            await client.save();
            console.log('Created client:', client._id);
        }

        console.log('Database seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedUsers();
