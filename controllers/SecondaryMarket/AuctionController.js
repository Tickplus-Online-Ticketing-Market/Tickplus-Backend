const AuctionListing = require("../../models/AuctionListing");

const createAuctionListing = async (req, res) => {
  try {
    const {
      ticketId,
      spectatorId,
      startingPrice,
      startDate,
      auctionDays,
      remainingDays,
      winningBid,
      auctionStatus,
    } = req.body;

    const auctionListing = await AuctionListing.create({
      ticketId,
      spectatorId,
      startingPrice,
      startDate,
      auctionDays,
      remainingDays,
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
      remainingDays,
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
      remainingDays,
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
    let auctionListings = await AuctionListing.find();
    auctionListings = handleStatus(auctionListings);

    res.json({ auctionListings });
  } catch (error) {
    handleServerError(res, error);
  }
};

const retrieveAllMyAuctionListings = async (req, res) => {
  try {
    const auctionListings = await AuctionListing.find({
      spectatorId: req.params.spectatorId,
    }).sort({ auctionStatus: 1 });

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
    auctionListings = handleStatus(res, auctionListings);

    // Save the updated auction listings
    await Promise.all(auctionListings.map((auction) => auction.save()));

    res.json({ auctionListings });
  } catch (error) {
    handleServerError(res, error);
  }
};

const handleStatus = (res, auctionListings) => {
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
  createAuctionListing,
  retrieveAuctionListing,
  updateAuctionListing,
  deleteAuctionListing,
  retrieveAllAuctionListings,
  retrieveAllMyAuctionListings,
  retrieveActiveAuctionListings,
};
