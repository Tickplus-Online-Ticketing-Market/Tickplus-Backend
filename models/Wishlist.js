const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
    eventId: String,
    eventName: String, 
    totalCost: Number, 
});


wishlistSchema.pre('save', function (next) {
    this.totalCost = this.qty * this.unitPrice;
    next();
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
