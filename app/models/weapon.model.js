const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const schema = mongoose.Schema(
    {
        name: String,
        description: String,
        nationality: String,
        type: String,
        damage: String,
        rof: Number,
        magazine: Number,
        skill: String,
        concealable: Boolean,
        attachments: String,
        hands: Number,
        cost: Number,
        quality: String,
        body_min: Number
    },
    { timestamps: false }
);

// const weapon = new Weapon ({
//   name: req.body.name,
//   description: req.body.description || "",
//   nationality: req.body.nationality || "", 
//   type: req.body.type,
//   damage: req.body.damage,
//   rof: parseInt(req.body.rof),
//   magazine: parseInt(req.body.magazine),
//   skill: req.body.skill || "",
//   concealable: req.body.concealable || false,
//   attachments: req.body.special || "",
//   hands: req.body.hands,
//   cost: req.body.cost,
//   quality: req.body.quality || "Standard",
//   body_min: req.body.body_min || ""
// });

//schema.plugin(mongoosePaginate);

const weapon = mongoose.model("weapon", schema);

// weapon.paginate({}, {})
//     .then(result => {})
//     .catch(error => {});

module.exports = weapon;