const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv/config");

const httpStatus = require("http-status");

const getNews = async (req, res) => {
  try {
    const arrayNews = [];
    await axios(process.env.NEWS_SOURCE)
      .then((response) => {
        const html = response.data;
        const websiteData = cheerio.load(html);

        websiteData(".y8HYJ-y_lTUHkQIc1mdCq", html).each(function () {
          const info = websiteData(this)
            .find("a")
            .find("div")
            .find("h3")
            .text();
          const link =
            process.env.NEWS_BASE + websiteData(this).find("a").attr("href");

          arrayNews.push({ info, link });
        });
      })
      .catch((err) => console.log(err));

    res.status(httpStatus.OK).json(arrayNews);
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST).json({ message: err.message });
  }
};

const newsController = {
  getNews,
};

module.exports = newsController;
