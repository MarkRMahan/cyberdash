const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ip = require("ip");
const db = require("./app/models");

const app = express();

// 1920 x 955
// 2560 x 1600
// 1280 x 595

const allowedOrigins = [`http://${ip.address()}:5000`, "http://localhost:5000"];

const corsOptions = {
  methods: 'GET, POST, PATCH, DELETE, OPTIONS',
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Source not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database.");
    })
    .catch(err => {
        console.log("Cannot connect to the database.", err);
        process.exit();
    });

// parse requests of content-type - application/json
app.use(bodyParser.json({ limit: "50mb" }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the cyberdash choomba." });
});

require("./app/routes/weapon.routes")(app);
require("./app/routes/image.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, `${process.env.REACT_APP_HOST_IP}`, () => {
    console.log(`Server is running on port ${PORT}.`);
});
