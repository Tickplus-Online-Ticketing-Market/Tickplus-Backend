const mongoose = require("mongoose");

const auctionListingSchema = new mongoose.Schema({
  ticketId: {
    type: String,
    required: true,
  },
  spectatorId: {
    type: String,
    required: true,
  },
  startingPrice: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  auctionDays: {
    type: Number,
    required: true,
  },
  remainingDays: {
    type: Number,
  },
  winningBid: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  auctionStatus: {
    type: String,
    enum: ["Active", "Completed", "Cancelled"],
  },
});

const AuctionListing = mongoose.model("AuctionListing", auctionListingSchema);

module.exports = AuctionListing;
