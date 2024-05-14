//Import dependencies
const express = require("express");
const router = express.Router();
const ticketfoamController = require("../controllers/TicketLaunching/ticketfoamController");
const customfoamController = require("../controllers/TicketLaunching/customfoamController");
const analyticsController = require("../controllers/TicketLaunching/analyticsController");

//Routiing
//Retrieve
router.get("/ticketfoam", ticketfoamController.fetchTicketfoam);
router.get("/customfoam", customfoamController.fetchCustomfoam);
router.get(
  "/ticketfoam/published",
  ticketfoamController.fetchPublishedTicketfoam
);

//Create
router.post("/ticketfoam", ticketfoamController.createTicketfoam);
router.post("/customfoam", customfoamController.createCustomfoam);

//Update
router.put("/ticketfoam/publish/:id", ticketfoamController.publishTicketfoam);
router.put("/ticketfoam/:id", ticketfoamController.updateTicketfoam);
router.put("/customfoam/:id", customfoamController.updateCustomfoam);

//Delete
router.delete("/ticketfoam/:id", ticketfoamController.deleteTicketfoam);
router.delete("/customfoam/:id", customfoamController.deleteCustomfoam);

//Analytics
router.get(
  "/analytics/ticket-counts-by-eventname",
  analyticsController.getTicketCountsByEventname
);

module.exports = router;
