const Router = require("express");
const {
  GetUser,
  RegisterUser,
  LoginUser,
  EditUser,
} = require("../controllers/user.controller");

const { protect } = require("../middleware/auth.middleware");

const router = Router();
router.get("/get-user", protect, GetUser);
router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.put("/edit-user", protect, EditUser);

module.exports = router;
