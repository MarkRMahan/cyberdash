module.exports = app => {
  const images = require('../controllers/image.controller.js');

  const router = require("express").Router();

  // Create new image
  router.post("/", images.createImg);

  // Find image by name
  router.get("/:name", images.findImageByName);

  // Delete an image
  router.delete("/:id", images.deleteImg);

  // Update Image with name
  router.put("/:name", images.updateImg);

  app.use('/api/images', router);
};
