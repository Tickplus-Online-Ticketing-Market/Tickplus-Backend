const express = require("express");
const router = express.Router();
const eventController = require("../controllers/SponsershipManagement/eventController");
const requestController = require("../controllers/SponsershipManagement/requestController");

// events
router.get("/event/:id", eventController.getEventById); // retrieve
router.get("/event", eventController.getAllEvents); // retrieve all

router.post("/request", requestController.createRequest); // create
router.get("/request/:id", requestController.fetchRequest); // retrieve
router.put("/request/:id", requestController.updateRequest); // update
router.delete("/request/:id", requestController.deleteRequest); // delete
router.get("/request", requestController.fetchRequests); // retrieve all

router.get("/request/update/accept/:id", requestController.updateStatusAccept);//update Status Accept
router.get("/request/update/reject/:id", requestController.updateStatusReject);//update Status Reject

module.exports = router;
