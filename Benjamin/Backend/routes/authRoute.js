import {
  loginUser_controller,
  registerUser_controller,
} from "../controller/userController.js";
import express from "express";

const router = express.Router();

router.post("/register", registerUser_controller);
router.post("/login", loginUser_controller);

export default router;
