const mongoose = require("mongoose");

const BuildingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true },
  type: { type: String, required: true },
});

module.exports = mongoose.model("Building", BuildingSchema);
