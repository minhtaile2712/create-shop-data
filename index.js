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

async function main() {
  let productList = getProductListFromFile(fileName);
  // productList = productList.slice(0, 50);
  log("There are", productList.length, "item(s) in product list.");

  await login(baseUrl, phoneNumber, password);

  let shops = (await getShops()).items;
  log("Found ", shops.length, "shops.");

  const delayAmount = 3000;
  log("Program start after", Math.floor(delayAmount / 1000), "second(s)");
  await delayMs(delayAmount);

  let concurrent = setInterval(() => {
    log("Active request:", limit.activeCount);
    log("Pending request:", limit.pendingCount);
  }, 1000);

  let product = {
    barcode: "",
    name: "",
    unitId: 0,
    weight: 0,
    weightUnit: 1,
    originalPrice: 10000,
    soldPrice: 15000,
    initialStock: 100,
    tagIds: [],
  };

  await Promise.all(
    shops.map((shop) =>
      limit(async () => {
        const token = await loginShop(shop.tenantId);
        const productHttpClient = axios.create({
          baseURL: `${baseUrl}/product/v1/`,
          headers: { Authorization: `Bearer ${token}` },
        });
        const unitId = await productHttpClient
          .get("unit?SearchText=Cai")
          .then((r) => r.data.items[0].id);

        let remaining = productList.length;
        log(`Remaining products for ${shop.name}: ${remaining}`);
        let shopInterval = setInterval(() => {
          log(`Remaining products for ${shop.name}: ${remaining}`);
        }, 1000);
        for (const { barcode, itemname } of productList) {
          await productHttpClient
            .post("product", { ...product, unitId, barcode, name: itemname })
            .catch((er) => {
              if (er.response) log(er.response.status, er.response.data);
              else log("No response error:", er.message);
            });
          remaining--;
        }
        clearInterval(shopInterval);
        log(`Remaining products for ${shop.name}: ${remaining}`);
        log("Processed for shop:", shop.name);
      })
    )
  );

  clearInterval(concurrent);
}

main().catch((error) => {
  if (error.response) log(error.response.status, error.response.data);
  else log("Error", error.message);
});
