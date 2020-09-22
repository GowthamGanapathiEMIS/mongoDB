const assert = require("assert");
const User = require("../src/user");

describe("searching user from DB", () => {
  let gowthu;
  beforeEach((done) => {
    gowthu = new User({ name: "Gowtham" });
    gowthu.save().then(() => {
      done();
    });
  });

  it("find the users with name Gowtham", (done) => {
    User.find({ name: "Gowtham" }).then((user) => {
      assert(user[0]._id.toString() === gowthu._id.toString());
      done();
    });
  });

  it("find the particular with name Gowtham", (done) => {
    User.findOne({ _id: gowthu._id }).then((user) => {
      assert(user.name === "Gowtham");
      done();
    });
  });
});
