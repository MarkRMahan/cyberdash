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

exports.updateImg = (req, res) => {
  if (!req.body) {
      return res.status(400).send({
      message: "Data to update can not be empty!"
      });
  }

  const imgName = req.params.name;

  Image.findOne( {name: new RegExp(`.*${imgName}.*`, 'i') })
      .then(foundImg => {
          if (!foundImg) {
              res.status(404).send({
                  message: `Cannot update Image with id=${id}. Maybe Weapon was not found.`
              });
          } else {
            if (req.body.description || req.body.image) {
              foundImg.description = req.body.description || foundImg.description;
              if (req.body.image) {
                foundImg.image.data = req.body.image.data || foundImg.image.data;
              }
              foundImg.save()
              .then(() => {
                res.send({
                  message: `Image was successfully updated`
                });
              })
              .catch(err => {
                res.status(500).send({
                  message: `Error updating found Image with name ${imgName}: ${err}`
                });
              })
            }
          }
      })
      .catch(err => {
          res.status(500).send({
              message: `Error updating Image with name=${imgName}: ${err}`
          });
      });
};
