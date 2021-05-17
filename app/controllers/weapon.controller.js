const db = require("../models");
const Weapon = db.weapons;

// Create and Save a new Weapon
exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({ message: "Content cannot be empty" });
        return;
    }

    if (req.body.concealable === "true") {
      req.body.concealable = true;
    } else if (req.body.concealable === "false") {
      req.body.concealable = false;
    }

    if (typeof(req.body.concealable) === 'string') {
      req.body.concealable = true;
    }

    if (typeof(req.body.cost) === "string") {
      try {
        let ebCost = req.body.cost.split(' ')[0];
        ebCost = ebCost.substring(0, ebCost.length - 2); // Removes 'eb' off of the end
        req.body.cost = parseInt(ebCost);
      } catch (err) {
        console.log(`Error formatting the cost of weapon with name ${req.body.name}. Setting cost to 0.`);
        req.body.cost = 0;
      }
    }

    const weapon = new Weapon ({
        name: req.body.name,
        description: req.body.description || "",
        nationality: req.body.nationality || "", 
        type: req.body.type,
        damage: req.body.damage,
        rof: parseInt(req.body.rof),
        magazine: parseInt(req.body.magazine),
        skill: req.body.skill || "",
        concealable: req.body.concealable || false,
        attachments: req.body.special || "",
        hands: req.body.hands,
        cost: req.body.cost,
        quality: req.body.quality || "Standard",
        body_min: req.body.body_min ? parseInt(req.body.body_min) : 0
    });

    weapon
        .save(weapon)
        .then(data => {
            res.send(data);
        })
        .then(weapon => {
          console.log(`Weapon with name ${weapon.name} created.`);
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
  
  Weapon.find( {name: new RegExp(`.*${name}.*`, 'i') })
    .then(data => {
      if (!data) {
        res.status(404).send({ message: `No weapons found`});
      } else {
        console.log("Sending data");
        res.send(data);
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: `Error finding weapon with name ${name}: ${err}`});
    });
}

exports.getRandomWeapon = (req, res) => {
  Weapon.aggregate([{ $sample: { size: 1 } }])
    .then(data => {
      if (!data) {
        res.status(404).send({ message: `No weapons found.  Are there weapons in the DB?`});
      } else {
        console.log("Random weapon found");
        res.send(data);
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: `Error grabbing random weapon: ${err}`});
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
