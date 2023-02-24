const connection = require('../config/connection');
const userSeeds = require('./user-seeds');
const thoughtSeeds = require('./thought-seeds');
const reactionSeeds = require('./reaction-seeds');

const seedDatabase = async () => {
  try {
    connection.once('open', async () => {
      await userSeeds();
      await thoughtSeeds();
      await reactionSeeds();
      process.exit(0);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDatabase();