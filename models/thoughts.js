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

const ThoughtSchema = new mongoose.Schema(
    {
        thought_Id: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
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
const Thought = model('Thought', ThoughtSchema);

// export the Thought model
module.exports = Thought;
