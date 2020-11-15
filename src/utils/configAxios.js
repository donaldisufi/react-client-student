import axios from "axios";
import { API } from "../common/constants";

function configAxios(responseToken) {
  axios.defaults.baseURL = API;
  axios.defaults.headers.common["Authorization"] = `Bearer ${responseToken}`;
  axios.defaults.headers.post["Content-Type"] = "application/json";
}

export default configAxios;
