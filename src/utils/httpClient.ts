// api.js
import axios from "axios";
import { Constants } from "./constants";
axios.defaults.withCredentials = true;
const API = axios.create({
  baseURL: Constants.BASE_URL,
});

export default API;
