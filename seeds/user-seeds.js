const { User }  = require('../models');

const userSeeds = [
  {
    username: 'johndoe',
    email: 'johndoe@example.com',
  },
  {
    username: 'janedoe',
    email: 'janedoe@example.com',
  },
  {
    username: 'johnmadden',
    email: 'madjohn@nfl.com',
  }
];

const seedUsers = async () => {
  await User.deleteMany();

  const users = await User.insertMany(userSeeds);

  console.log(`${users.length} users seeded to database.`);
};

module.exports = seedUsers;