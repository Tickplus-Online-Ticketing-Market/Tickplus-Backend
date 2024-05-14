const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  auctionId: {
    type: String,
    required: true,
  },
  ticketId: {
    type: String,
    required: true,
  },
  spectatorId: {
    type: String,
    required: true,
  },
  bidValue: {
    type: Number,
    required: true,
  },
  bidDate: {
    type: Date,
    required: true,
  },
  bidStatus: {
    type: String,
    enum: ["Winning", "Won", "Loosing", "Lost"],
  },
});

const bid = mongoose.model("Bid", bidSchema);

module.exports = bid;
