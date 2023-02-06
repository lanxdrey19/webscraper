const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv/config");

const httpStatus = require("http-status");

const getReleases = async (req, res) => {
  try {
    const arrayComebacks = [];
    await axios(process.env.FANDOM_BASE_URL + process.env.FANDOM_MAINPAGE)
      .then((response) => {
        const html = response.data;
        const websiteData = cheerio.load(html);

        websiteData(".article-table tbody tr td", html).each(function () {
          const info = websiteData(this).text();
          const link = websiteData(this).find("a").attr("href");
          arrayComebacks.push({ info, link });
        });
      })
      .catch((err) => console.log(err));

    let colNum = 0;
    let day = 0;
    let track = "";
    let artist = "";
    let finalArray = [];
    let thisMonthOnly = true;
    let imgSrc = "";

    for (let i = 0; i < arrayComebacks.length; i++) {
      if (thisMonthOnly) {
        if (colNum === 0) {
          const subStrInfo = arrayComebacks[i].info.substring(
            0,
            arrayComebacks[i].info.length - 1
          );
          if (Number.isInteger(parseInt(subStrInfo))) {
            if (parseInt(subStrInfo) >= day) {
              day = parseInt(subStrInfo);
              colNum = 1;
            } else {
              thisMonthOnly = false;
            }
          } else if (subStrInfo !== "TBA") {
            const subStrInfo = arrayComebacks[i].info.substring(
              0,
              arrayComebacks[i].info.length - 1
            );
            track = subStrInfo;
            colNum = 2;
          }
        } else if (colNum === 1) {
          const subStrInfo = arrayComebacks[i].info.substring(
            0,
            arrayComebacks[i].info.length - 1
          );
          track = subStrInfo;
          colNum = 2;
        } else if (colNum === 2) {
          const subStrInfo = arrayComebacks[i].info.substring(
            0,
            arrayComebacks[i].info.length - 1
          );
          artist = subStrInfo;

          const link = arrayComebacks[i].link;
          await axios(process.env.FANDOM_BASE_URL + link).then((res) => {
            const htmlProfile = res.data;
            const secondPageData = cheerio.load(htmlProfile);
            secondPageData(".pi-image-thumbnail", htmlProfile).each(
              function () {
                imgSrc = secondPageData(this).attr("src");
              }
            );
          });

          colNum = 0;
          finalArray.push({ day, track, artist, imgSrc });
        }
      }
    }

    res.status(httpStatus.OK).json(finalArray);
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST).json({ message: err.message });
  }
};

const releaseController = {
  getReleases,
};

module.exports = releaseController;
