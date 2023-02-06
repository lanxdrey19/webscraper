const { getReleases } = require("../controllers/release.controller");
const routes = require("express").Router();

routes.get("/", getReleases);

module.exports = routes;
