const ssert = require("assert");
const { assert } = require("console");
const User = require("../src/user");

describe("virtual types", () => {
  it("post count retuen the number of posts", (done) => {
    const gowthu = new User({
      name: "Gowtham",
      posts: [{ title: "first post" }, { title: "second post" }],
    });
    gowthu
      .save()
      .then(() => User.findOne({ name: "Gowtham" }))
      .then((user) => {
        assert(user.postCount === 2);
        done();
      });
  });
});
