const express = require("express");
const router = express.Router();
const AuctionController = require("../controllers/SecondaryMarket/AuctionController");

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
  "/my-auction-listings/my/:spectatorId",
  AuctionController.retrieveAllMyAuctionListings
); // retrieve all
router.get(
  "/my-auction-listings/:id",
  AuctionController.retrieveAuctionListing
); // retrieve
module.exports = router;
