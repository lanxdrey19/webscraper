const { getNews } = require("../controllers/news.controller");
const routes = require("express").Router();

routes.get("/", getNews);

module.exports = routes;
