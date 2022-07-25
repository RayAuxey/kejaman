const mongoose = require("mongoose");

const UnitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  bedrooms: Number,
  building: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Building",
    required: true,
  },
  photos: [String],
});

module.exports = mongoose.model("Unit", UnitSchema);
