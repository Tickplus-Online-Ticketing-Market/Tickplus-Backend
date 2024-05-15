const express = require("express");
const router = express.Router();
const exampleController = require("../controllers/_ExampleController/_ExampleController");

router.post("/", exampleController.createExample); // create
router.get("/:id", exampleController.retrieveExample); // retrieve
router.put("/:id", exampleController.updateExample); // update
router.delete("/:id", exampleController.deleteExample); // delete
router.get("/", exampleController.retrieveAllExamples); // retrieve all
// test
module.exports = router;
