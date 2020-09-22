const assert = require("assert");
const User = require("../src/user");

describe("create records", () => {
  it("saves a user", (done) => {
    const gowthu = new User({ name: "Gowtham" });
    gowthu.save().then(() => {
      assert(!gowthu.isNew);
      done();
    });
  });
});
