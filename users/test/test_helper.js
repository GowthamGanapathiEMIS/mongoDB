const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/users_test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

before((done) => {
  mongoose.connection
    .once("open", () => {
      done();
    })
    .on("error", (error) => {
      console.warn("Warning : " + error);
    });
});

beforeEach((done) => {
  const { user, blogpost, comment } = mongoose.connection.collections;
  user.drop(() => {
    comment.drop(() => {
      blogpost.drop(() => {
        done();
      });
    });
  });
});
