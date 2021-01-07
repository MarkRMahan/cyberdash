import http from "../http-common";

class WeaponDataService {
  getAll() {
    return http.get("/weapons");
  }

  get(id) {
    return http.get(`/weapons/${id}`);
  }

  create(data) {
    return http.post("/weapons", data);
  }

  update(id, data) {
    return http.put(`/weapons/${id}`, data);
  }

  delete(id) {
    return http.delete(`/weapons/${id}`);
  }

  deleteAll() {
    return http.delete(`/weapons`);
  }

  findByName(name) {
    return http.get(`/weapons?name=${name}`);
  }
}

export default new WeaponDataService();
