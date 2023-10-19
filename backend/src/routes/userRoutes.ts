import express from "express";
import {
  currentUser,
  loginUser,
  registerUser,
} from "../controllers/userController";
import { validateToken } from "../middleware/verifyTokenHandler";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/current").post(currentUser); // Could use validateToken here

module.exports = router;
