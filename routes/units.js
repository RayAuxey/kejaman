const router = require("express").Router();
const multer = require("multer");
const authenticate = require("../middleware/authenticate");
const { addunit, addPhoto } = require("../controllers/units");

const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + "." + ext;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({
  storage,
});

// Add Unit
router.post("/new", authenticate, addunit);

// Upload
router.post("/upload-photo/:id", upload.single("file"), addPhoto);

module.exports = router;
