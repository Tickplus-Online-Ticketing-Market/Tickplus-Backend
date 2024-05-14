// models/templateModel.js

const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  clickCount: {
    type: Number,
    default: 0,
  },
});

const Template = mongoose.model("Template", templateSchema);

module.exports = Template;
