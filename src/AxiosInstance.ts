import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://api.srgssr.ch/mx3/v2",
    headers: {
        "content-type": "application/json",
        Authorization: "Bearer token",
    },
});

export default axiosInstance;
