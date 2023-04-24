const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  milesPerGallon: {
    type: Number,
    required: true,
  },
  cylinders: Number,
  displacement: Number,
  horsepower: Number,
  weight_in_lbs: Number,
  acceleration: Number,
  year: { type: String, required: true },
  origin: { type: String, required: true },
});

const CarModel = mongoose.model("Car", CarSchema);

module.exports = CarModel;
