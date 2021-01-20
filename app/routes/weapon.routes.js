module.exports = app => {
    const weapons = require("../controllers/weapon.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Weapon
    router.post("/", weapons.create);
  
    // Retrieve all Weapons
    router.get("/", weapons.findAll);
  
    // Retrieve all concealable Weapons
    router.get("/concealable", weapons.findAllConcealable);
  
    // Retrieve a single Weapon with id
    router.get("/findWeaponById/:id", weapons.findOne);

    // Retrieve weapons by name
    router.get("/findWeaponByName/:name", weapons.findWeaponByName);
  
    // Update a Weapon with id
    router.put("/:id", weapons.update);
  
    // Delete a Weapon with id
    router.delete("/:id", weapons.delete);
  
    // Delete all weapons
    router.delete("/", weapons.deleteAll);
  
    app.use('/api/weapons', router);
  };