const express = require("express");
const {
  handleLoginUser,
  handleSignUpUser,
  handleGetLoggedInUser,
  handleLogoutUser,
  handleGetAllUserInfo
} = require("../controller/userController");
const multer = require("multer");
const upload = multer({ dest: "usersPic" });
const router = express.Router();

router.post("/login", handleLoginUser);
router.post("/signup", upload.single("file"), handleSignUpUser);
router.get("/", handleGetLoggedInUser);
router.get("/allUserInfo", handleGetAllUserInfo);
router.post("/logout", handleLogoutUser);

module.exports = router;