const Ticketfoam = require("../../models/ticketfoam");

const fetchTicketfoam = async (req, res) => {
  try {
    // Find the ticketfoam
    const ticketfoam = await Ticketfoam.find().sort();
    // Respond with them
    res.json({ ticketfoam });
  } catch (error) {
    console.error("Error fetching ticketfoam:", error);
    res.status(500).json({ error: "Failed to fetch ticketfoam" });
  }
};

const fetchPublishedTicketfoam = async (req, res) => {
  try {
    // Find the published ticketfoam
    const ticketfoam = await Ticketfoam.find({ ticketStatus: "Published" });

    // Respond with them
    res.json({ ticketfoam });
  } catch (error) {
    console.error("Error fetching published ticketfoam:", error);
    res.status(500).json({ error: "Failed to fetch published ticketfoam" });
  }
};

const createTicketfoam = async (req, res) => {
  // Get the sent in data off request body
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

  // Generate automatic eventid (e.g., based on timestamp)
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
    res.json({ ticketfoam });
  } catch (error) {
    // Handle errors
    console.error("Error creating ticketfoam:", error);
    res
      .status(500)
      .json({ error: "Failed to create ticket", details: error.message });
  }
};

const updateTicketfoam = async (req, res) => {
  try {
    // Get the id off the url
    const ticketfoamId = req.params.id;
    // Get the data off the req body
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

    // Find and update the record
    await Ticketfoam.findByIdAndUpdate(ticketfoamId, {
      eventname,
      date,
      venue,
      time,
      ticketQuantity,
      ticketPrice,
      ticketStatus,
      ticketMode,
      imageUrl,
    });
    // Find updated note
    const ticketfoam = await Ticketfoam.findById(ticketfoamId);
    // Respond with it
    res.json({ ticketfoam });
  } catch (error) {
    console.error("Error updating ticketfoam:", error);
    res
      .status(500)
      .json({ error: "Failed to update ticket", details: error.message });
  }
};

const publishTicketfoam = async (req, res) => {
  try {
    // Get the id off the url
    const ticketfoamId = req.params.id;
    // Get the data off the req body
    const ticketStatus = {
      ticketStatus: "Published",
    };

    // Find and update the record
    await Ticketfoam.findByIdAndUpdate(ticketfoamId, ticketStatus);
    // Find updated note
    const ticketfoam = await Ticketfoam.findById(ticketfoamId);
    // Respond with it
    res.json({ ticketfoam });
  } catch (error) {
    console.error("Error publishing ticketfoam:", error);
    res
      .status(500)
      .json({ error: "Failed to publish ticket", details: error.message });
  }
};

const deleteTicketfoam = async (req, res) => {
  try {
    // Get id from URL
    const ticketfoamId = req.params.id;

    // Delete the record
    const result = await Ticketfoam.deleteOne({ _id: ticketfoamId });

    // Check if the record was deleted
    if (result.deletedCount === 1) {
      // Respond with success message
      res.json({ success: "Record deleted" });
    } else {
      // Respond with error message if the record was not found
      res.status(404).json({ error: "Record not found" });
    }
  } catch (error) {
    // Respond with error message if any error occurs
    console.error("Error deleting ticketfoam:", error);
    res
      .status(500)
      .json({ error: "Failed to delete record", details: error.message });
  }
};

module.exports = {
  fetchTicketfoam,
  createTicketfoam,
  updateTicketfoam,
  deleteTicketfoam,
  publishTicketfoam,
  fetchPublishedTicketfoam,
};
