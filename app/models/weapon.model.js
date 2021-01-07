const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const schema = mongoose.Schema(
    {
        name: String,
        description: String,
        type: String,
        skill: String,
        concealable: Boolean,
        damage: String,
        magazine: Number,
        rof: Number,
        hands: Number,
        cost: Number
    },
    { timestamps: false }
);

schema.plugin(mongoosePaginate);

const weapon = mongoose.model("weapon", schema);

// weapon.paginate({}, {})
//     .then(result => {})
//     .catch(error => {});

module.exports = weapon;