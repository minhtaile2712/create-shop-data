let baseUrl = process.env.BASEURL;

const axios = require("axios");
const { fakerVI: faker } = require("@faker-js/faker");

async function createSuppliers(n) {
  let url = `${baseUrl}/customer/v1/suppliers`;
  let supplier = {
    name: faker.person.fullName(),
    type: 1,
    discountType: 1,
    tagIds: [],
    extraPhones: [],
    addresses: [],
  };
  for (let i = 1; i <= n; i++) {
    supplier.name = faker.person.fullName();
    // console.log(supplier);
    // continue;
    await axios.post(url, supplier);
  }
  console.log("Created", n, "suppliers.");
}

module.exports = createSuppliers;
