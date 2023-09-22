let baseUrl = process.env.BASEURL;
let phoneNumber = process.env.PHONENUMBER;
let password = process.env.PASSWORD;

const axios = require("axios");

async function loginShop(tenantId) {
  let url = `${baseUrl}/authentication/v1/sign-in/password`;
  let identity = { phoneNumber, password };
  let token = await axios
    .post(url, identity, { headers: { tenant: tenantId } })
    .then((r) => r.data.accessToken);
  return token;
}

module.exports = loginShop;
