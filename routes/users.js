const router = require("express").Router();

const { userLogin, userSignup, listUsers } = require("../controllers/users");

router.post("/login", userLogin);

router.post("/signup", userSignup);

router.get("/", listUsers);

module.exports = router;
