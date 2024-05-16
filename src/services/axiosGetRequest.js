import axios from "axios";
import getCookie from "../utils/getCookie";

const axiosGetRequest = (URL) => {
  const token = getCookie("token");
  return axios.get("https://ballot-app-backend.onrender.com/api/v1/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default axiosGetRequest;
