bookshelf = require("./db");

const Department = bookshelf.model("Department", {
  tableName: "department",
});

module.exports = Department;
