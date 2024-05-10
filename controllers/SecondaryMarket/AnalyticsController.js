const AuctionListing = require("../../models/AuctionListing");
const Bid = require("../../models/Bid");

const retrieveAuctionListing = async (req, res) => {
  try {
    const auctionListing = await AuctionListing.findById(req.params.id);

    res.json({ auctionListing });
  } catch (error) {
    handleServerError(res, error);
  }
};

const retrieveAllAuctionListings = async (req, res) => {
  try {
    let auctionListings = await AuctionListing.find();
    auctionListings = await handleStatus(res, auctionListings);

    res.json({ auctionListings });
  } catch (error) {
    handleServerError(res, error);
  }
};

const retrieveAllAuctionPrices = async (req, res) => {
  try {
    let auctionListings = await AuctionListing.find({
      spectatorId: req.params.spectatorId,
    }).sort({ auctionStatus: 1 });

    auctionListings = await handleStatus(res, auctionListings);

    res.json({ auctionListings });
  } catch (error) {
    handleServerError(res, error);
  }
};

const retrieveActiveAuctionListings = async (req, res) => {
  try {
    let auctionListings = await AuctionListing.find({
      auctionStatus: "Active",
    });
    auctionListings = await handleStatus(res, auctionListings);

    res.json({ auctionListings });
  } catch (error) {
    handleServerError(res, error);
  }
};

const retrieveCompletedAuctionListings = async (req, res) => {
  try {
    let auctionListings = await AuctionListing.find({
      auctionStatus: "Completed",
    })
      .sort({ startDate: -1 })
      .limit(5);
    auctionListings = await handleStatus(res, auctionListings);

    res.json({ auctionListings });
  } catch (error) {
    handleServerError(res, error);
  }
};

const handleStatus = async (res, auctionListings) => {
  try {
    const currentDate = new Date();

    for (let i = 0; i < auctionListings.length; i++) {
      const auctionStartDate = new Date(auctionListings[i].startDate);
      const auctionDays = auctionListings[i].auctionDays;

      // Calculate the difference in milliseconds between current date and start date
      const timeDifferenceMs = currentDate - auctionStartDate;
      // Convert milliseconds to days
      const daysDifference = timeDifferenceMs / (1000 * 60 * 60 * 24);

      // Check if the auction is completed
      if (daysDifference > auctionDays) {
        // Set auction status to "Completed"
        auctionListings[i].auctionStatus = "Completed";
        auctionListings[i].remainingDays = 0;
      } else {
        // Set auction status to "Active"
        auctionListings[i].auctionStatus = "Active";
        // Set remaining days for the auction
        auctionListings[i].remainingDays = Math.ceil(
          auctionDays - daysDifference
        );
      }
    }
    // Save the updated auction listings
    await Promise.all(auctionListings.map((auction) => auction.save()));

    return auctionListings;
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
  retrieveAuctionListing,
  retrieveAllAuctionListings,
  retrieveAllAuctionPrices,
  retrieveActiveAuctionListings,
  retrieveCompletedAuctionListings,
};
