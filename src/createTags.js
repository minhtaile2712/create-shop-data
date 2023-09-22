let baseUrl = process.env.BASEURL;

const axios = require("axios");
const { fakerVI: faker } = require("@faker-js/faker");

const getData = require("./getData");

async function getTagColors() {
  let url = `${baseUrl}/product/v1/tag-color/all`;
  return await getData(url);
}

async function createTags() {
  let colors = await getTagColors();
  let url = `${baseUrl}/product/v1/tag`;
  for (let i = 1; i <= 4; i++) {
    let tag1 = {
      name: `${faker.commerce.productMaterial()} ${faker.lorem.word()}`,
      type: i,
      tagColorId: colors[1].id,
    };

    let tag2 = {
      name: `${faker.commerce.productMaterial()} ${faker.lorem.word()}`,
      type: i,
      tagColorId: colors[5].id,
    };

    // console.log(tag1);
    // console.log(tag2);
    // continue;
    await axios.post(url, tag1);
    await axios.post(url, tag2);
  }
  console.log("Created tags");
}

module.exports = createTags;
