// Load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// Import dependencies
const express = require("express");
const cors = require("cors");
const ConnectToDB = require("./config/ConnectToDB");

// Import routes
const UserManagementRoutes = require("./routes/UserManagementRoutes");
const CommunityPageRoutes = require("./routes/CommunityPageRoutes");
const TicketPurchaseRouter = require("./routes/TicketPurchaseRouter");
const eventRouter = require("./routes/EventRoute");
const TicketLaunchingRoutes = require("./routes/TicketLaunchingRoutes");
const SponsershipManagementRoutes = require("./routes/SponsershipManagementRoutes");
const DigitalCustomizationRoutes = require("./routes/DigitalCustomization");
const secondaryMarketRoutes = require("./routes/SecondaryMarketRoutes");

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
app.use("/users", UserManagementRoutes);
app.use("/community-page", CommunityPageRoutes);
app.use("/tpp", TicketPurchaseRouter);
app.use("/events", eventRouter);
app.use("/ticket-launching", TicketLaunchingRoutes);
app.use("/sponsership-management", SponsershipManagementRoutes);
app.use("/digital-customization", DigitalCustomizationRoutes);
app.use("/secondary-market", secondaryMarketRoutes);

// Start the server

app.listen(process.env.PORT);
