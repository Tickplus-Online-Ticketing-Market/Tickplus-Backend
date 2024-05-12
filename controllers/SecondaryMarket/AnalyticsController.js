const AuctionListing = require("../../models/AuctionListing");
const Bid = require("../../models/Bid");

const retrieveAllAuctionByProfit = async (req, res) => {
  try {
    let auctionListings = await AuctionListing.aggregate([
      {
        $match: {
          winningBid: { $ne: "No Bids Placed" },
        },
      },
      {
        $project: {
          _id: 1,
          ticketId: 1,
          startDate: 1,
          startingPrice: 1,
          winningBid: {
            $cond: [
              { $eq: ["$winningBid", "No Bids Placed"] },
              0, // If winningBid is "No Bids Placed", set it to 0
              { $toDouble: "$winningBid" }, // Convert winningBid to double
            ],
          },
        },
      },
      {
        $match: {
          winningBid: { $ne: null }, // Filter out listings where winningBid is null
        },
      },
      {
        $addFields: {
          difference: { $subtract: ["$winningBid", "$startingPrice"] },
        },
      },
      {
        $sort: { difference: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    res.json({ auctionListings });
  } catch (error) {
    handleServerError(res, error);
  }
};

const countAllAuctionByStatus = async (req, res) => {
  try {
    let auctionStatusCounts = await AuctionListing.aggregate([
      {
        $group: {
          _id: "$auctionStatus",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          name: "$_id",
          value: "$count",
          _id: 0, // Exclude _id field
        },
      },
    ]);

    res.json({ auctionStatusCounts });
  } catch (error) {
    handleServerError(res, error);
  }
};

const countAllBidsByStatus = async (req, res) => {
  try {
    let bidsStatusCounts = await Bid.aggregate([
      {
        $match: {
          bidStatus: { $exists: true }, // Filter out documents where bidStatus doesn't exist
        },
      },
      {
        $group: {
          _id: "$bidStatus",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          name: "$_id",
          value: "$count",
          _id: 0, // Exclude _id field
        },
      },
    ]);

    res.json({ bidsStatusCounts });
  } catch (error) {
    handleServerError(res, error);
  }
};

const handleServerError = (res, error) => {
  res
    .status(500)
    .json({ error: "An error occurred while processing the request." });
};

module.exports = {
  retrieveAllAuctionByProfit,
  countAllAuctionByStatus,
  countAllBidsByStatus,
};
