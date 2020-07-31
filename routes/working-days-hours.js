const express = require("express");
const router = express.Router();

const WorkingDaysHoursController = require("../controller/working-days-hours-controller");

router.post("/create", WorkingDaysHoursController.createWorkingDaysAndHours);

router.get("/getWorkingDaysAndHours", WorkingDaysHoursController.getWorkingDaysAndHours);

router.put("/editWorkingDaysAndHours", WorkingDaysHoursController.editWorkingDaysAndHours);


module.exports = router;
