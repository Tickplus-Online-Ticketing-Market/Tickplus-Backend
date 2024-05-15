// Load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// Import dependencies
const express = require("express");
const cors = require("cors");
const ConnectToDB = require("./config/ConnectToDB");

// Import routes
const exampleRoutes = require("./routes/_ExapmleRoutes");
const DigitalCustomizationRoutes = require("./routes/DigitalCustomization");

// Create an Express app
const app = express();

// Configure express app
app.use(express.json());
app.use(cors());
app.use(express.static("uploads/images"));
// Connect to DB
ConnectToDB();

// Routing
app.get("/", (req, res) => {
  res.send("Welcome to Tick+");
});

// Component Routing
app.use("/example", exampleRoutes);
app.use("/digital-customization",DigitalCustomizationRoutes);

// Start the server
app.listen(process.env.PORT);
