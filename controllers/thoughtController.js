const { User, Thought } = require("../models");

module.exports = {
  // Get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find({});
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // GET a single thought by its _id
  async getThought(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId).select(
        "-__v"
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  /* POST/create a new thought
    example data:
        {
            "thoughtText": "Here's a cool thought...",
            "username": "lernantino",
            "userId": "5edff358a0fcb779aa7b118b"
        }
    */
  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);

      const updatedUser = await User.findOneAndUpdate(
        {
          _id: req.body.userId,
        },
        {
          // adds the newly created thought's id to the corresponding user's thoughts field array
          $addToSet: { thoughts: newThought._id },
        },
        { runValidators: true, new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(newThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // PUT to update a thought by its _id
  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        {
          // only changes the fields placed in the request body
          $set: req.body,
        },
        { runValidators: true, new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // DELETE to remove thought by its _id
  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findByIdAndDelete(
        req.params.thoughtId
      );

      if (!deletedThought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(deletedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  /*POST to create a reaction stored in a single thought's reactions array field
  example data:
        {
            "reactionId": "8eddr358a0fab779aa7b118b",
            "reactionBody": "HAHA",
            "username": "abed605"
        }
*/
  async createReaction(req, res) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        {
          // adds an entry to the reactions array containing the entire request body
          $addToSet: { reactions: req.body },
        },
        { runValidators: true, new: true }
      );

      if (!updatedThought) {
        return res
          .status(404)
          .json({ message: "No thought created by a user with that username" });
      }

      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // DELETE to pull and remove a reaction by the reaction's reactionId value
  async deleteReaction(req, res) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        {
          // finds and removes entries in the Thought's reactions array by looking for entires with a reactionId of that in the req parameters
          $pull: { reactions: { reactionId: req.params.reactionId } },
        },
        { runValidators: true, new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: "No thought  with that ID" });
      }

      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
