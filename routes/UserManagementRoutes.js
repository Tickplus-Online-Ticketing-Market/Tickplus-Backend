const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserManagement/usersController");

// router.post("/", usersController.createExample); // create
// router.get("/:id", usersController.retrieveExample); // retrieve
// router.put("/:id", usersController.updateExample); // update
// router.delete("/:id", usersController.deleteExample); // delete
// router.get("/", usersController.retrieveAllExamples); // retrieve all

router.post("/create", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/get-profile", userController.retrieveUser); // retrieve
router.put("/edit-profile", userController.updateUser);
router.delete("/delete-profile", userController.deleteUser);

module.exports = router;
