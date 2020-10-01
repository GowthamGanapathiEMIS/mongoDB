const assert = require("assert");
const User = require("../src/user");

describe("searching user from DB", () => {
  let gowthu, gowthu1, gowthu2, gowthu3, gowthu4;
  beforeEach((done) => {
    gowthu = new User({ name: "aGowtham" });
    gowthu1 = new User({ name: "bGowtham1" });
    gowthu2 = new User({ name: "cGowtham2" });
    gowthu3 = new User({ name: "dGowtham3" });
    gowthu4 = new User({ name: "eGowtham4" });

    Promise.all([
      gowthu.save(),
      gowthu1.save(),
      gowthu2.save(),
      gowthu3.save(),
      gowthu4.save(),
    ]).then(() => {
      done();
    });
  });

  it("find the users with name Gowtham", (done) => {
    User.find({ name: "aGowtham" }).then((user) => {
      assert(user[0]._id.toString() === gowthu._id.toString());
      done();
    });
  });

  it("find the particular with name Gowtham", (done) => {
    User.findOne({ _id: gowthu._id }).then((user) => {
      assert(user.name === "aGowtham");
      done();
    });
  });
  it("skipping and limit", (done) => {
    User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(3)
      .then((user) => {
        assert(user[0].name === "bGowtham1");
        assert(user[1].name === "cGowtham2");
        done();
      });
  });
});
