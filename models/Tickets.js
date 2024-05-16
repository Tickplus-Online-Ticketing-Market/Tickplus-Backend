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
  imageUrl: String,
  ticketId: String,
  created_at: String,
});


const Ticketfoam = mongoose.model("Ticketfoam", ticketSchema);

module.exports = Ticketfoam;