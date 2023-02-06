const {
  getBirthdayDate,
  getBirthdayMembers,
} = require("../controllers/birthday.controller");
const routes = require("express").Router();

routes.get("/date", getBirthdayDate);
routes.get("/members", getBirthdayMembers);

module.exports = routes;
