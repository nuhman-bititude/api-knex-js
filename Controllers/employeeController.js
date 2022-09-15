var { validationResult } = require("express-validator");
var path = require("path");

var Employee = require("../models/employeeDb");

exports.createEmployeeForm = (req, res, next) => {
  res.sendFile(path.resolve("./public/add_employee.html"));
};

exports.createEmployeePost = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    var employee = await Employee.forge({
      name: req.body.employee_name,
      gender: req.body.gender,
      hire_date: req.body.hire_date,
    }).save();
  } catch (error) {
    res.status(400);
  }
  res.redirect("/employees");
};

exports.viewEmployees = (req, res, next) => {
  try {
    Employee.fetchAll().then((emoplyees) => {
      res.json(emoplyees);
    });
  } catch (error) {
    res.status(400);
  }
};

exports.viewOneEmployee = (req, res, next) => {
  try {
    // using knexjs
    Employee.where({ emp_no: req.params.id })
      .fetch()
      .then((employee) => {
        res.json(employee);
      });
  } catch (error) {
    res.status(400);
  }
};

exports.updateEmployeeForm = (req, res, next) => {
  res.sendFile(path.resolve("./public/update_employee.html"));
};

exports.updateEmployeePost = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    var employee = await Employee.forge({
      emp_no: req.params.id,
      name: req.body.employee,
    }).save();
  } catch (error) {
    res.status(400);
  }
  res.redirect("/employees");
};

exports.deleteEmployee = async (req, res, next) => {
  try {
    var employee = await Employee.where({ emp_no: req.params.id }).destroy();
  } catch (error) {
    res.status(400);
  }
  res.redirect("/employees");
};
