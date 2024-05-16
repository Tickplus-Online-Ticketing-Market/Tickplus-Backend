const Ticketfoam = require("../../models/ticketfoam");

// Error handler utility function
const handleError = (res, error, message, statusCode = 500) => {
  console.error(message, error);
  res.status(statusCode).json({ error: message, details: error.message });
};

const fetchTicketfoam = async (req, res) => {
  try {
    // Find all ticketfoams and sort by date in descending order
    const ticketfoams = await Ticketfoam.find().sort({ date: -1 });
    res.status(200).json({ ticketfoams });
  } catch (error) {
    handleError(res, error, "Failed to fetch ticketfoams");
  }
};

const fetchPublishedTicketfoam = async (req, res) => {
  try {
    const ticketfoams = await Ticketfoam.find({ ticketStatus: "Published" });
    res.status(200).json({ ticketfoams });
  } catch (error) {
    handleError(res, error, "Failed to fetch published ticketfoams");
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
    res.status(201).json({ ticketfoam });
  } catch (error) {
    handleError(res, error, "Failed to create ticket");
  }
};

const updateTicketfoam = async (req, res) => {
  const ticketfoamId = req.params.id;
  const updateData = req.body;

  try {
    const ticketfoam = await Ticketfoam.findByIdAndUpdate(
      ticketfoamId,
      updateData,
      { new: true }
    );

    if (!ticketfoam) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.status(200).json({ ticketfoam });
  } catch (error) {
    handleError(res, error, "Failed to update ticket");
  }
};

const publishTicketfoam = async (req, res) => {
  const ticketfoamId = req.params.id;

  try {
    const ticketfoam = await Ticketfoam.findByIdAndUpdate(
      ticketfoamId,
      { ticketStatus: "Published" },
      { new: true }
    );

    if (!ticketfoam) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.status(200).json({ ticketfoam });
  } catch (error) {
    handleError(res, error, "Failed to publish ticket");
  }
};

const deleteTicketfoam = async (req, res) => {
  const ticketfoamId = req.params.id;

  try {
    const result = await Ticketfoam.deleteOne({ _id: ticketfoamId });

    if (result.deletedCount === 1) {
      res.status(200).json({ success: "Record deleted" });
    } else {
      res.status(404).json({ error: "Record not found" });
    }
  } catch (error) {
    handleError(res, error, "Failed to delete record");
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
