const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    eventId: String,
    eventName: String,
    unitPrice: Number
});

const Tickets = mongoose.model('Tickets', ticketSchema);

module.exports = Tickets;