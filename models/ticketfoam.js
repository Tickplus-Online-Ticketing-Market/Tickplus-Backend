const mongoose = require("mongoose");

let Ticketfoam; // Declare the model variable

// Check if the model exists
if (mongoose.models && mongoose.models.Ticketfoam) {
  // If the model exists, re-use it
  Ticketfoam = mongoose.model("Ticketfoam");
} else {
  // Define the function to generate a random ticket ID
  const generateTicketId = () => {
    const randomDigits = Math.floor(Math.random() * 10000000); // Generate random 4-digit number
    return `TIK${randomDigits}`;
  };

  // Define the ticket schema
  const ticketSchema = new mongoose.Schema({
    eventname: String,
    date: String,
    venue: String,
    time: String,
    ticketQuantity: String,
    ticketPrice: String,
    ticketStatus: String,
    ticketMode: String,
    imageUrl: String, // Add imageUrl field
    ticketId: {
      type: String,
      default: generateTicketId, // Use the generateTicketId function as default value
    },
    created_at: { type: String, default: () => new Date().toISOString() },
  });

  // Create the Ticketfoam model
  Ticketfoam = mongoose.model("Ticketfoam", ticketSchema);
}

module.exports = Ticketfoam;
