import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://my-json-server.typicode.com/se331-2022/passengerdb",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getEvents() {
    return apiClient.get("/passenger?_page=1&_limit=5");
  },
  //Added new call
  getEventPass(id) {
    return apiClient.get("/passenger/" + id);
  },
  getEventAirline(id) {
    return apiClient.get("/airline/" + id);
  },
};
