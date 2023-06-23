const mongoose = require('mongoose');
// const { Schema, model } = require('mongoose'); // is this the correct model setup

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trimmed: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/],
        },
        thoughts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User',
            },
          ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
    }
);

userSchema
.virtual('friendCount')
.get(function () {
    return this.friends.length;
})


const User = mongoose.model('User', userSchema);


module.exports = User;


