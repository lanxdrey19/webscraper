const birthdayRoutes = require("./birthday.route");
const releaseRoutes = require("./release.route");
const newsRoutes = require("./news.route");
const routes = require("express").Router();

routes.use("/birthdays", birthdayRoutes);
routes.use("/releases", releaseRoutes);
routes.use("/news", newsRoutes);
module.exports = routes;
