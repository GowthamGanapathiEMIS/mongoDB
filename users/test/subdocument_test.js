const assert = require("assert");
const User = require("../src/user");

describe("checking the sub doc model", () => {
  it("can create a sub doc", (done) => {
    const gowthu = new User({
      name: "Gowtham",
      posts: [{ title: "first post" }],
    });
    gowthu
      .save()
      .then(() => User.findOne({ name: "Gowtham" }))
      .then((user) => {
        assert(user.posts[0].title === "first post");
        done();
      });
  });

  it("update and check", (done) => {
    const gowthu = new User({ name: "Gowtham" });
    gowthu
      .save()
      .then(() => User.findOne({ name: "Gowtham" }))
      .then((user) => {
        user.posts.push({ title: "Karumandampalayam APP Solution" });
        return user.save();
      })
      .then(() => User.findOne({ name: "Gowtham" }))
      .then((user) => {
        assert(user.posts[0].title === "Karumandampalayam APP Solution");
        done();
      });
  });
  it("removing sub doc", (done) => {
    const gowthu = new User({
      name: "Gowtham",
      posts: [{ title: "my post" }, { title: "my post1" }],
    });
    gowthu
      .save()
      .then(() => User.findOne({ name: "Gowtham" }))
      .then((user) => {
        // console.log(user.posts);
        const post = user.posts.filter((post) => post.title === "my post");
        // const post = user.posts[0];
        console.log(post[0]);
        post[0].remove();
        return user.save();
      })
      .then(() => User.findOne({ name: "Gowtham" }))
      .then((user) => {
        assert(user.posts.length === 1);
        done();
      });
  });
});
