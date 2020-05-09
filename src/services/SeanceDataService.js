import http from "../http-common";

class SeanceDataServices {
  getAll() {
    return http.get("/seances");
  }

  getAllOld() {
    return http.get("/seances/old");
  }

  get(id) {
    return http.get(`/seances/${id}`);
  }

  create(data) {
    return http.post("/seances", data);
  }

  update(id, data) {
    return http.put(`/seances/${id}`, data);
  }

  delete(id) {
    return http.delete(`/seances/${id}`);
  }

}
export default new SeanceDataServices();