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
const TicketLaunchingRoutes = require("./routes/TicketLaunchingRoutes");
const SponsershipManagementRoutes = require("./routes/SponsershipManagementRoutes");
const eventRouter = require("./routes/EventRoute");
const CommunityPageRoutes = require("./routes/CommunityPageRoutes");

// Create an Express app
const app = express();

// Configure express app
app.use(express.json());
app.use(cors());

// Connect to DB
ConnectToDB();

// Routing
app.get("/", (req, res) => {
  res.send("Welcome to Tick+");
});

// Component Routing
app.use("/example", exampleRoutes);
app.use("/ticket-launching", TicketLaunchingRoutes);
app.use("/sponsership-management", SponsershipManagementRoutes);
app.use("/events", eventRouter);
app.use("/community-page", CommunityPageRoutes);

// Start the server

app.listen(process.env.PORT);
