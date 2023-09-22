const axios = require("axios");

const loginShop = require("./loginShop");
const createCustomers = require("./createCustomers");
const createSuppliers = require("./createSuppliers");
const createProducts = require("./createProducts");
const createTags = require("./createTags");
const createPaymentMethods = require("./createPaymentMethods");

async function createShopData(tenantId) {
  let token = await loginShop(tenantId);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  await createCustomers(10);
  await createSuppliers(10);
  await createProducts(10);
  await createTags();
  await createPaymentMethods(2);
}

module.exports = createShopData;
