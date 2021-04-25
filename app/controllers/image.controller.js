const db = require("../models");
const Image = db.images;

exports.createImg = (req, res) => {
  console.log("Entered create image");
  if (!req.body.image) {
    res.status(400).send({ message: "Image connot be empty"});
  }

  if (!req.body.image.data) {
    res.status(400).send({ message: "Image data is missing"});
  }

  if (!req.body.name) {
    res.status(400).send({ message: "Image name cannot be empty"});
  }


  const img = new Image ({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image
  });

  img
    .save(img)
    .then(data => {
      res.send(data);
    })
    .then(image => {
      console.log(`Image ${image.name} created.`);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "An error occured creating an image."
      })
    });
};

exports.findImageByName = (req, res) => {
  const imgName = req.params.name;
  
  Image.find( {name: new RegExp(`.*${imgName}.*`, 'i') })
      .then(data => {
          if (!data) {
              res.status(404).send({ message: `No image with name '${imgName}' found.`});
          } else {
              res.send(data);
          }
      })
      .catch(err => {
          res
              .status(500)
              .send({ message: `Error retrieving image with name '${imgName}'`});
      });
};

exports.deleteImg = (req, res) => {
  const id = req.params.id;

  Image.findByIdAndRemove(id)
      .then(data => {
          if (!data) {
              res.status(404).send({
                  message: `Cannot delete Image with id=${id}. Maybe the Image was not found.`
              });
          } else {
              res.send({
                  message: "Image was deleted successfully."
              });
          }
      })
      .catch(err => {
          res.status(500).send({
              message: `Could not delete image with id=${id}`
          });
      });
};
