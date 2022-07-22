const Building = require("../models/building");

module.exports = {
  addBuilding: async (req, res) => {
    const { name, type } = req.body;

    const newBuilding = new Building({
      name,
      type,
      owner: req.user.id,
    });

    try {
      const savedDoc = await newBuilding.save();
      res.status(201).json({
        success: true,
        doc: savedDoc,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error,
      });
    }
  },
  listBuildings: async (req, res) => {
    try {
      const buildings = await Building.find({}).exec();
      res.json({
        results: buildings,
      });
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  },
  showOwnerBuildings: async (req, res) => {
    const { id } = req.user;

    try {
      const building = await Building.find({ owner: id }).exec();
      res.json({ results: building });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error,
      });
    }
  },
  showBuilding: async (req, res) => {
    const { id } = req.params;

    try {
      const building = await Building.findById(id).exec();
      res.json(building);
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  },
  deleteBuilding: async (req, res) => {
    const userId = req.user.id;
    const buildingId = req.params.id;

    // Find the building
    try {
      const building = await Building.findById(buildingId).exec();
      if (userId != building.owner) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized to delete the building",
        });
      }
      await Building.deleteOne({ _id: buildingId });
      res.json({
        success: true,
        message: "You have successfully deleted the building",
      });
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  },
};
