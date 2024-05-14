const Tickets = require("../../models/Tickets");

// Fetch all records
const fetchAllTickets = async (req, res) => {
  try {
    const allTickets = await Tickets.find();
    res.json({ Tickets: allTickets });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Fetch one record
const fetchOneTicket = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const ticket = await Tickets.findById(ticketId);
    if (!ticket) {
      return res.json({ error: "Ticket not found" });
    }
    res.json({ Tickets: ticket });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Create a record
const createTicket = async (req, res) => {
  try {
    const { eventId, eventName, unitPrice } = req.body;
    const ticket = await Tickets.create({
      eventId,
      eventName,
      unitPrice,
    });
    res.json({ Tickets: ticket });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  fetchAllTickets,
  fetchOneTicket,
  createTicket,
};
