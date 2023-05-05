const { Schema, Types } = require("mongoose");

// Schema for Reaction Document
const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

// Adds a virtual field with a formatted version of the createdAt field that is easier to read
reactionSchema.virtual("formattedCreatedAt").get(function () {
  return `${this.createdAt.getMonth()}/${this.createdAt.getDay()}/${this.createdAt.getFullYear()}`;
});

module.exports = reactionSchema;
