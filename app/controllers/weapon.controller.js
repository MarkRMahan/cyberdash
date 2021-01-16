const db = require("../models");
const Weapon = db.weapons;

// Create and Save a new Weapon
exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({ message: "Content cannot be empty" });
        return;
    }

    const weapon = new Weapon ({
        name: req.body.name,
        description: req.body.description || "",
        type: req.body.type,
        concealable: req.body.concealable || false,
        damage: req.body.damage,
        magazine: req.body.magazine,
        rof: req.body.rof,
        hands: req.body.hands,
        cost: req.body.cost
    });

    console.log("about to save")

    weapon
        .save(weapon)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error occurred while creating the weapon."
            });
        });
};

// Retrieve all Weapons from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    let condition = name ? { name: { $regex: new RegExp(name), $options: "i"} } : {};

    Weapon.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error occurred retrieving weapons."
            });
        });
};

// Find a single Weapon with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Weapon.findById(id)
      .then(data => {
          if (!data) {
              res.status(404).send({ message: `No weapon with id=${id} found.`});
          } else {
              res.send(data);
          }
      })
      .catch(err => {
          res
              .status(500)
              .send({ message: `Error retrieving weapon with id=${id}`});
      });
};

exports.findWeaponByName = (req, res) => {
  const name = req.params.name;
  
  Weapon.find( {name: new RegExp(`.${name}.`) })
    .then(data => {
      if (!data) {
        res.status(404).send({ message: `No weapons found`});
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: `Error finding weapon with name input: ${name}`});
    });
}

// Update a Weapon by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
        message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Weapon.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Weapon with id=${id}. Maybe Weapon was not found.`
                });
            } else res.send({ message: "Weapon was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: `Error updating Weapon with id=${id}`
            });
        });
};

// Delete a Weapon with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Weapon.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Weapon with id=${id}. Maybe the Weapon was not found.`
                });
            } else {
                res.send({
                    message: "Weapon was deleted successfully."
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Could not delete weapon with id=${id}`
            });
        });
};

// Delete all Weapon from the database.
exports.deleteAll = (req, res) => {
    Weapon.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Weapons were deleted successfully`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while deleting all Weapons"
            });
        });
};

// Find all published Weapon
exports.findAllConcealable = (req, res) => {
    Weapon.find({ concealable: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error occurred while retrieving concealable Weapons."
            });
        });
};
