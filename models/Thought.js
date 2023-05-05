const { Schema, Types, model } = require("mongoose");
const reaction = require("./Reaction");

// Schema to create Thought model
const thoughtSchema = new Schema(
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
    reactions: [reaction],
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
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
