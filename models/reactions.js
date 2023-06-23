const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new mongoose.Schema(
    {
        // set custom id to avoid confusion with parent thought _id
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            max_length: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // use getter method to format timestamp on query
            get: (createdAtVal) => dateFormat(createdAtVal),
        },
        reactionCount: {
            type: Number,
    },
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const Reaction = model('Reaction', ReactionSchema);

module.exports = Reaction;