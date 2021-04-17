import getData from "../http-common";

class WeaponDataService {
  getAll() {
    return getData("/weapons");
  }

  get(id) {
    return getData(`/weapons/${id}`);
  }

  // create(data) {
  //   return http.post("/weapons", data);
  // }

  // update(id, data) {
  //   return http.put(`/weapons/${id}`, data);
  // }

  // delete(id) {
  //   return http.delete(`/weapons/${id}`);
  // }

  // deleteAll() {
  //   return http.delete(`/weapons`);
  // }

  getRandomWeapon() {
    return getData(`/weapons/getRandomWeapon`);
  }

  findByName(name) {
    return getData(`/weapons/findWeaponByName/${name}`);
  }
}

export default new WeaponDataService();
