const Bid = require("../../models/Bid");
const AuctionListing = require("../../models/AuctionListing");

const createBid = async (req, res) => {
  try {
    const { auctionId, ticketId, spectatorId, bidValue, bidDate, bidStatus } =
      req.body;

    const bid = await Bid.create({
      auctionId,
      ticketId,
      spectatorId,
      bidValue,
      bidDate,
      bidStatus,
    });

    await updateWinningBidInAuctionListing(res, auctionId, bidValue);

    res.status(201).json({ bid });
  } catch (error) {
    handleServerError(res, error);
  }
};

const retrieveBid = async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id);

    res.json({ bid });
  } catch (error) {
    handleServerError(res, error);
  }
};

const deleteBid = async (req, res) => {
  try {
    const bid = await Bid.findByIdAndDelete(req.params.id);
    res.json({ bid });
  } catch (error) {
    handleServerError(res, error);
  }
};

const retrieveAllBids = async (req, res) => {
  try {
    await updateBidStatusForAllAuctions();
    const bids = await Bid.find();

    res.json({ bids });
  } catch (error) {
    handleServerError(res, error);
  }
};

const retrieveAllMyBids = async (req, res) => {
  try {
    await updateBidStatusForAllAuctions();
    const bids = await Bid.find({
      spectatorId: req.params.spectatorId,
    });

    res.json({ bids });
  } catch (error) {
    handleServerError(res, error);
  }
};

const updateWinningBidInAuctionListing = async (res, auctionId, bidValue) => {
  try {
    // Construct the update object
    const updateData = {
      auctionId,
      winningBid: bidValue,
    };

    // Update the auction listing
    await AuctionListing.findByIdAndUpdate(auctionId, updateData);
  } catch (error) {
    handleServerError(res, error);
  }
};

const updateBidStatusForAuction = async (auctionId) => {
  try {
    // Find all bids for the given auctionId
    const bids = await Bid.find({ auctionId }).sort({ bidValue: -1 }); // Sort bids by bidValue in descending order

    if (bids.length === 0) {
      // If there are no bids for the auction, return
      return;
    }

    const maxBid = bids[0]; // Maximum bid will be the first bid after sorting

    // Update all bids for the auction
    await Bid.updateMany(
      { auctionId },
      {
        $set: {
          bidStatus: "Losing",
        },
      }
    );

    // Update the bid with the maximum bid value to "Winning"
    await Bid.findByIdAndUpdate(maxBid._id, { $set: { bidStatus: "Winning" } });

    // Update the winningBid field in the associated AuctionListing
    await AuctionListing.findByIdAndUpdate(auctionId, {
      winningBid: maxBid.bidValue,
    });

    return maxBid.bidStatus;
  } catch (error) {
    throw error;
  }
};

const updateBidStatusForCompletedAuction = async (auctionId) => {
  try {
    // Update all bids for the completed auction
    await Bid.updateMany(
      { auctionId, bidStatus: "Winning" },
      { $set: { bidStatus: "Won" } }
    );

    await Bid.updateMany(
      { auctionId, bidStatus: "Losing" },
      { $set: { bidStatus: "Lost" } }
    );
  } catch (error) {
    throw error;
  }
};

const updateBidStatusForAllAuctions = async () => {
  try {
    // Find all active auction listings
    const activeAuctions = await AuctionListing.find({
      auctionStatus: "Active",
    });

    // Update bid status for each active auction
    for (const auction of activeAuctions) {
      await updateBidStatusForAuction(auction._id);
    }

    // Find all completed auction listings
    const completedAuctions = await AuctionListing.find({
      auctionStatus: "Completed",
    });

    // Update bid status for each completed auction
    for (const auction of completedAuctions) {
      await updateBidStatusForCompletedAuction(auction._id);
    }
  } catch (error) {
    throw error;
  }
};

const handleServerError = (res, error) => {
  res
    .status(500)
    .json({ error: "An error occurred while processing the request." });
};

module.exports = {
  createBid,
  retrieveBid,
  deleteBid,
  retrieveAllBids,
  retrieveAllMyBids,
  updateBidStatusForAllAuctions,
};
