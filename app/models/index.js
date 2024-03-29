const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.weapons = require("./weapon.model.js");
db.images = require("./image.model.js");

module.exports = db;
