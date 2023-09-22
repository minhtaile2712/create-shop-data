let baseUrl = process.env.BASEURL;

const getData = require("./getData");

async function getShops() {
  let url = `${baseUrl}/authentication/v1/shops`;
  return await getData(url);
}

module.exports = getShops;
