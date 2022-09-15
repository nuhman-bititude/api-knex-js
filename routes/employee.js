var express = require("express");
var router = express.Router();

const employeeController = require("../Controllers/employeeController");

router.get("/employee/add", employeeController.createEmployeeForm);

router.post("/employee/create", employeeController.createEmployeePost);

router.get("/employees", employeeController.viewEmployees);

router.get("/employee/:id", employeeController.viewOneEmployee);

router.get("/employee/update/:id", employeeController.updateEmployeeForm);

router.post("/employee/update/:id", employeeController.updateEmployeePost);

router.get("/employee/delete/:id", employeeController.deleteEmployee);

module.exports = router;
