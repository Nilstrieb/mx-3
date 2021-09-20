import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://api.srgssr.ch/mx3/v2",
    headers: {
        "content-type": "application/json",
        Authorization: "Bearer ELBiWACfIgGyJTHtcuGHT6zMQJ1o",
    },
});

export default axiosInstance;
