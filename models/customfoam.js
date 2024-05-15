const mongoose = require("mongoose");

const customSchema = new mongoose.Schema({
  fullname: String,
  phoneNumber: String,
  ticketDetails: String,
});

const Customfoam = mongoose.model("Customfoam", customSchema);
module.exports = Customfoam;
