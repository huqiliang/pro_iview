import axios from "axios";

export default {
  getPageMenus() {
    return axios.get("/api/getPageMenus");
  },
  removePageMenus() {
    return axios.delete("/api/removePageMenus");
  },
  addPageMenus(name) {
    return axios.post("/api/addPageMenus", name);
  },
  getPageConfig(id) {
    return axios.get("/api/getPageConfig", { params: id });
  }
};
