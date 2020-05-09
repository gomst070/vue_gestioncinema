import http from "../http-common";

class SalleDataServices {
  getAll() {
    return http.get("/salles");
  }

  get(id) {
    return http.get(`/salles/${id}`);
  }

  create(data) {
    return http.post("/salles", data);
  }

  update(id, data) {
    return http.put(`/salles/${id}`, data);
  }

  delete(id) {
    return http.delete(`/salles/${id}`);
  }
}
export default new SalleDataServices();