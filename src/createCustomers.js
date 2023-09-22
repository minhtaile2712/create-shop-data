let baseUrl = process.env.BASEURL;

const axios = require("axios");
const { fakerVI: faker } = require("@faker-js/faker");
const random = require("./random");

async function createCustomers(n) {
  let url = `${baseUrl}/customer/v1/customer`;
  for (let i = 1; i <= n; i++) {
    let customer = {
      name: faker.person.fullName(),
      phone: `0${random(900000000, 999999999)}`,
    };
    // console.log(customer);
    // continue;
    await axios.post(url, customer);
  }
  console.log("Created", n, "customers.");
}

module.exports = createCustomers;
