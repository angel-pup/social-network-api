const { Thought } = require ('../models');

const thoughtSeeds = [
  {
    thoughtText: 'Hello, world!',
    username: 'johndoe',
  },
  {
    thoughtText: 'How are you today?',
    username: 'janedoe',
  },
];

const seedThoughts = async () => {
  await Thought.deleteMany();

  await Thought.insertMany(thoughtSeeds)

  console.log(`${thoughtSeeds.length} thoughts seeded to database.`);
};

module.exports = seedThoughts;