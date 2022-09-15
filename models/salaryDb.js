bookshelf = require("./db");
const Salary = bookshelf.model("Salary", {
  tableName: "salary",
});

module.exports = Salary;
