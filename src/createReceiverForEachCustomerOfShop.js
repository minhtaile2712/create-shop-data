let baseUrl = process.env.BASEURL;

const axios = require("axios");

const random = require("./random");
const loginShop = require("./loginShop");
const getData = require("./getData");

async function getCustomers() {
  let url = `${baseUrl}/customer/v1/customer`;
  return await getData(url);
}

async function createReceiverForEachCustomerOfShop(tenantId) {
  let token = await loginShop(tenantId);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  let { items: customers, totalCount } = await getCustomers();
  let url = `${baseUrl}/customer/v1/receiver`;
  for (let customer of customers) {
    let receiver = {
      name: customer.name,
      phone: `0${random(900000000, 999999999)}`,
      customerId: customer.id,
      streetNo: "01 Công xã Paris",
      wardCode: "26740",
      districtCode: "760",
      cityCode: "79",
    };
    await axios.post(url, receiver);
  }
  console.log("Created every receiver of", totalCount, "customers.");
}

module.exports = createReceiverForEachCustomerOfShop;
