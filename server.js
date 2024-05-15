// Load env variables
if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

// Import dependencies
const express = require("express");
const cors = require("cors");
const connectToDb = require("./config/connectToDb");
const userController = require("./controllers/usersController");

// Create an express app
const app = express();

// Configure express app
app.use(express.json());
app.use(cors());

// Connect to database
connectToDb();

// Routing
app.get('/users',  userController.fetchUsers);
app.post('/users/create',  userController.createUser);
app.post('/users/login', userController.loginUser);
app.put('/users/:id',  userController.updateUser);
app.delete("/users/:_id",  userController.deleteUser);

// Start our server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
