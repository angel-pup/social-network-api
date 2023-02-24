const { User } = require('../models');

const userSeeds = [
  {
    username: 'johndoe',
    email: 'johndoe@example.com',
    friends: [],
  },
  {
    username: 'janedoe',
    email: 'janedoe@example.com',
    friends: [],
  },
  {
    username: 'johnmadden',
    email: 'madjohn@nfl.com',
    friends: []
  }
];

const seedUsers = async () => {
  await User.deleteMany();

  const users = await User.insertMany(userSeeds);

  console.log(`${users.length} users seeded to database.`);
  process.exit(0);
};

seedUsers();