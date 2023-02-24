const { User, Thought } = require ('../models/index');

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

  for (const thoughtSeed of thoughtSeeds) {
    const { _id: userId } = await User.findOne({ username: thoughtSeed.username });

    const thought = new Thought({
      ...thoughtSeed,
      user: userId,
    });

    await thought.save();
  }

  console.log(`${thoughtSeeds.length} thoughts seeded to database.`);
  process.exit(0);
};

seedThoughts();