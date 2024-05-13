const mongoose = require("mongoose");

const exampleSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
});

const User = mongoose.model("User", exampleSchema);

module.exports = User;
