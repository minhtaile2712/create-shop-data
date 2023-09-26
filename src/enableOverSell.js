let baseUrl = process.env.BASEURL;

const axios = require("axios");

const loginShop = require("./loginShop");

async function enableOverSell(tenantId) {
  let token = await loginShop(tenantId);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  let url = `${baseUrl}/inventory/v1/settings/allow-negative-stock`;
  await axios.patch(url);
}

module.exports = enableOverSell;
