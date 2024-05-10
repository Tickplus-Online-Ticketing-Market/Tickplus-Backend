const mongoose = require("mongoose");

const wishSchema = new mongoose.Schema({
    eventId: String,
    eventName: String,
    unitPrice: Number
});

const Wishes = mongoose.model('Wishes', wishSchema);

module.exports = Wishes;