const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  eventname: String,
  date: String,
  venue: String,
  time: String,
  ticketQuantity: String,
  ticketPrice: String,
  ticketStatus: String,
  ticketMode: String,
  created_at: { type: String, default: () => new Date().toISOString() },
});

const Ticketfoam = mongoose.model("Ticketfoam", ticketSchema);
module.exports = Ticketfoam;
