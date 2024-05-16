const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  sponsorName: String,
  brandName: String,
  sponsorId: String,
  budget: String,
  email: String,
  addNote: String,
  eventName: String,
  eventId: String,
  venue: String,
  date: Date,
  artists: String,
  time: String,
  status: String,
});

const Request = mongoose.model("SponserRequest", requestSchema);

module.exports = Request;
