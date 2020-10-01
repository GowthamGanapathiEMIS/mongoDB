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
    blogposts: [
      {
        type: Schema.Types.ObjectId,
        ref: "blogPost",
      },
    ],
    likes: Number,
  },
  { collection: "user" }
);

UserSchema.virtual("postCount").get(function () {
  return this.posts.length;
});

UserSchema.pre("remove", function (next) {
  const BlogPost = mongoose.model("blogPost");
  BlogPost.remove({ _id: { $in: this.blogposts } }).then(() => next());
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
