const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            max_length: 20,
            min_length: 3,
        },
        email: {
            type: String,
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
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [friendsSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
    }
);

const friendsSchema = new mongoose.Schema(
    {
        friendId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        friendName: String,
    }
);

const User = mongoose.model('User', userSchema);


module.exports = User;


