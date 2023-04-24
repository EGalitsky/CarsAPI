const express = require("express");
const controller = require("../controller/controller");

const router = express.Router();

router.post("/", controller.createCar);
router.get("/", controller.getCars);
router.get("/:id", controller.getCarById);
router.patch("/:id", controller.updateCar);
router.delete("/:id", controller.deleteCar);

module.exports = router;
