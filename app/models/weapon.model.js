module.exports = mongoose => {
    const Weapon = mongoose.model(
      "weapon",
      mongoose.Schema(
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
      )
    );
  
    return Weapon;
  };