// Load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// Import dependencies
const express = require("express");
const cors = require("cors");
const ConnectToDB = require("./config/ConnectToDB");

// Create an Express app
const app = express();

// Configure express app
app.use(express.json());
app.use(cors());

// Connect to DB
ConnectToDB();

// Routing
app.post("/", "Welcome to Tick+");

// Start the server
app.listen(process.env.PORT);
