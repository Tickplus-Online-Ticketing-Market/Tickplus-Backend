const Ticketfoam = require("../../models/ticketfoam");

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

module.exports = {
  fetchPublishedTicketfoam,
};
