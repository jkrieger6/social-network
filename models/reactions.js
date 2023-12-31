const mongoose = require('mongoose');
const { formatDate } = require('../utils/helpers');

const ReactionSchema = new mongoose.Schema(
    {
        // set custom id to avoid confusion with parent thought _id
        reactionId: {
            type: mongoose.Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // use getter method to format timestamp on query
            get: (createdAtVal) => formatDate(createdAtVal),
        },
        reactionCount: {
            type: Number,
    },
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

const Reaction = mongoose.model('Reaction', ReactionSchema);

module.exports = { Reaction, ReactionSchema };