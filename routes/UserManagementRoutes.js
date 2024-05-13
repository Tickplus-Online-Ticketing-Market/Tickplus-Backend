const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserManagement/UserController");

router.post("/new-user", userController.createUser); // create

module.exports = router;
