const router = require("express").Router();
const authenticate = require("../middleware/authenticate");
const {
  addBuilding,
  listBuildings,
  showOwnerBuildings,
  showBuilding,
  deleteBuilding,
  updateBuilding,
} = require("../controllers/building");

// Add a new buiding
router.post("/", authenticate, addBuilding);

// List the buidings
router.get("/", listBuildings);

// Show owner buildings
router.get("/show", authenticate, showOwnerBuildings);

// Show building by id
router.get("/:id", showBuilding);

// Delete building
router.delete("/:id", authenticate, deleteBuilding);

// Update Building
router.put("/:id", authenticate, updateBuilding);

module.exports = router;
