const { User } = require('../../models');
const router = require('express').Router();

// GET all users
router.get('/', async (req, res) => {
    try {
        const userData = await User.find()
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v');
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a single user by its ID and populated thought and friend data
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findOne({ _id: req.params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v');
        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST (create) a new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// PUT (update) a user by its ID
router.put('/:id', async (req, res) => {
    try {
        const userData = await User.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE a user by its ID
router.delete('/:id', async (req, res) => {
    try {
        const userData = await User.findOneAndDelete({ _id: req.params.id });
        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST (create) a new friend to a user's friend list
router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const userData = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        );
        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        } else {
            const friendData = await User.findOneAndUpdate(
                { _id: req.params.friendId },
                { $addToSet: { friends: req.params.userId } },
                { new: true }
            );
            if (!friendData) {
                res.status(404).json({ message: 'No friend found with this id!' });
                return;
            }
        }
        res.status(200).json({ message: 'Friend added!' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE a friend from a user's friend list
router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const userData = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );
        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        } else {
            const friendData = await User.findOneAndUpdate(
                { _id: req.params.friendId },
                { $pull: { friends: req.params.userId } },
                { new: true }
            );
            if (!friendData) {
                res.status(404).json({ message: 'No friend found with this id!' });
                return;
            }
        }
        res.status(200).json({ message: 'Friend deleted!' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;