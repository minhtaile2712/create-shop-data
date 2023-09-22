const { fakerVI: faker } = require("@faker-js/faker");
const axios = require("axios");

async function createShop(baseUrl, token) {
  let url = `${baseUrl}/authentication/v1/shops`;
  let firstName = faker.person.firstName();
  let lastName = faker.person.lastName();
  let email = faker.internet.email({
    firstName,
    lastName,
    provider: "gmail.com",
  });
  let shopName = `${firstName}'s shop`;
  let shopInfo = {
    name: shopName,
    ownerName: `${lastName} ${firstName}`,
    email: email,
    phone: "",
    categoryIds: [],
    address: {},
  };
  await axios
    .post(url, shopInfo, { headers: { Authorization: `Bearer ${token}` } })
    .then(() => console.log("Created", shopName));
}

module.exports = createShop;
