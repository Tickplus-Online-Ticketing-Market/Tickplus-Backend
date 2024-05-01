const mongoose = require("mongoose");

const refundSchema = new mongoose.Schema({
    event: String,
    tCode: String,
    email: String,
    reason: String,
    addNote: String,
});

const Refund = mongoose.model('Refund', refundSchema);

module.exports = Refund;