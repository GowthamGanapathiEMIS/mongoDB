const assert = require("assert");
const User = require("../src/user");

describe("update", () => {
  let gowthu;
  beforeEach((done) => {
    gowthu = new User({ name: "first" });
    gowthu.save().then(() => done());
  });
  repetetive = (action, done) => {
    action
      .then(() => User.find({}))
      .then((user) => {
        assert(user.length === 1);
        assert(user[0].name === "second");
        done();
      });
  };

  it("set and save", (done) => {
    gowthu.set("name", "second");
    repetetive(gowthu.save(), done);
  });
  it("ins update", (done) => {
    repetetive(gowthu.updateOne({ name: "second" }), done);
  });

  it("class update", (done) => {
    repetetive(User.updateOne({ name: "first" }, { name: "second" }), done);
  });

  it("find one and update", (done) => {
    repetetive(
      User.findOneAndUpdate({ name: "first" }, { name: "second" }),
      done
    );
  });

  it("find using Id and update", (done) => {
    repetetive(User.findByIdAndUpdate(gowthu._id, { name: "second" }), done);
  });
});
