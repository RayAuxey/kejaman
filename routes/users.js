const router = require("express").Router();
const authenticate = require("../middleware/authenticate");

const {
  userLogin,
  userSignup,
  listUsers,
  editUser,
} = require("../controllers/users");

router.post("/login", userLogin);

router.post("/signup", userSignup);

router.get("/", listUsers);

router.put("/edit", authenticate, editUser);

module.exports = router;
