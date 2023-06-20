const { Schema, model } = require('mongoose');

const userSchema = new Schema(
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
    },
    {   
        toJSON: {
            getters: true,
        },
    }
);

const User = model('User', userSchema);

module.exports = User;


