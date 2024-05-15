const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  onstatus: {
    type: String,
  },
  code: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
});

module.exports = mongoose.model("Request", RequestSchema);
