const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['trainer', 'client'],
        default: 'client'
    },
    name: {
        type: String,
        required: true
    },
    profile: {
        firstName: String,
        lastName: String,
        goals: [String],
        bio: String,
        specialties: [String], // for trainers
        certifications: [String], // for trainers
        trainerId: { // for clients
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }

        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Match password method
userSchema.methods.matchPassword = async function(password) {
    try {
        if (!password) {
            throw new Error('Password is required');
        }
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        console.error('Password match error:', error);
        throw error;
    }
};

// Export the model if it hasn't been compiled yet
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
