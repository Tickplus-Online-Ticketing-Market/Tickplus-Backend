const Event = require("../../models/sponsorevents");

// retrieve data
const fetchEvents = async (req, res) => {
    try {
        // find the events
        const events = await Event.find();
        // Respond with them
        res.json({ events });
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const fetchEvent = async (req, res) => {
    try {
        // get id from the URL
        const eventId = req.params.id;
        // find the event using that id
        const event = await Event.findById(eventId);
        // respond with the event
        if (event) {
            res.json({ event });
        } else {
            res.status(404).json({ error: "Event not found" });
        }
    } catch (error) {
        console.error("Error fetching event:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const createEvent = async (req, res) => {
    try {
        // get the sent in data from request body
        const { eventName, eventId, venue, date, artists, attendees, status } = req.body;
        // create an event with it
        const event = await Event.create({
            eventName,
            eventId,
            venue,
            date,
            artists,
            attendees,
            status,
        });
        // respond with the new event
        res.json({ event });
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const updateEvent = async (req, res) => {
    try {
        // get the id from the URL
        const eventId = req.params.id;
        // get the data from the request body
        const { venue, date, artists, attendees, status } = req.body;
        // find and update the record
        await Event.findByIdAndUpdate(eventId, {
            venue,
            date,
            artists,
            attendees,
            status,
        });
        // find updated event
        const event = await Event.findById(eventId);
        // respond with it
        res.json({ event });
    } catch (error) {
        console.error("Error updating event:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteEvent = async (req, res) => {
    try {
        // get id from the URL
        const eventId = req.params.id;
        // delete the record
        await Event.findByIdAndDelete(eventId);
        // respond
        res.json({ success: "Record deleted" });
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    fetchEvents,
    fetchEvent,
    createEvent,
    updateEvent,
    deleteEvent,
};
