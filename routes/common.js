var express = require("express");
var router = express.Router();

const commonController = require("../Controllers/controller");

// get search query from url

router.get("/search", commonController.searchQuery);

module.exports = router;
