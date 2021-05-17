const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: String,
    description: String,
    image: {
      data: Buffer,
      contentType: String
    }
  },
  { timestamps: false}
);

const image = mongoose.model("image", schema);

module.exports = image;