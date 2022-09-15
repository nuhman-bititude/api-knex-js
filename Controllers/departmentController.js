var { validationResult } = require("express-validator");
var path = require("path");

const Department = require("../models/departmentDb");

exports.createDepartmentForm = (req, res, next) => {
  res.sendFile(path.resolve(__dirname, "../public/add_department.html"));
};

exports.createDepartmentPost = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    var department = await Department.forge({
      name: req.body.name,
      manager: req.body.manager,
      no_of_employees: req.body.no_of_employees,
    }).save();
  } catch (error) {}
  res.redirect("/departments");
};

exports.viewDepartments = (req, res, next) => {
  try {
    Department.fetchAll().then((department) => {
      res.json(department);
    });
  } catch (error) {
    res.send(error);
  }
};

exports.viewOneDepartment = (req, res, next) => {
  try {
    // using knexjs
    Department.where({ dept_no: req.params.id })
      .fetch()
      .then((department) => {
        res.json(department);
      });
  } catch (error) {
    res.send(error);
  }
};

exports.updateDepartmentForm = (req, res, next) => {
  res.sendFile(path.resolve(__dirname, "../public/update_department.html"));
};

exports.updateDepartmentPost = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    var department = await Department.forge({
      dept_no: req.params.id,
      name: req.body.name,
      manager: req.body.manager,
      no_of_employees: req.body.no_of_employees,
    }).save();
  } catch (error) {}
  res.redirect("/departments");
};

exports.deleteDepartment = async (req, res, next) => {
  try {
    var department = await Department.where({
      dept_no: req.params.id,
    }).destroy();
  } catch (error) {
    res.send(error);
  }
  res.redirect("/departments");
};
