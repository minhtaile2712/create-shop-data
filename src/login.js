import axios from "axios";

export default async function login(baseUrl, id, pass) {
  let url = `${baseUrl}/authentication/v1/sign-in/password`;
  let identity = { phoneNumber: id, password: pass };
  let token = await axios
    .post(url, identity)
    .then((response) => response.data.accessToken);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
