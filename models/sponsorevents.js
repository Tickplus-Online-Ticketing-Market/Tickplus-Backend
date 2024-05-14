const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    eName: String,
    eId: String,
    venue: String,
    date: String,
    artists: String,
    attendees: String,
    status: String,
  });

  const Events = mongoose.model('Event', eventSchema);

  module.exports = Events;