var express = require("express");
var router = express.Router();

var salaryController = require("../Controllers/salaryController");

router.get("/salary/add", salaryController.addSalaryForm);

router.post("/salary/create", salaryController.addSalaryPost);

router.get("/salary", salaryController.viewSalary);

router.get("/salary/:id", salaryController.viewOneSalary);

router.get("/salary/update/:id", salaryController.updateSalaryForm);

router.post("/salary/update/:id", salaryController.updateSalaryPost);

router.get("/salary/delete/:id", salaryController.deleteSalary);

router.get("/join", salaryController.joinTables);

module.exports = router;
