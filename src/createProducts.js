let baseUrl = process.env.BASEURL;

const axios = require("axios");
const { fakerVI: faker } = require("@faker-js/faker");

const random = require("./random");
const getData = require("./getData");

async function createProducts(n) {
  let unitUrl = `${baseUrl}/product/v1/unit?SearchText=Cai`;
  let unitId = (await getData(unitUrl)).items[0].id;

  let productUrl = `${baseUrl}/product/v1/product`;
  for (let i = 1; i <= n; i++) {
    let product = {
      name: faker.commerce.productName(),
      unitId: unitId,
      weight: 0,
      weightUnit: 1,
      originalPrice: random(10, 200) * 1000,
      soldPrice: random(10, 200) * 1000,
      tagIds: [],
      initialStock: random(10, 50),
    };
    // console.log(product);
    // continue;
    await axios.post(productUrl, product);
  }
  console.log("Created", n, "products.");
}

module.exports = createProducts;
