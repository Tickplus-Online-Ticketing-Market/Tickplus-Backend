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
    time: String
  });

  const Request = mongoose.model('Request', requestSchema);

  module.exports = Request;