const mongoose = require("mongoose");

const refundSchema = new mongoose.Schema({
    customerName: String,
    eventName: String,
    eventId: String,
    unitPrice: Number,
    count: Number,
    totalCost: Number,
    email: String,
    mobile: Number,
    reason: String,
});

const Refund = mongoose.model('Refund', refundSchema);

module.exports = Refund;
