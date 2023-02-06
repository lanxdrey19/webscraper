const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv/config");

const httpStatus = require("http-status");

const getBirthdayMembers = async (req, res) => {
  try {
    const arrayInfo = [];
    await axios(process.env.FANDOM_BASE_URL + process.env.FANDOM_MAINPAGE)
      .then((response) => {
        const html = response.data;
        const websiteData = cheerio.load(html);

        websiteData("li", html).each(async function () {
          const info = websiteData(this).text();

          const infoSubstr = info.substring(1, 3);
          const potentialNumber = parseInt(infoSubstr);
          if (
            Number.isInteger(potentialNumber) &&
            info.substring(0, 1) === "(" &&
            info.substring(3, 4) === ")"
          ) {
            const link =
              process.env.FANDOM_BASE_URL +
              websiteData(this).find("a").attr("href");
            arrayInfo.push({ info, link });
          }
        });
      })
      .catch((err) => console.log(err));
    let finalArray = [];

    for (let i = 0; i < arrayInfo.length; i++) {
      await axios(arrayInfo[i].link).then((res) => {
        const htmlProfile = res.data;
        const secondPageData = cheerio.load(htmlProfile);
        const idolName = arrayInfo[i].info.substring(
          5,
          arrayInfo[i].info.length
        );
        secondPageData(".pi-image-thumbnail", htmlProfile).each(function () {
          const imgSrc = secondPageData(this).attr("src");
          finalArray.push({
            idolName,
            imgSrc,
          });
        });
      });
    }

    res.status(httpStatus.OK).json(finalArray);
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST).json({ message: err.message });
  }
};

const getBirthdayDate = async (req, res) => {
  try {
    const bdayDate = [];
    await axios(process.env.FANDOM_BASE_URL + process.env.FANDOM_MAINPAGE)
      .then((response) => {
        const html = response.data;
        const websiteData = cheerio.load(html);

        websiteData(
          "#mw-content-text > div > div.main-page-tag-rcs > div.rcs-container > p > b",
          html
        ).each(function () {
          const date = websiteData(this).text();
          //const link = websiteData(this).find("a").attr("href");
          bdayDate.push({ date });
        });
      })
      .catch((err) => console.log(err));

    res.status(httpStatus.OK).json(bdayDate);
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST).json({ message: err.message });
  }
};

const birthdayController = {
  getBirthdayDate,
  getBirthdayMembers,
};

module.exports = birthdayController;
