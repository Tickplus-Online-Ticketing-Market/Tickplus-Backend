// Load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// Import dependencies
const mongoose = require("mongoose");

async function ConnectToDB() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to database");
  } catch (error) {
    console.log("Cannot connected to database");
    console.log(error);
  }
}

module.exports = ConnectToDB;
