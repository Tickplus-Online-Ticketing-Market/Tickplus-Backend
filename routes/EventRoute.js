const express = require("express");
const router = express.Router();

const eventController = require("../controllers/EventLaunching/EventController");

router.get("/", eventController.getAllEvents);   //Defines a route for handling GET requests 
router.post("/", eventController.addEvent);       //Defines a route for handling POST requests 
router.get("/:id", eventController.getEventById); //Defines a route for handling GET requests to a specific event ID
router.put("/:id", eventController.updateEvent);  //Defines a route for handling PUT requests to a specific event ID path 
router.delete("/:id", eventController.deleteEvent);  //Defines a route for handling DELETE requests to a specific event ID path 

module.exports = router;
 