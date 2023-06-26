const { Thought, User } = require('../../models');
const router = require('express').Router();

// GET all thoughts
router.get('/', async (req, res) => {
    try {
        const thoughtData = await Thought.find()
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v');
        res.status(200).json(thoughtData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a single thought by its ID and populated reaction data
router.get('/:id', async (req, res) => {
    try {
        const thoughtData = await Thought.findOne({ _id: req.params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v');
        if (!thoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.status(200).json(thoughtData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST (create) a new thought and push the created thought's _id to the associated user's thoughts array field
router.post('/', async (req, res) => {
    try {
        const thoughtData = await Thought.create(req.body);
        const userData = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: thoughtData._id } },
            { new: true }
        );
        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.status(200).json(thoughtData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// PUT (update) a thought by its ID
router.put('/:id', async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        if (!thoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.status(200).json(thoughtData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE a thought by its ID and remove the deleted thought's _id from the associated user's thoughts array field
router.delete('/:id', async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndDelete({ _id: req.params.id });
        const userData = await User.findOneAndUpdate(
            { thoughts: req.params.id },
            { $pull: { thoughts: req.params.id } },
            { new: true }
        );
        if (!thoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.status(200).json(thoughtData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST (create) a reaction stored in a single thought's reactions array field
router.post('/:id/reactions', async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { reactions: req.body } },
            { new: true }
        );
        if (!thoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.status(200).json(thoughtData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE a reaction by the reaction's reactionId value
router.delete('/:id/reactions/:reactionId', async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        );
        if (!thoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.status(200).json(thoughtData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;