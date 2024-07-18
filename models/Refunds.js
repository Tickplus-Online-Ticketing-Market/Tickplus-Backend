const mongoose = require("mongoose");

const refundSchema = new mongoose.Schema({
    customerName: String,
    eventname: String,
    ticketPrice: Number,
    count: Number,
    totalCost: Number,
    email: String,
    mobile: Number,
    reason: String,
});

const Refund = mongoose.model('Refund', refundSchema);

module.exports = Refund;
