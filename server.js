// Load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// Import dependencies
const express = require("express");
const cors = require("cors");
const ConnectToDB = require("./config/ConnectToDB");

// Import routes
const TicketPurchaseRouter = require("./routes/TicketPurchaseRouter");
const TicketLaunchingRoutes = require("./routes/TicketLaunchingRoutes");
const SponsershipManagementRoutes = require("./routes/SponsershipManagementRoutes");
const eventRouter = require("./routes/EventRoute");
const CommunityPageRoutes = require("./routes/CommunityPageRoutes");
const secondaryMarketRoutes = require("./routes/SecondaryMarketRoutes");
const DigitalCustomizationRoutes = require("./routes/DigitalCustomization");

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
app.use("/tpp", TicketPurchaseRouter);
app.use("/ticket-launching", TicketLaunchingRoutes);
app.use("/sponsership-management", SponsershipManagementRoutes);
app.use("/events", eventRouter);
app.use("/community-page", CommunityPageRoutes);
app.use("/secondary-market", secondaryMarketRoutes);
app.use("/digital-customization", DigitalCustomizationRoutes);

// Start the server

app.listen(process.env.PORT);
