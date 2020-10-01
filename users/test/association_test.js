const assert = require("assert");
const User = require("../src/user");
const BlogPost = require("../src/blogPost");
const Comment = require("../src/comment");

describe("checking associations", () => {
  let gowthu, blogpost, comment, blogpost1;

  beforeEach((done) => {
    gowthu = new User({ name: "Gowtham" });
    blogpost = new BlogPost({ title: "First Post", content: "Post content" });

    comment = new Comment({ comment: "This is Super" });

    gowthu.blogposts.push(blogpost);

    blogpost.comments.push(comment);
    comment._user_id = gowthu;

    Promise.all([gowthu.save(), blogpost.save(), comment.save()]).then(() =>
      done()
    );
  });
  it("checking user and blogpost relation", (done) => {
    User.findOne({ name: "Gowtham" })
      .populate("blogposts")
      .then((user) => {
        assert(user.blogposts[0].title === "First Post");
        done();
      });
  });
  it("servers a full data tree", (done) => {
    User.findOne({ name: "Gowtham" })
      .populate({
        path: "blogposts",
        populate: {
          path: "comments",
          model: "comment",
          populate: {
            path: "_user_id",
            model: "user",
          },
        },
      })
      .then((user) => {
        assert(user.name === "Gowtham");
        assert(user.blogposts[0].title === "First Post");
        assert(user.blogposts[0].comments[0].comment === "This is Super");
        assert(user.blogposts[0].comments[0]._user_id.name === "Gowtham");
        done();
      });
  });
});
