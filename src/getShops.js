import axios from "axios";

let baseUrl = process.env.BASEURL;

export default async function getShops() {
  let url = `${baseUrl}/authentication/v1/shops`;
  return await axios.get(url).then((r) => r.data);
}
