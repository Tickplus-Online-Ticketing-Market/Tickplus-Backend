const Event = require("../../models/sponsorevents");

// retrieve data
const fetchEvents = async (req, res) => {
    //find the events
    const events = await Event.find()
    //Respond with them
    res.json({ events });

};

const fetchEvent = async(req, res) => {
    //get id off the url
    const eventId = req.params.id;
    //find the event using that url
    const event = await Event.findById(eventId)
    //respond with the event
    res.json({ event })
};

const createEvent = async (req, res) => {
    //get the sent in data off event body
    const { eName,eId,venue,date,artists,attendees,status, } = req.body;

    //create a event with it
    const event = await Event.create({
        eName,
        eId,
        venue,
        date,
        artists,
        attendees,
        status,
    });

    //respond with the new note
    res.json({ event });
};

const updateEvent = async (req, res) => {
    // get the id off the url
    const eventId = req.params.id;
 
    //get the data off the event body
    const { venue,date, artists,attendees,status, } = req.body;
 
    //find and update the record
    await Event.findByIdAndUpdate(eventId, {
        venue,
        date,
        artists,
        attendees,
        status,
    });
 
    //find updated note
    const event = await Event.findById(eventId);
 
    //respond with it
    res.json({ event });
 };

 const deleteEvent = async (req, res) => {
    //get id off the url
    const eventId = req.params.id;

    //delete the record
    await Event.findByIdAndDelete( eventId );

    //respond
    res.json({success: "Record deleted" });
};

module.exports = {
    fetchEvents,
    fetchEvent,
    createEvent,
    updateEvent,
    deleteEvent,
}