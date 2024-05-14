const express = require("express");
const router = express.Router();
const eventController = require("../controllers/SponsershipManagement/eventController");
const requestController = require("../controllers/SponsershipManagement/requestController");

router.post("/", eventController.createEvent); // create
router.get("/:id", eventController.fetchEvent); // retrieve
router.put("/:id", eventController.updateEvent); // update
router.delete("/:id", eventController.deleteEvent); // delete
router.get("/", eventController.fetchEvents); // retrieve all

router.post("/", requestController.createRequest); // create
router.get("/:id", requestController.fetchRequest); // retrieve
router.put("/:id", requestController.updateRequest); // update
router.delete("/:id", requestController.deleteRequest); // delete
router.get("/", requestController.fetchRequests); // retrieve all

module.exports = router;
