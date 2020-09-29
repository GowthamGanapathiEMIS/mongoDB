const assert = require("assert");
const User = require("../src/user");
describe("validation", () => {
  it("check there should be the name", () => {
    const gowthu = new User({ name: undefined });
    const validationResult = gowthu.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === "Name is missing.");
  });

  it("should have min 2 char", () => {
    const gowthu = new User({ name: "Go" });
    const validationResult = gowthu.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === "Name should have min 2 chars");
  });

  it("invalid data", (done) => {
    const gowthu = new User({ name: "GG" });
    gowthu.save().catch((vr) => {
      const { message } = vr.errors.name;
      assert(message === "Name should have min 2 chars");
      done();
    });
  });
});
