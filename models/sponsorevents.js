const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    eventName: String,
    eventId: String,
    venue: String,
    date: Date,
    artists: String,
    attendees: String,
    status: String,
  });

  const Events = mongoose.model('Event', eventSchema);

  module.exports = Events;