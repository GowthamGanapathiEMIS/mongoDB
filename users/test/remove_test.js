const assert = require("assert");

const User = require("../src/user");

describe("removing the user", () => {
  let g;

  beforeEach((done) => {
    g = new User({ name: "first" });
    g.save().then(() => done());
  });

  it("remove instance", (done) => {
    g.remove({ name: "first" })
      .then(() => User.findOne({ name: "first" }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it("remove from class", (done) => {
    User.remove({ name: "first" })
      .then(() => User.findOne({ name: "first" }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it("remove by name", (done) => {
    User.findOneAndRemove({ name: "first" })
      .then(() => User.findOne({ name: "first" }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it("using id and remove", (done) => {
    User.findByIdAndRemove(g._id)
      .then(() => User.findOne({ _id: g._id }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
});
