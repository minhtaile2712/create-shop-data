import axios from "axios";

export default async function getData(url) {
  return await axios.get(url).then((r) => r.data);
}
