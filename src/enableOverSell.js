let baseUrl = process.env.BASEURL;

const axios = require("axios");

const loginShop = require("./loginShop");

async function enableOverSell() {
  let url = `${baseUrl}/inventory/v1/settings/allow-negative-stock`;
  await axios.patch(url);
}

module.exports = enableOverSell;
