const Customfoam = require("../../models/customfoam");

const fetchCustomfoam = async (req, res) => {
  try {
    // Find the customfoam
    const customfoam = await Customfoam.find();
    // Respond with them
    res.json({ customfoam });
  } catch (error) {
    console.error("Error fetching customfoam:", error);
    res.status(500).json({ error: "Failed to fetch customfoam" });
  }
};

const createCustomfoam = async (req, res) => {
  try {
    // Get the sent in data off request body
    const { fullname, phoneNumber, ticketDetails } = req.body;

    // Create a note with it
    const customfoam = await Customfoam.create({
      fullname,
      phoneNumber,
      ticketDetails,
    });
    // Respond with the new note
    res.json({ customfoam });
  } catch (error) {
    console.error("Error creating customfoam:", error);
    res
      .status(500)
      .json({ error: "Failed to create customfoam", details: error.message });
  }
};

const updateCustomfoam = async (req, res) => {
  try {
    // Get the id off the url
    const customfoamId = req.params.id;
    // Get the data off the req body
    const { fullname, phoneNumber, ticketDetails } = req.body;

    // Find and update the record
    await Customfoam.findByIdAndUpdate(customfoamId, {
      fullname,
      phoneNumber,
      ticketDetails,
    });
    // Find updated note
    const customfoam = await Customfoam.findById(customfoamId);
    // Respond with it
    res.json({ customfoam });
  } catch (error) {
    console.error("Error updating customfoam:", error);
    res
      .status(500)
      .json({ error: "Failed to update customfoam", details: error.message });
  }
};

const deleteCustomfoam = async (req, res) => {
  try {
    // Get id from URL
    const customfoamId = req.params.id;

    // Delete the record
    const result = await Customfoam.deleteOne({ _id: customfoamId });

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
    console.error("Error deleting customfoam:", error);
    res
      .status(500)
      .json({ error: "Failed to delete record", details: error.message });
  }
};

module.exports = {
  fetchCustomfoam,
  createCustomfoam,
  updateCustomfoam,
  deleteCustomfoam,
};
