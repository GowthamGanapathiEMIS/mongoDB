const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = require("./post_schema");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      validate: {
        validator: (name) => name.length > 2,
        message: "Name should have min 2 chars",
      },
      required: [true, "Name is missing."],
    },
    posts: [PostSchema],
    likes: Number,
  },
  { collection: "user" }
);

UserSchema.virtual("postCount").get(function () {
  return this.posts.length;
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
