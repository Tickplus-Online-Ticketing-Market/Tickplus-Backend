const AuctionListing = require("../../models/AuctionListing");

const createAuctionListing = async (req, res) => {
  try {
    const {
      ticketId,
      spectatorId,
      startingPrice,
      startDate,
      auctionDays,
      winningBid,
      auctionStatus,
    } = req.body;

    const auctionListing = await AuctionListing.create({
      ticketId,
      spectatorId,
      startingPrice,
      startDate,
      auctionDays,
      winningBid,
      auctionStatus,
    });

    res.status(201).json({ auctionListing });
  } catch (error) {
    handleServerError(res, error);
  }
};

const retrieveAuctionListing = async (req, res) => {
  try {
    const auctionListing = await AuctionListing.findById(req.params.id);

    res.json({ auctionListing });
  } catch (error) {
    handleServerError(res, error);
  }
};

const updateAuctionListing = async (req, res) => {
  try {
    const {
      ticketId,
      spectatorId,
      startingPrice,
      startDate,
      auctionDays,
      winningBid,
      auctionStatus,
    } = req.body;

    const auctionId = req.params.id;

    // Construct the update object
    const updateData = {
      ticketId,
      spectatorId,
      startingPrice,
      startDate,
      auctionDays,
      winningBid,
      auctionStatus,
    };

    // Update the auction listing
    await AuctionListing.findByIdAndUpdate(auctionId, updateData);

    // Fetch the updated auction listing
    const auctionListing = await AuctionListing.findById(auctionId);

    res.json({ auctionListing });
  } catch (error) {
    handleServerError(res, error);
  }
};

const deleteAuctionListing = async (req, res) => {
  try {
    const auctionListing = await AuctionListing.findByIdAndDelete(
      req.params.id
    );

    res.json({ auctionListing });
  } catch (error) {
    handleServerError(res, error);
  }
};

const retrieveAllAuctionListings = async (req, res) => {
  try {
    const auctionListings = await AuctionListing.find();

    res.json({ auctionListings });
  } catch (error) {
    handleServerError(res, error);
  }
};

const retrieveAllMyAuctionListings = async (req, res) => {
  try {
    const auctionListings = await AuctionListing.find({
      spectatorId: req.params.spectatorId,
    });

    res.json({ auctionListings });
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
  createAuctionListing,
  retrieveAuctionListing,
  updateAuctionListing,
  deleteAuctionListing,
  retrieveAllAuctionListings,
  retrieveAllMyAuctionListings,
};
