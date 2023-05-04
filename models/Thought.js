const { Schema, Types } = require("mongoose");

// Schema to create Thought model
const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 128,
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "reaction",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Adds a virtual field with a formatted version of the createdAt field that is easier to read
thoughtSchema.virtual("formattedCreatedAt").get(function () {
  return `${this.createdAt.getMonth()}/${this.createdAt.getDay()}/${this.createdAt.getFullYear()}`;
});

// retrieves the length of the thoughts's reactions array field on query.
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Initialize our User model
const Thought = mongoose.model("thought", thoughtSchema);

module.exports = Thought;
