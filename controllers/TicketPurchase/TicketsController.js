const Tickets = require("../../models/Tickets");

// Fetch all records
const fetchAllTickets = async (req, res) => {
  const allTickets = await Tickets.find();
  res.json({ Tickets: allTickets });
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
  }
};

module.exports = {
  fetchAllTickets,
  fetchOneTicket,
  createTicket,
};
