const mongoose = require("mongoose");

const paySchema = new mongoose.Schema({
    eventId: String,
    eventName: String,
    unitPrice: Number,
    qty: Number,
    totalCost: Number,
    cardNum: Number
});

const Payments = mongoose.model('Purchase', paySchema);

module.exports = Payments;