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
const CommunityPageRoutes = require("./routes/CommunityPageRoutes");
const TicketPurchaseRouter = require("./routes/TicketPurchaseRouter");
const eventRouter = require("./routes/EventRoute");
const TicketLaunchingRoutes = require("./routes/TicketLaunchingRoutes");

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
app.use("/community-page", CommunityPageRoutes);
app.use("/tpp", TicketPurchaseRouter);
app.use("/events", eventRouter);
app.use("/ticket-launching", TicketLaunchingRoutes);

// Start the server

app.listen(process.env.PORT);
