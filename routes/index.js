const birthdayRoutes = require("./birthday.route");
const releaseRoutes = require("./release.route");
const routes = require("express").Router();

routes.use("/birthdays", birthdayRoutes);
routes.use("/releases", releaseRoutes);
module.exports = routes;
