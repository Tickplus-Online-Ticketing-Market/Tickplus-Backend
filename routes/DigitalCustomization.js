const express = require("express");
const router = express.Router();
const RequestController = require("../controllers/DigitalCustomization/RequestControllers");
const PostControllers = require("../controllers/DigitalCustomization/PostControllers");

router.get("/poster", PostControllers.getAllRequest);
router.post("/poster", PostControllers.addRequest);
router.get("/poster/:id", PostControllers.getById);
router.post("/poster/:id", PostControllers.uploadFile);
router.put("/poster/:id", PostControllers.updateRequest);
router.delete("/poster/:id", PostControllers.deleteRequest);

router.get("/", RequestController.getAllRequest);
router.post("/", RequestController.addRequest);
router.get("/:id", RequestController.getById);
router.post("/:id", RequestController.uploadFile);
router.put("/:id", RequestController.updateRequest);
router.delete("/:id", RequestController.deleteRequest);

//export
module.exports = router;
