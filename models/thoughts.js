const mongoose = require('mongoose');
const { formatDate } = require('../utils/helpers');
const { ReactionSchema } = require('./reactions.js');

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
            get: (createdAtVal) => formatDate(createdAtVal),
        },
        username: {
            type: String,
            required: true,
        },
        // use ReactionSchema to validate data for a reaction
        reactions: [ReactionSchema],
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
