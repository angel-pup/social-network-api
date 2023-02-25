const router = require("express").Router();
const { User, Thought } = require("../../models");

// GET all thoughts
router.get("/", async (req, res) => {
  try {
    const thoughts = await Thought.find().sort({ createdAt: -1 });
    res.json(thoughts);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET single thought by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const thought = await Thought.findById(id);
    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }
    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// POST create a new thought (and push to associated user's thoughts array field)
router.post("/", async (req, res) => {
  try {
    const { thoughtText, username, userId } = req.body;
    const thought = await Thought.create({ thoughtText, username });

    // Add thought to user's thoughts array field
    await User.findByIdAndUpdate(
      userId,
      { $push: { thoughts: thought._id } },
      { new: true }
    );

    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// PUT update a thought by id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { thoughtText } = req.body;
    const thought = await Thought.findByIdAndUpdate(
      id,
      { thoughtText },
      { new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }
    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// DELETE remove thought by id (and remove from user's thoughts array field)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const thought = await Thought.findByIdAndDelete(id);

    await User.findOneAndUpdate(
      thought.username,
      { $pull: { thoughts: id} }
    );

    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    res.status(200).json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// POST create a reaction for a single thought
router.post("/:thoughtId/reactions", async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;

    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: { reactionBody, username } } },
      { new: true, runValidators: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE remove a reaction from a single thought
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
      const { thoughtId, reactionId } = req.params;

      const updatedThought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $pull: { reactions: { _id: reactionId } } },
        { new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: "Thought not found" });
      }

      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports = router;
