//Import dependencies
const express = require("express");
const router = express.Router();
const ticketfoamController = require("../controllers/TicketLaunching/ticketfoamController");
const customfoamController = require("../controllers/TicketLaunching/customfoamController");
const analyticsController = require("../controllers/TicketLaunching/analyticsController");
const TemplateController = require("../controllers/TicketLaunching/TemplateController");

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

//Tepmlate clcks
// Route to record click for system template
router.put("/click-count/system", async (req, res) => {
  const result = await TemplateController.recordClick("system");
  res.json(result);
});

// Route to record click for custom template
router.put("/click-count/custom", async (req, res) => {
  const result = await TemplateController.recordClick("custom");
  res.json(result);
});

// Route to get click counts
router.get("/clickCounts", async (req, res) => {
  const clickCounts = await TemplateController.getClickCounts();
  res.json(clickCounts);
});

module.exports = router;
