var { validationResult } = require("express-validator");
var path = require("path");

const Salary = require("../models/salaryDb");
const Employee = require("../models/employeeDb");
const { knex } = require("../models/db");
// const knex = require("knex");

exports.addSalaryForm = async (req, res, next) => {
  try {
    await Employee.fetchAll().then((employees) => {
      val = employees.toJSON();
      res.render("add_salary", { employees: val });
    });
  } catch (error) {
    res.status(400);
  }
};

exports.addSalaryPost = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      return res.send(400);
    }

    await Salary.forge({
      name: req.body.name,
      basic: req.body.basic,
      incentive: req.body.incentive,
      total: parseFloat(req.body.basic) + parseFloat(req.body.incentive),
    }).save();
  } catch (error) {
    res.status(400);
  }
  res.redirect("/salary");
};

exports.viewSalary = (req, res, next) => {
  Salary.fetchAll().then((salary) => {
    res.json(salary);
  });
};

exports.viewOneSalary = (req, res, next) => {
  Salary.where({ salary_id: req.params.id })
    .fetch()
    .then((salary) => {
      res.json(salary);
    });
};

exports.updateSalaryForm = async (req, res, next) => {
  try {
    await Employee.fetchAll().then((employees) => {
      val = employees.toJSON();
      res.render("update_salary", { employees: val });
    });
  } catch (error) {
    res.status(400);
  }
};

exports.updateSalaryPost = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      return res.send(400);
    }

    await Salary.where({ id: req.body.id }).save(
      {
        name: req.body.name,
        basic: req.body.basic,
        incentive: req.body.incentive,
        total: parseFloat(req.body.basic) + parseFloat(req.body.incentive),
      },
      { patch: true }
    );
  } catch (error) {
    res.status(400);
  }
  res.redirect("/salary");
};

exports.deleteSalary = (req, res, next) => {
  Salary.where({ salary_id: req.params.id })
    .destroy()
    .then((salary) => {
      res.redirect("/salary");
    });
};

//   knex

// exports.joinTables = (req, res, next) => {
//   knex
//     .select("*")
//     .from("salary")
//     .join("department", "dept_no", "=", "emp_no")
//     .and.select("*")
//     .from("employees")
//     .then((data) => {
//       res.json(data);
//     });
// };

// exports.joinTables = (req, res, next) => {
//   knex
//     .avg("total as Total Salary")
//     .from("salary")
//     .then((qry) => {
//       res.json(qry);
//     });
// };

// exports.joinTables = (req, res, next) => {
//   knex
//     .select("name as Name", "hire_date as Date")
//     .from("employees")
//     .where("name", "=", "Nuhman")
//     .then((qry) => {
//       res.json(qry);
//     });
// };

// exports.joinTables = (req, res, next) => {
//   knex("salary")
//     .orderBy("total", "desc")
//     .then((qry) => {
//       res.json(qry);
//     });
// };

// exports.joinTables = (req, res, next) => {
//   knex
//     .table("salary")
//     .innerJoin("employees", "salary.salary_id", "=", "employees.emp_no")
//     .then((qry) => {
//       res.json(qry);
//     });
// };

// // inner join

// exports.joinTables = (req, res, next) => {
//   knex
//     .table("salary")
//     .innerJoin("employees", "salary.salary_id", "=", "employees.emp_no")
//     .then((qry) => {
//       res.json(qry);
//     });
// };

// // left join

// exports.joinTables = (req, res, next) => {
//   knex
//     .table("salary")
//     .leftJoin("employees", "salary.salary_id", "=", "employees.emp_no")
//     .then((qry) => {
//       res.json(qry);
//     });
// }

// // right join

// exports.joinTables = (req, res, next) => {
//   knex
//     .table("salary")
//     .rightJoin("employees", "salary.salary_id", "=", "employees.emp_no")
//     .then((qry) => {
//       res.json(qry);
//     });
// }

// // full outer join

// exports.joinTables = (req, res, next) => {
//   knex
//     .table("salary")
//     .fullOuterJoin("employees", "salary.salary_id", "=", "employees.emp_no")
//     .then((qry) => {
//       res.json(qry);
//     });
// }

// // cross join

// exports.joinTables = (req, res, next) => {
//   knex
//     .table("salary")
//     .crossJoin("employees", "salary.salary_id", "=", "employees.emp_no")
//     .then((qry) => {
//       res.json(qry);
//     });
// }

// // union

// exports.joinTables = (req, res, next) => {
//   knex
//     .table("salary")
//     .union(knex.table("employees"))
//     .then((qry) => {
//       res.json(qry);
//     });
// }

// union all

// exports.joinTables = (req, res, next) => {
//   knex
//     .table("salary")
//     .unionAll(knex.table("employees"))
//     .then((qry) => {
//       res.json(qry);
//     });
// }
