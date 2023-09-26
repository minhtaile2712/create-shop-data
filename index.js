require("dotenv").config();
let phoneNumber = process.env.PHONENUMBER;
let password = process.env.PASSWORD;
let baseUrl = process.env.BASEURL;

const axios = require("axios");

const login = require("./src/login");
const getShops = require("./src/getShops");
const enableOverSell = require("./src/enableOverSell");
const delayMs = require("./src/delayMs");

async function main() {
  let token = await login(baseUrl, phoneNumber, password);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  let shops = (await getShops()).items;
  console.log("Found ", shops.length, "shops.");
  await delayMs(5000);

  for (let shop of shops) {
    let tenantId = shop.tenantId;
    await enableOverSell(tenantId).catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else console.log("Error", error.message);
    });
    console.log("Enable negative inventory for shop:", shop.name);
  }
}

main();
