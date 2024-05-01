const Tickets = require("../../models/Tickets");

// Fetch all records
const fetchAllTickets = async (req, res) => {
    const allTickets = await Tickets.find();
    res.json({ Tickets: allTickets });
};

// Fetch one record
const fetchOneTicket = async (req, res) => {
    const ticketId = req.params.id;
    const ticket = await Tickets.findById(ticketId);
    if (!ticket) {
        return res.json({ error: "Ticket not found" });
    }
    res.json({ Tickets: ticket });
};

// Create a record
const createTicket = async (req, res) => {
    const { eventId, eventName, unitPrice } = req.body;
    const ticket = await Tickets.create({
        eventId,
        eventName,
        unitPrice
    });
    res.json({ Tickets: ticket });
};

module.exports = {
    fetchAllTickets,
    fetchOneTicket,
    createTicket,
};
