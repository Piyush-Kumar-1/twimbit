const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  username: String,
  userId: String,
  post: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  likes: [String],
  comments: [Object],
});
module.exports = mongoose.model("Post", postSchema);
