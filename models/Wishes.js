const mongoose = require("mongoose");

const wishSchema = new mongoose.Schema({
    imageUrl: String,
    eventname: String,
    ticketPrice: Number
});

const Wishes = mongoose.model('Wishes', wishSchema);

module.exports = Wishes;