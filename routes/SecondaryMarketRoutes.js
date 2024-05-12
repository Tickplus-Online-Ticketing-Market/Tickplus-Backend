const express = require("express");
const router = express.Router();
const AuctionController = require("../controllers/SecondaryMarket/AuctionController");
const BidController = require("../controllers/SecondaryMarket/BidController");
const AnalyticsController = require("../controllers/SecondaryMarket/AnalyticsController");

// Auction Listings
router.post("/my-auction-listings", AuctionController.createAuctionListing); // create
router.put("/my-auction-listings/:id", AuctionController.updateAuctionListing); // update
router.delete(
  "/my-auction-listings/:id",
  AuctionController.deleteAuctionListing
); // delete
router.get(
  "/my-auction-listings",
  AuctionController.retrieveAllAuctionListings
); // retrieve all
router.get(
  "/my-auction-listings/active",
  AuctionController.retrieveActiveAuctionListings
); // retrieve all
router.get(
  "/my-auction-listings/Completed",
  AuctionController.retrieveCompletedAuctionListings
); // retrieve All Completed
router.get(
  "/my-auction-listings/my/:spectatorId",
  AuctionController.retrieveAllMyAuctionListings
); // retrieve all
router.get(
  "/my-auction-listings/:id",
  AuctionController.retrieveAuctionListing
); // retrieve

// Bids
router.post("/my-bids", BidController.createBid); // create
router.delete("/my-bids/:id", BidController.deleteBid); // delete
router.get("/my-bids", BidController.retrieveAllBids); // retrieve all
router.get("/my-bids/my/:spectatorId", BidController.retrieveAllMyBids); // retrieve all my
router.get("/my-bids/:id", BidController.retrieveBid); // retrieve by Id

// Analytics
router.get(
  "/analytics/auctions-byprofit",
  AnalyticsController.retrieveAllAuctionByProfit
);
router.get(
  "/analytics/auctions-bystatus",
  AnalyticsController.countAllAuctionByStatus
);
router.get(
  "/analytics/bids-bystatus",
  AnalyticsController.countAllBidsByStatus
);

module.exports = router;
