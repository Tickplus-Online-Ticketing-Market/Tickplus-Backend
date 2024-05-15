const express = require("express");
const router = express.Router();
const eventController = require("../controllers/SponsershipManagement/eventController");
const requestController = require("../controllers/SponsershipManagement/requestController");

router.post("/event", eventController.createEvent); // create
router.get("/event/:id", eventController.fetchEvent); // retrieve
router.put("/event/:id", eventController.updateEvent); // update
router.delete("/event/:id", eventController.deleteEvent); // delete
router.get("/event", eventController.fetchEvents); // retrieve all

router.post("/request", requestController.createRequest); // create
router.get("/request/:id", requestController.fetchRequest); // retrieve
router.put("/request/:id", requestController.updateRequest); // update
router.delete("/request/:id", requestController.deleteRequest); // delete
router.get("/request", requestController.fetchRequests); // retrieve all

module.exports = router;
