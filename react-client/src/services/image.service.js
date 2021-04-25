import getData from "../http-common";

class ImageDataService {

  getImgByName(name) {
    return getData(`/images/${name}`);
  }

}

export default new ImageDataService();