const Ticketfoam = require("../../models/ticketfoam");

const fetchTicketfoam = async (req, res) => {
  try {
    // Find all ticketfoams
    const ticketfoam = await Ticketfoam.find().sort();
    // Respond with them
    res.status(200).json({ ticketfoam });
  } catch (error) {
    console.error("Error fetching ticketfoam:", error);
    res.status(500).json({ error: "Failed to fetch ticketfoam" });
  }
};

const fetchPublishedTicketfoam = async (req, res) => {
  try {
    // Find published ticketfoams
    const ticketfoam = await Ticketfoam.find({ ticketStatus: "Published" });
    // Respond with them
    res.status(200).json({ ticketfoam });
  } catch (error) {
    console.error("Error fetching published ticketfoam:", error);
    res.status(500).json({ error: "Failed to fetch published ticketfoam" });
  }
};

const createTicketfoam = async (req, res) => {
  const {
    eventname,
    date,
    venue,
    time,
    ticketQuantity,
    ticketPrice,
    ticketMode,
    imageUrl,
  } = req.body;

  const timestamp = Date.now();
  const eventid = `EVENT_${timestamp}`;

  try {
    // Create a ticket with the generated eventid
    const ticketfoam = await Ticketfoam.create({
      eventid,
      eventname,
      date,
      venue,
      time,
      ticketQuantity,
      ticketPrice,
      ticketStatus: "Not Published",
      ticketMode,
      imageUrl,
    });
    // Respond with the new ticket
    res.status(201).json({ ticketfoam });
  } catch (error) {
    console.error("Error creating ticketfoam:", error);
    res
      .status(500)
      .json({ error: "Failed to create ticket", details: error.message });
  }
};

const updateTicketfoam = async (req, res) => {
  const ticketfoamId = req.params.id;
  const {
    eventname,
    date,
    venue,
    time,
    ticketQuantity,
    ticketPrice,
    ticketStatus,
    ticketMode,
    imageUrl,
  } = req.body;

  try {
    // Find and update the record
    const ticketfoam = await Ticketfoam.findByIdAndUpdate(
      ticketfoamId,
      {
        eventname,
        date,
        venue,
        time,
        ticketQuantity,
        ticketPrice,
        ticketStatus,
        ticketMode,
        imageUrl,
      },
      { new: true }
    );

    if (!ticketfoam) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    // Respond with updated ticket
    res.status(200).json({ ticketfoam });
  } catch (error) {
    console.error("Error updating ticketfoam:", error);
    res
      .status(500)
      .json({ error: "Failed to update ticket", details: error.message });
  }
};

const publishTicketfoam = async (req, res) => {
  const ticketfoamId = req.params.id;

  try {
    // Update ticket status to "Published"
    const ticketfoam = await Ticketfoam.findByIdAndUpdate(
      ticketfoamId,
      { ticketStatus: "Published" },
      { new: true }
    );

    if (!ticketfoam) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    // Respond with the published ticket
    res.status(200).json({ ticketfoam });
  } catch (error) {
    console.error("Error publishing ticketfoam:", error);
    res
      .status(500)
      .json({ error: "Failed to publish ticket", details: error.message });
  }
};

const deleteTicketfoam = async (req, res) => {
  const ticketfoamId = req.params.id;

  try {
    // Delete the record
    const result = await Ticketfoam.deleteOne({ _id: ticketfoamId });

    if (result.deletedCount === 1) {
      // Respond with success message
      res.status(200).json({ success: "Record deleted" });
    } else {
      // Respond with error message if the record was not found
      res.status(404).json({ error: "Record not found" });
    }
  } catch (error) {
    console.error("Error deleting ticketfoam:", error);
    res
      .status(500)
      .json({ error: "Failed to delete record", details: error.message });
  }
};

module.exports = {
  fetchTicketfoam,
  fetchPublishedTicketfoam,
  createTicketfoam,
  updateTicketfoam,
  publishTicketfoam,
  deleteTicketfoam,
};
