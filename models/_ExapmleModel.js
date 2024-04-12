const mongoose = require("mongoose");

const exampleSchema = new mongoose.Schema({
  title: String,
  body: String,
});

const Example = mongoose.model("Example", exampleSchema);

module.exports = Example;
