const mongoose = require('mongoose');
const ReactionSchema = require('./reactions')
const dateFormat = require('../utils/helpers');

const ThoughtSchema = new mongoose.Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // use getter method to format timestamp on query
            get: (createdAtVal) => dateFormat(createdAtVal),
        },
        username: {
            type: String,
            required: true,
        },
        // use ReactionSchema to validate data for a reaction
        reactions: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Reaction',
        }
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        // prevents virtuals from creating duplicate of _id as `id`
        id: false,
    }
);

// get total count of reactions and replies on retrieval
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
}
);

// create the Thought model using the ThoughtSchema
const Thought = mongoose.model('Thought', ThoughtSchema);

// export the Thought model
module.exports = Thought;
