const Unit = require("../models/unit");
const Building = require("../models/building");

module.exports = {
  addunit: async (req, res) => {
    const { name, type, bedrooms, building } = req.body;

    try {
      const fetchedBuilding = await Building.findById(building);

      if (fetchedBuilding.owner != req.user.id) {
        return res.status(401).send("Unauthorized");
      }
      const newUnit = new Unit({
        name,
        type,
        bedrooms,
        building,
      });
      const savedDoc = await newUnit.save();
      res.status(201).json({
        success: true,
        doc: savedDoc,
      });
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  },
  addPhoto: async (req, res) => {
    const { filename } = req.file;
    try {
      await Unit.updateOne(
        { _id: req.params.id },
        {
          $push: {
            photos: filename,
          },
        }
      );

      res.json({
        success: true,
        message: "Added photo",
      });
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  },
  listBuildingUnits: async (req, res) => {
    const buildingId = req.params.id;
    try {
      const units = await Unit.find({
        building: buildingId,
      }).exec();
      return res.json({
        results: units,
      });
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  },
};
