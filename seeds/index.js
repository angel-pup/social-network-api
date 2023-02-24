const connection = require('../config/connection');
const seedUsers = require('./user-seeds');
const seedThoughts = require('./thought-seeds');

const seedDatabase = async () => {
  try {
    connection.once('open', async () => {
      await seedUsers();
      await seedThoughts();
      process.exit(0);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDatabase();