const connection = require('./connection');
const { User, Thought } = require('../models');

connection.once('open', async () => {
    console.log('connected to database');
    let users = await connection.db.listCollections({ name: 'users' }).toArray();
     if (users.length) {
        await connection.db.dropCollection('users');
    }
    users = await User.create({
        username: 'testuser',
        email: 'testemail@email.com',
        thoughts: [
            {
                thoughtText: 'This is a test thought',
                username: 'testuser'
            }
        ]
    });
    console.log('users seeded 🌱');

    let thoughts = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughts.length) {
        await connection.db.dropCollection('thoughts');
    }
    thoughts = await Thought.create({
        thoughtText: 'This is a test thought',
        username: 'testuser'
    });
    console.log('thoughts seeded 🌱');

    process.exit(0);
});

