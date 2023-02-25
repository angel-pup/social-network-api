const router = require("express").Router();
const { User, Thought } = require("../../models");

// Create a new user
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single user by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a single user by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    await Thought.deleteMany({ username: deletedUser.username });

    res.json({ message: "User and associated thoughts deleted successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error deleting user and associated thoughts" });
  }
});

// Update a single user by id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { username, email },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Add a friend to a user's friend array by id
router.post("/:userId/friends/:friendId", async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!friend) {
      return res.status(404).json({ message: "Friend not found" });
    }

    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: "Friend already added" });
    }

    user.friends.push(friendId);
    await user.save();

    res.json({ message: "Friend added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Remove a friend from a user's friend list by id
router.delete("/:userId/friends/:friendId", async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.friends.includes(friendId)) {
      return res
        .status(400)
        .json({ message: "Friend not found in user friend list" });
    }

    user.friends = user.friends.filter((id) => id.toString() !== friendId);
    await user.save();

    res.json({ message: "Friend removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;