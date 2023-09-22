const axios = require("axios");

async function login(baseUrl, id, pass) {
  let url = `${baseUrl}/authentication/v1/sign-in/password`;
  let identity = { phoneNumber: id, password: pass };
  let accessToken = await axios
    .post(url, identity)
    .then((response) => response.data.accessToken);
  return accessToken;
}

module.exports = login;
