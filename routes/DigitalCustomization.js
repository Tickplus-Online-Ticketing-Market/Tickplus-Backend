const express = require("express");
const router = express.Router();
const RequestController = require("../controllers/DigitalCustomization/RequestControllers");

router.get("/", RequestController.getAllRequest);
router.post("/", RequestController.addRequest);
router.get("/:id", RequestController.getById);
router.post("/:id", RequestController.uploadFile);
router.put("/:id", RequestController.updateRequest);
router.delete("/:id", RequestController.deleteRequest);

//export
module.exports = router;
