const db = require('./config/connection');
const userSeeds = require('./seeds/users-seeds');
const thoughtSeeds = require('./seeds/thoughts-seeds');
const reactionSeeds = require('./seeds/reactions-seeds');

const seedDatabase = async () => {
  try {
    await db.once('open', async () => {
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