const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            max_length: 20,
            min_length: 3,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            max_length: 50,
            min_length: 3,
        },
        password: {
            type: String,
            required: true,
            max_length: 20,
            min_length: 3,
        },
    }
);

const User = model('User', userSchema);

module.exports = User;


