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

const addEvent = async (req, res, next) => {
  const { image, name, venue, date, artist, about, time, price } = req.body;       // Extract event data from the request body
  
  let event;
  try {
    event = new Event({         // Create a new event instance with the extracted data
      image,
      name,
      venue,
      date,
      artist,
      about,
      time,
      price,
    });
    await event.save();         // Save the new event to the database
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
  // Check if the event was not saved

  if (!event) {
    return res.status(500).json({ message: "Unable to add event" });
  }
  return res.status(201).json({ event });// Return the newly added event
};

// Update an existing event

const updateEvent = async (req, res, next) => {
  const id = req.params.id; // Get the event ID from the request parameters
  const { name, image, venue, date, artist, about, time, price } = req.body;
  try {
    const event = await Event.findByIdAndUpdate( // Find and update the event with the specified ID
      id,
      { name, image, venue, date, artist, about, time, price },   // New event data
      { new: true }                    // Return the updated event
    );
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    return res.status(200).json({ event });  // Return the updated event
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete an event
//this is wprking code
const deleteEvent = async (req, res, next) => {
  const id = req.params.id;      // Get the event ID from the request parameters
  try {
    const event = await Event.findByIdAndDelete(id);   // Find and delete the event with the specified ID
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });   // Return success message
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};







module.exports = {
  getAllEvents,
  getEventById,
  addEvent,
  updateEvent,
  deleteEvent,
};
