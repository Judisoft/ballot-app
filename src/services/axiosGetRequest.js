import axios from "axios";
import getCookie from "../utils/getCookie";

const axiosGetRequest = (URL) => {
  const token = getCookie("token");
  return axios.get("http://localhost:5000/api/v1/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default axiosGetRequest;
