const axios = require("axios");

async function getData(url) {
  return await axios.get(url).then((r) => r.data);
}

module.exports = getData;
