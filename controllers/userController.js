const { User, Thought } = require("../models");

module.exports = {
  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // GET a single user by its _id and populated thought and friend data
  async getUser(req, res) {
    try {
      const user = await User.findById(req.params.userId)
        .select("-__v")
        .populate("thoughts")
        .populate("friends");

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  /* POST/create a new user
    example data:
        {
        "username": "lernantino",
        "email": "lernantino@gmail.com"
        }
    */
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // PUT to update a user by its _id
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: req.body,
        },
        { runValidators: true, new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // DELETE to remove user by its _id
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.userId);

      if (!deletedUser) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });

      res.json(deletedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // POST to add a new friend to a user's friend list
  async addUserFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $addToSet: { friends: req.params.friendId },
        },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // DELETE to remove a friend from a user's friend list
  async deleteUserFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $pull: { friends: req.params.friendId },
        },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
