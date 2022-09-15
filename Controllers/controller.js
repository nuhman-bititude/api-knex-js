const { body, validationResult } = require("express-validator");
var path = require("path");

exports.searchQuery = (req, res, next) => {
  const searchQuery = req.query.search;
  console.log(searchQuery);
};
