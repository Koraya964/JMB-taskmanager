import express from "express";
import { register, login, tasklist } from "../controller/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/tasklist", tasklist);

export default router;
