const Event = require("../../models/Event");
// Get all events

const getAllEvents = async (req, res, next) => {
  let events;
  try {
    events = await Event.find();                    // Find all events in the database
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
  // Check if no events were found

  if (!events || events.length === 0) {
    return res.status(404).json({ message: "No events found" });
  }
  return res.status(200).json({ events });          // Return the found events
};
// Get event by ID

const getEventById = async (req, res, next) => {
  const id = req.params.id;                      // Get the event ID from the request parameters
  let event;
  try {
    event = await Event.findById(id);             // Find the event with the specified ID
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }
  return res.status(200).json({ event });        // Return the found event
};
// Add a new event


module.exports = {
  getAllEvents,
  getEventById,
};
