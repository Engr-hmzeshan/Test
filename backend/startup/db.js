const mongoose = require("mongoose");

module.exports = function () {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(`${process.env.DB_URI}/${process.env.DB_COLLECTION}`, {
      useNewUrlParser: true,
    })
    .then(() => console.log("Connected to mongoDB successfully..."))
    .catch((err) => console.log("Could not connect with mongoDB", err));
};
