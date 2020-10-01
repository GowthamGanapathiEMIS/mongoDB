const mongoose = require("mongoose");
const assert = require("assert");
const User = require("../src/user");
const BlogPost = require("../src/blogPost");

describe("checking middlewares", () => {
  let gowthu, blogpost, blogpost1;

  beforeEach((done) => {
    gowthu = new User({ name: "Gowtham" });
    blogpost = new BlogPost({ title: "First Post", content: "Post content" });
    blogpost1 = new BlogPost({
      title: "First Post1",
      content: "Post content1",
    });

    gowthu.blogposts.push(blogpost);
    gowthu.blogposts.push(blogpost1);

    Promise.all([gowthu.save(), blogpost.save(), blogpost1.save()]).then(() =>
      done()
    );
  });
  it("should delete the blog post", (done) => {
    gowthu
      .remove()
      .then(() => BlogPost.count())
      .then((count) => {
        assert(count === 0);
        done();
      });
  });
});
