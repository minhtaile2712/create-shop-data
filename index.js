import "dotenv/config";

const phoneNumber = process.env.PHONENUMBER;
const password = process.env.PASSWORD;
const baseUrl = process.env.BASEURL;
const fileName = process.env.FILENAME;
const concurrent = Number(process.env.CONCURRENT);

import axios from "axios";

import pLimit from "p-limit";
const limit = pLimit(concurrent);

import login from "./src/login.js";
import loginShop from "./src/loginShop.js";
import getShops from "./src/getShops.js";
import delayMs from "./src/delayMs.js";
import getProductListFromFile from "./src/getProductListFromFile.js";

const log = console.log;

async function getOneUnit() {
  let url = `${baseUrl}/product/v1/unit?SearchText=Cai`;
  let unit = await axios.get(url).then((r) => r.data.items[0]);
  return unit;
}

async function main() {
  let productList = getProductListFromFile(fileName);

  await login(baseUrl, phoneNumber, password);

  let shops = (await getShops()).items;
  log("Found ", shops.length, "shops.");

  const delayAmount = 3000;
  log("Program start after", Math.floor(delayAmount / 1000), "second(s)");
  await delayMs(delayAmount);

  for (let shop of shops) {
    await loginShop(shop.tenantId);

    // Do something with shop here

    let unit = await getOneUnit();
    let product = {
      barcode: "",
      name: "",
      unitId: unit.id,
      weight: 0,
      weightUnit: 1,
      originalPrice: 10000,
      soldPrice: 15000,
      initialStock: 100,
      tagIds: [],
    };
    let productUrl = `${baseUrl}/product/v1/product`;

    setInterval(() => {
      log("Active request:", limit.activeCount);
      log("Pending request:", limit.pendingCount);
    }, 1000);

    await Promise.all(
      productList.map((productData) =>
        limit(() =>
          axios.post(productUrl, {
            ...product,
            barcode: productData.barcode,
            name: productData.itemname,
          })
        )
      )
    );

    log("Processed for shop:", shop.name);
  }
}

main().catch(function (error) {
  if (error.response) log(error.response.status, error.response.data);
  else log("Error", error.message);
});
