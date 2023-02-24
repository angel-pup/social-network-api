const { User, Thought, Reaction } = require('../models/index');

const reactionSeeds = [
  {
    reactionBody: '😂',
    username: 'johndoe',
  },
  {
    reactionBody: '❤️',
    username: 'janedoe',
  },
];

const seedReactions = async () => {
  await Reaction.deleteMany();

  for (const reactionSeed of reactionSeeds) {
    const { _id: userId } = await User.findOne({ username: reactionSeed.username });
    const { _id: thoughtId } = await Thought.findOne().sort({ createdAt: 'desc' });

    const reaction = new Reaction({
      ...reactionSeed,
      user: userId,
      thought: thoughtId,
    });

    await reaction.save();
  }

  console.log(`${reactionSeeds.length} reactions seeded to database.`);
  process.exit(0);
};

seedReactions();