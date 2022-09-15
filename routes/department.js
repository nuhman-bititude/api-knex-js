var express = require("express");
var router = express.Router();
var departmentController = require("../Controllers/departmentController");

router.get("/department/add", departmentController.createDepartmentForm);

router.post("/department/create", departmentController.createDepartmentPost);

router.get("/departments", departmentController.viewDepartments);

router.get("/department/:id", departmentController.viewOneDepartment);

router.get("/department/update/:id", departmentController.updateDepartmentForm);

router.post(
  "/department/update/:id",
  departmentController.updateDepartmentPost
);

router.get("/department/delete/:id", departmentController.deleteDepartment);

module.exports = router;
