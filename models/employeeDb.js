bookshelf = require("./db");
const Employee = bookshelf.model("Employee", {
  tableName: "employees",
});

module.exports = Employee;
